import { motion } from 'framer-motion';
import { DollarSign, TrendingDown, Calendar, Target } from 'lucide-react';
import { useExpenses } from '@/context/ExpenseContext';
import { StatsCard } from '@/components/StatsCard';
import { ExpenseCard } from '@/components/ExpenseCard';
import { ExpenseChart } from '@/components/ExpenseChart';

export default function Dashboard() {
  const { expenses, getExpenseStats } = useExpenses();
  const stats = getExpenseStats();
  
  const recentExpenses = expenses.slice(0, 5);
  const chartData = Object.entries(stats.categorySums).map(([name, value]) => ({
    name,
    value
  }));

  const budgetUsed = (stats.totalExpenses / stats.monthlyBudget) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Track your expenses and stay on budget</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Expenses"
          value={`₹${stats.totalExpenses.toFixed(2)}`}
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: false }}
          subtitle="This month"
        />
        <StatsCard
          title="Monthly Budget"
          value={`₹${stats.monthlyBudget.toFixed(2)}`}
          icon={Target}
          subtitle="Remaining budget"
        />
        <StatsCard
          title="Budget Used"
          value={`${budgetUsed.toFixed(1)}%`}
          icon={TrendingDown}
          trend={{ value: budgetUsed > 80 ? 5.2 : -2.1, isPositive: budgetUsed <= 80 }}
          subtitle={budgetUsed > 80 ? "Over budget!" : "On track"}
        />
        <StatsCard
          title="Transactions"
          value={expenses.length}
          icon={Calendar}
          subtitle="This month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Expenses */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Recent Expenses</h2>
              <span className="text-sm text-muted-foreground">{recentExpenses.length} transactions</span>
            </div>
            <div className="space-y-4">
              {recentExpenses.length > 0 ? (
                recentExpenses.map((expense, index) => (
                  <ExpenseCard key={expense.id} expense={expense} index={index} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No expenses yet. Add your first expense to get started!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Chart */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Expense Categories</h2>
          {chartData.length > 0 ? (
            <ExpenseChart data={chartData} type="pie" />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <TrendingDown className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No data to display</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}