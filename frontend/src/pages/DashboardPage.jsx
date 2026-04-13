import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { ExpenseContext } from '../context/ExpenseContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Dashboard from '../components/Dashboard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import ExpenseList from '../components/ExpenseList.jsx';
import ExpenseForm from '../components/ExpenseForm.jsx';
import Charts from '../components/Charts.jsx';

// Dashboard page shown after login
const DashboardPage = ({ onToggleTheme, theme }) => {
  const { user } = useContext(AuthContext);
  const { expenses, loading, fetchExpenses, addExpense, updateExpense, deleteExpense } =
    useContext(ExpenseContext);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    type: '',
    sort: 'newest',
    startDate: '',
    endDate: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    fetchExpenses({
      category: filters.category || undefined,
      type: filters.type || undefined,
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
    });
  };

  const handleAddExpense = async (payload) => {
    if (editingExpense) {
      await updateExpense(editingExpense._id, payload);
    } else {
      await addExpense(payload);
    }
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  const openAddModal = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  return (
    <div className="px-4 py-8 lg:px-12">
      <Navbar user={user} onToggleTheme={onToggleTheme} theme={theme} />

      <div className="mt-8 space-y-8">
        <Dashboard />

        <FilterBar
          filters={filters}
          onChange={handleFilterChange}
          onApplyFilters={applyFilters}
          onAdd={openAddModal}
        />

        <ExpenseList
          expenses={expenses}
          filters={filters}
          loading={loading}
          onEdit={openEditModal}
          onDelete={deleteExpense}
        />

        <Charts expenses={expenses} />
      </div>

      <ExpenseForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddExpense}
        initialData={editingExpense}
      />
    </div>
  );
};

export default DashboardPage;
