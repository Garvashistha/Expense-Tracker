export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export interface ExpenseStats {
  totalExpenses: number;
  monthlyBudget: number;
  categorySums: Record<string, number>;
}

export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Travel',
  'Education',
  'Others'
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];