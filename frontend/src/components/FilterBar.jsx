import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';

// Filter bar for searching and filtering expenses
const FilterBar = ({ filters, onChange, onApplyFilters, onAdd }) => {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <input
            className="input-field"
            type="text"
            name="search"
            placeholder="Search by title or note"
            value={filters.search}
            onChange={onChange}
          />
          <select className="input-field" name="category" value={filters.category} onChange={onChange}>
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Salary">Salary</option>
            <option value="Investment">Investment</option>
            <option value="Other">Other</option>
          </select>
          <select className="input-field" name="type" value={filters.type} onChange={onChange}>
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select className="input-field" name="sort" value={filters.sort} onChange={onChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="amount-desc">Amount (High to Low)</option>
            <option value="amount-asc">Amount (Low to High)</option>
          </select>
          <input
            className="input-field"
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={onChange}
          />
          <input
            className="input-field"
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-secondary" onClick={onApplyFilters}>
            Apply Filters
          </button>
          <button type="button" className="btn-primary" onClick={onAdd}>
            <FiPlusCircle /> Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
