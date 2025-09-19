import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { TrendingUp, PieChart, BarChart, Calendar } from 'lucide-react';
import { useExpenses } from '@/context/ExpenseContext';
import { ExpenseChart } from '@/components/ExpenseChart';
import { StatsCard } from '@/components/StatsCard';
import { useTheme } from "@/context/ThemeContext";

export default function Analytics() {
  const { expenses, getExpenseStats } = useExpenses();
  const { theme } = useTheme();
  const stats = getExpenseStats();
  
  // Dynamic colors for category legend based on theme
  const getCategoryColor = (index: number) => {
    const darkColors = ['#e50914', '#ff4757', '#ff6b6b', '#ff7979', '#fd79a8', '#fdcb6e', '#6c5ce7', '#74b9ff'];
    const lightColors = ['#3b82f6', '#06b6d4', '#10b981', '#22c55e', '#84cc16', '#eab308', '#f59e0b', '#ef4444'];
    const colors = theme === 'dark' ? darkColors : lightColors;
    return colors[index % colors.length];
  };

  const chartData = useMemo(() => {
    return Object.entries(stats.categorySums)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [stats.categorySums]);

  const monthlyData = useMemo(() => {
    const monthlyExpenses: { [key: string]: number } = {};
    
    expenses.forEach(expense => {
      const month = new Date(expense.date).toLocaleDateString('en-US', { month: 'short' });
      monthlyExpenses[month] = (monthlyExpenses[month] || 0) + expense.amount;
    });

    return Object.entries(monthlyExpenses).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const averageExpense = expenses.length > 0 ? stats.totalExpenses / expenses.length : 0;
  const highestExpense = Math.max(...expenses.map(e => e.amount), 0);
  const topCategory = chartData[0]?.name || 'None';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">Detailed insights into your spending patterns</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Average Expense"
          value={`₹${averageExpense.toFixed(2)}`}
          icon={TrendingUp}
          subtitle="Per transaction"
        />
        <StatsCard
          title="Highest Expense"
          value={`₹${highestExpense.toFixed(2)}`}
          icon={BarChart}
          subtitle="Single transaction"
        />
        <StatsCard
          title="Top Category"
          value={topCategory}
          icon={PieChart}
          subtitle="Most spending"
        />
        <StatsCard
          title="Total Transactions"
          value={expenses.length}
          icon={Calendar}
          subtitle="All time"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Category Breakdown</h2>
            <PieChart className="w-5 h-5 text-primary" />
          </div>
          {chartData.length > 0 ? (
            <ExpenseChart data={chartData} type="pie" />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <PieChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No data available</p>
            </div>
          )}
          <div className="mt-4 space-y-2">
            {chartData.slice(0, 5).map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: getCategoryColor(index) }}
                  />
                  <span className="text-foreground">{item.name}</span>
                </div>
                <span className="text-muted-foreground">₹{item.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Monthly Trend */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Monthly Trend</h2>
            <BarChart className="w-5 h-5 text-primary" />
          </div>
          {monthlyData.length > 0 ? (
            <ExpenseChart data={monthlyData} type="bar" />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <BarChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No monthly data available</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Detailed Breakdown */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-6">Spending Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 glass rounded-lg border border-border/30">
            <div className="text-2xl font-bold text-primary mb-2">₹{stats.totalExpenses.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Total Spent</div>
            <div className="text-xs text-muted-foreground mt-1">All transactions</div>
          </div>
          <div className="text-center p-4 glass rounded-lg border border-border/30">
            <div className="text-2xl font-bold text-primary mb-2">
              ₹{(stats.monthlyBudget - stats.totalExpenses).toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">Remaining Budget</div>
            <div className="text-xs text-muted-foreground mt-1">This month</div>
          </div>
          <div className="text-center p-4 glass rounded-lg border border-border/30">
            <div className="text-2xl font-bold text-primary mb-2">
              {((stats.totalExpenses / stats.monthlyBudget) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">Budget Used</div>
            <div className="text-xs text-muted-foreground mt-1">Of ₹{stats.monthlyBudget}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}