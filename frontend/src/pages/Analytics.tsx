import React from "react";
import { useExpenses } from "../context/ExpenseContext";

export default function Analytics(): JSX.Element {
  const { expenses, deleteExpense, getExpenseStats } = useExpenses();

  const { totalExpenses, monthlyBudget, categorySums } = getExpenseStats();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>

      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4">
          <h3 className="text-sm text-gray-400">Total Expenses</h3>
          <p className="text-xl font-semibold">₹{totalExpenses.toFixed(2)}</p>
        </div>
        <div className="glass-card p-4">
          <h3 className="text-sm text-gray-400">Monthly Budget</h3>
          <p className="text-xl font-semibold">₹{monthlyBudget.toFixed(2)}</p>
        </div>
        <div className="glass-card p-4">
          <h3 className="text-sm text-gray-400">Remaining</h3>
          <p className="text-xl font-semibold">
            ₹{(monthlyBudget - totalExpenses).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="glass-card p-4">
        <h2 className="text-lg font-semibold mb-3">By Category</h2>
        <ul className="space-y-2">
          {Object.entries(categorySums).map(([category, amount]) => (
            <li key={category} className="flex justify-between">
              <span>{category}</span>
              <span>₹{amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Expense list */}
      <div className="glass-card p-4">
        <h2 className="text-lg font-semibold mb-3">All Expenses</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="pb-2">Title</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Category</th>
              <th className="pb-2">Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id} className="border-t">
                <td>{exp.title}</td>
                <td>₹{exp.amount.toFixed(2)}</td>
                <td>{exp.category}</td>
                <td>{exp.date}</td>
                <td>
                  <button
                    onClick={() => deleteExpense(exp.id)}
                    className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No expenses yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
