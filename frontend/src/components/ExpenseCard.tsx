import { motion } from 'framer-motion';
import { Calendar, Tag, Trash2 } from 'lucide-react';
import { Expense } from "../types/expense";
import { useExpenses } from "../context/ExpenseContext";

interface ExpenseCardProps {
  expense: Expense;
  index?: number;
}

export function ExpenseCard({ expense, index = 0 }: ExpenseCardProps) {
  const { deleteExpense } = useExpenses();

  const handleDelete = () => {
    deleteExpense(expense.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-4 group smooth-transition"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground">{expense.title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">
            ${expense.amount.toFixed(2)}
          </span>
          <button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-destructive/20 hover:text-destructive smooth-transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Tag className="w-4 h-4" />
            <span>{expense.category}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(expense.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      {expense.description && (
        <p className="mt-2 text-sm text-muted-foreground">{expense.description}</p>
      )}
    </motion.div>
  );
}