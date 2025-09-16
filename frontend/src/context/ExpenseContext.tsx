import React, { createContext, useContext, useState, useEffect } from 'react';
import { Expense, ExpenseStats } from "../types/expense";

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  getExpenseStats: () => ExpenseStats;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// Sample data for demo
const sampleExpenses: Expense[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: 85.50,
    category: 'Food & Dining',
    date: '2024-01-15',
    description: 'Weekly groceries from supermarket'
  },
  {
    id: '2',
    title: 'Netflix Subscription',
    amount: 15.99,
    category: 'Entertainment',
    date: '2024-01-14',
    description: 'Monthly streaming subscription'
  },
  {
    id: '3',
    title: 'Gas Station',
    amount: 45.00,
    category: 'Transportation',
    date: '2024-01-13',
    description: 'Fuel for car'
  },
  {
    id: '4',
    title: 'Coffee Shop',
    amount: 12.50,
    category: 'Food & Dining',
    date: '2024-01-12',
    description: 'Morning coffee and pastry'
  },
  {
    id: '5',
    title: 'Online Course',
    amount: 99.99,
    category: 'Education',
    date: '2024-01-11',
    description: 'Web development course'
  }
];

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load sample data on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    } else {
      setExpenses(sampleExpenses);
    }
  }, []);

  // Save to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Math.random().toString(36).substr(2, 9)
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const updateExpense = (id: string, expenseData: Partial<Expense>) => {
    setExpenses(prev => prev.map(expense => 
      expense.id === id ? { ...expense, ...expenseData } : expense
    ));
  };

  const getExpenseStats = (): ExpenseStats => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const monthlyBudget = 2000; // Fixed budget for demo
    
    const categorySums = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return { totalExpenses, monthlyBudget, categorySums };
  };

  return (
    <ExpenseContext.Provider value={{
      expenses,
      addExpense,
      deleteExpense,
      updateExpense,
      getExpenseStats
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}