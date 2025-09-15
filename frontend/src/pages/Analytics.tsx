import React from "react";
import { deleteExpense } from "../services/api";

function ExpenseList({ expenses, refresh }) {
  const handleDelete = async (id) => {
    await deleteExpense(id);
    refresh();
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((exp) => (
          <tr key={exp.id}>
            <td>{exp.title}</td>
            <td>₹{exp.amount}</td>
            <td>{exp.category}</td>
            <td>
              <button onClick={() => handleDelete(exp.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseList;
