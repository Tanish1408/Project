import React, { useState, useEffect, useMemo } from 'react';
import { CurrencyTicker } from '../components/CurrencyTicker';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpenseList } from '../components/ExpenseList';
import { ExpenseChart } from '../components/ExpenseChart';
import { Expense } from '../types';
import { Download, Upload } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddExpense = (expense: Expense) => {
    setExpenses([expense, ...expenses]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(expenses, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expenses-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          if (Array.isArray(importedData)) {
            setExpenses(importedData);
          }
        } catch (error) {
          console.error('Error importing data:', error);
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const totalExpenses = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-background-color'}`}>
      <CurrencyTicker />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Budget Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="btn btn-primary"
              aria-label="Toggle dark mode"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportData}
                className="btn btn-primary flex items-center gap-2"
                aria-label="Export data"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <label className="btn btn-primary flex items-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                  aria-label="Import data"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <ExpenseForm onSubmit={handleAddExpense} />
            <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
          </div>
          <div>
            <div className="card mb-4">
              <h2 className="text-xl font-semibold mb-2">Total Expenses</h2>
              <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
            </div>
            <ExpenseChart expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
};