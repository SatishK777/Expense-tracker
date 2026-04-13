import React, { useMemo } from 'react';
import ExpenseItem from './ExpenseItem.jsx';
import { AnimatePresence } from 'framer-motion';

// Table list of expenses with filters applied client-side
const ExpenseList = ({ expenses, filters, loading, onEdit, onDelete }) => {
  const filteredExpenses = useMemo(() => {
    let data = [...expenses];

    if (filters.search) {
      const query = filters.search.toLowerCase();
      data = data.filter(
        (item) => item.title.toLowerCase().includes(query) || item.note?.toLowerCase().includes(query)
      );
    }

    if (filters.category) {
      data = data.filter((item) => item.category === filters.category);
    }

    if (filters.type) {
      data = data.filter((item) => item.type === filters.type);
    }

    if (filters.startDate) {
      const start = new Date(filters.startDate);
      data = data.filter((item) => new Date(item.date) >= start);
    }

    if (filters.endDate) {
      const end = new Date(filters.endDate);
      data = data.filter((item) => new Date(item.date) <= end);
    }

    switch (filters.sort) {
      case 'oldest':
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'amount-asc':
        data.sort((a, b) => a.amount - b.amount);
        break;
      case 'amount-desc':
        data.sort((a, b) => b.amount - a.amount);
        break;
      default:
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }

    return data;
  }, [expenses, filters]);

  return (
    <div className="glass-card rounded-3xl p-1 overflow-hidden">
      <div className="overflow-x-auto p-4 sm:p-5">
        <table className="min-w-full text-left whitespace-nowrap border-collapse">
          <thead>
            <tr className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-white/10">
              <th className="px-5 py-4 font-semibold">Title</th>
              <th className="px-5 py-4 font-semibold">Category</th>
              <th className="px-5 py-4 font-semibold">Type</th>
              <th className="px-5 py-4 font-semibold">Amount</th>
              <th className="px-5 py-4 font-semibold">Date</th>
              <th className="px-5 py-4 font-semibold">Note</th>
              <th className="px-5 py-4 font-semibold flex items-center justify-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {loading && (
                <tr>
                  <td className="px-5 py-8 text-center text-slate-500 dark:text-white/60 font-medium" colSpan="7">
                    Loading records...
                  </td>
                </tr>
              )}
              {!loading && filteredExpenses.length === 0 && (
                <tr>
                  <td className="px-5 py-12 text-center text-slate-500 dark:text-white/50 font-medium" colSpan="7">
                    No transactions found.
                  </td>
                </tr>
              )}
              {!loading &&
                filteredExpenses.map((expense) => (
                  <ExpenseItem key={expense._id} expense={expense} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
