import React, { createContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance.js';

export const ExpenseContext = createContext();

// Provider that manages expense data and summary
export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [loading, setLoading] = useState(false);

  // Fetch all expenses and summary
  const fetchExpenses = async (filters = {}) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get('/api/expenses', { params: filters });
      setExpenses(data);
    } catch (error) {
      toast.error('Unable to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const { data } = await axiosInstance.get('/api/expenses/summary');
      setSummary(data);
    } catch (error) {
      toast.error('Unable to load summary');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchExpenses();
      fetchSummary();
    }
  }, []);

  // Add a new expense
  const addExpense = async (payload) => {
    try {
      const { data } = await axiosInstance.post('/api/expenses', payload);
      setExpenses((prev) => [data, ...prev]);
      toast.success('Expense saved');
      fetchSummary();
      return { ok: true };
    } catch (error) {
      const message = error.response?.data?.errors?.[0]?.msg || 'Failed to add expense';
      toast.error(message);
      return { ok: false };
    }
  };

  // Update an expense
  const updateExpense = async (id, payload) => {
    try {
      const { data } = await axiosInstance.put(`/api/expenses/${id}`, payload);
      setExpenses((prev) => prev.map((item) => (item._id === id ? data : item)));
      toast.success('Expense updated');
      fetchSummary();
      return { ok: true };
    } catch (error) {
      const message = error.response?.data?.errors?.[0]?.msg || 'Failed to update expense';
      toast.error(message);
      return { ok: false };
    }
  };

  // Delete an expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`/api/expenses/${id}`);
      setExpenses((prev) => prev.filter((item) => item._id !== id));
      toast.info('Expense deleted');
      fetchSummary();
    } catch (error) {
      toast.error('Failed to delete expense');
    }
  };

  const value = useMemo(
    () => ({ expenses, summary, loading, fetchExpenses, addExpense, updateExpense, deleteExpense }),
    [expenses, summary, loading]
  );

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};
