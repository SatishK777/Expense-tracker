import React, { useEffect, useState } from 'react';
import { FiX, FiDollarSign, FiCalendar, FiTag, FiFileText } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Salary', 'Investment', 'Other'];

// Modal form for adding or editing an expense
const ExpenseForm = ({ open, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'Other',
    type: 'expense',
    date: '',
    note: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        amount: initialData.amount || '',
        category: initialData.category || 'Other',
        type: initialData.type || 'expense',
        date: initialData.date ? initialData.date.split('T')[0] : '',
        note: initialData.note || '',
      });
    } else {
      setForm({ title: '', amount: '', category: 'Other', type: 'expense', date: '', note: '' });
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/60 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg rounded-3xl bg-white/90 dark:bg-[#0f111a]/95 border border-white/50 dark:border-white/10 shadow-glass p-8 overflow-hidden"
          >
            {/* Background glowing orb */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-[80px] -z-10 mix-blend-screen pointer-events-none"></div>

            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-white tracking-tight">
                {initialData ? 'Edit Entry' : 'New Entry'}
              </h3>
              <button 
                onClick={onClose} 
                className="p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/70 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                  <FiTag />
                </div>
                <input
                  className="input-field pl-11 py-3"
                  type="text"
                  name="title"
                  placeholder="What was this for?"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                    <FiDollarSign />
                  </div>
                  <input
                    className="input-field pl-11 py-3"
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <select className="input-field py-3" name="category" value={form.category} onChange={handleChange}>
                  {categories.map((category) => (
                    <option key={category} value={category} className="text-slate-900">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <select className="input-field py-3" name="type" value={form.type} onChange={handleChange}>
                  <option value="income" className="text-slate-900">Income</option>
                  <option value="expense" className="text-slate-900">Expense</option>
                </select>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                    <FiCalendar />
                  </div>
                  <input
                    className="input-field pl-11 py-3"
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute top-4 left-4 pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                  <FiFileText />
                </div>
                <textarea
                  className="input-field pl-11 py-3"
                  name="note"
                  placeholder="Notes (optional)"
                  value={form.note}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary w-32 justify-center">
                  {initialData ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExpenseForm;
