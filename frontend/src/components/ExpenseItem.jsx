import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Single expense row in table
const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Delete this expense?')) {
      onDelete(expense._id);
    }
  };

  return (
    <motion.tr 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="border-b border-slate-200 dark:border-white/10 text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
    >
      <td className="px-5 py-4 font-medium text-slate-800 dark:text-slate-200">{expense.title}</td>
      <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{expense.category}</td>
      <td className="px-5 py-4 capitalize">
        <span
          className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-wider font-bold ${
            expense.type === 'income'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
          }`}
        >
          {expense.type}
        </span>
      </td>
      <td className="px-5 py-4 font-display font-semibold tracking-wide text-slate-800 dark:text-slate-200">
        $ {expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </td>
      <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{new Date(expense.date).toLocaleDateString()}</td>
      <td className="px-5 py-4 max-w-[200px] truncate subtle-text">{expense.note || '-'}</td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/80 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 transition-all shadow-sm" onClick={() => onEdit(expense)}>
            <FiEdit2 size={14} />
          </button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/80 hover:bg-rose-500 hover:text-white transition-all shadow-sm" onClick={handleDelete}>
            <FiTrash2 size={14} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

export default ExpenseItem;
