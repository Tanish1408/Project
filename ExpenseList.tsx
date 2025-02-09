import React, { useState } from 'react';
import { format } from 'date-fns';
import { Trash2, AlertCircle } from 'lucide-react';
import { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExpenses = expenses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  const handleDelete = (id: string) => {
    setShowConfirmDelete(id);
  };

  const confirmDelete = (id: string) => {
    onDelete(id);
    setShowConfirmDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(null);
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
      {expenses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No expenses recorded yet</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Description</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-right p-2">Amount</th>
                  <th className="text-center p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{format(new Date(expense.date), 'MMM d, yyyy')}</td>
                    <td className="p-2">{expense.description}</td>
                    <td className="p-2 capitalize">{expense.category}</td>
                    <td className="p-2 text-right">
                      {expense.amount.toFixed(2)} {expense.currency}
                    </td>
                    <td className="p-2 text-center">
                      {showConfirmDelete === expense.id ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => confirmDelete(expense.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                            aria-label="Confirm delete"
                          >
                            Delete
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="text-gray-500 hover:text-gray-700 text-sm"
                            aria-label="Cancel delete"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label={`Delete expense: ${expense.description}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
                aria-label="Previous page"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};