import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Tag, DollarSign } from 'lucide-react';
import { useExpenses } from '@/context/ExpenseContext';
import { ExpenseCard } from '@/components/ExpenseCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EXPENSE_CATEGORIES } from '@/types/expense';

export default function Transactions() {
  const { expenses } = useExpenses();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'title'>('date');

  const filteredAndSortedExpenses = useMemo(() => {
    let filtered = expenses;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(expense =>
        expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(expense => expense.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'amount':
          return b.amount - a.amount;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [expenses, searchQuery, selectedCategory, sortBy]);

  const totalAmount = filteredAndSortedExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Transactions</h1>
          <p className="text-muted-foreground">View and manage all your expenses</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-2xl font-bold text-primary">${totalAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass bg-input/50 border-border/50 focus:border-primary"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="glass bg-input/50 border-border/50 focus:border-primary">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="glass-card border-border/50">
              <SelectItem value="all">All Categories</SelectItem>
              {EXPENSE_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: 'date' | 'amount' | 'title') => setSortBy(value)}>
            <SelectTrigger className="glass bg-input/50 border-border/50 focus:border-primary">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="glass-card border-border/50">
              <SelectItem value="date">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date
                </div>
              </SelectItem>
              <SelectItem value="amount">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Amount
                </div>
              </SelectItem>
              <SelectItem value="title">
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Title
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center justify-center text-sm text-muted-foreground">
            {filteredAndSortedExpenses.length} of {expenses.length} transactions
          </div>
        </div>
      </motion.div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredAndSortedExpenses.length > 0 ? (
          filteredAndSortedExpenses.map((expense, index) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ExpenseCard expense={expense} />
            </motion.div>
          ))
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-12 text-center"
          >
            <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No transactions found</h3>
            <p className="text-muted-foreground">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your filters to see more results'
                : 'Start adding expenses to see them here'
              }
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}