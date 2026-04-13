// Controllers for managing expenses
const { validationResult } = require('express-validator');
const Expense = require('../models/Expense');

// Build Mongo filter object from query params
const buildFilters = (req) => {
  const filters = { user: req.user._id };

  if (req.query.category) {
    filters.category = req.query.category;
  }

  if (req.query.type) {
    filters.type = req.query.type;
  }

  if (req.query.startDate || req.query.endDate) {
    filters.date = {};
    if (req.query.startDate) {
      filters.date.$gte = new Date(req.query.startDate);
    }
    if (req.query.endDate) {
      filters.date.$lte = new Date(req.query.endDate);
    }
  }

  return filters;
};

// Get all expenses for the logged-in user (with filters)
const getExpenses = async (req, res) => {
  try {
    const filters = buildFilters(req);
    const expenses = await Expense.find(filters).sort({ date: -1 });
    return res.json(expenses);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Add a new expense linked to the logged-in user
const addExpense = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, amount, category, type, date, note } = req.body;

  try {
    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount,
      category,
      type,
      date: date || Date.now(),
      note,
    });

    return res.status(201).json(expense);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update an expense (only if owned by the logged-in user)
const updateExpense = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { title, amount, category, type, date, note } = req.body;

    expense.title = title ?? expense.title;
    expense.amount = amount ?? expense.amount;
    expense.category = category ?? expense.category;
    expense.type = type ?? expense.type;
    expense.date = date ?? expense.date;
    expense.note = note ?? expense.note;

    await expense.save();

    return res.json(expense);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete an expense (only if owned by the logged-in user)
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.json({ message: 'Expense deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get summary totals for the logged-in user
const getSummary = async (req, res) => {
  try {
    const totals = await Expense.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
        },
      },
    ]);

    const incomeTotal = totals.find((item) => item._id === 'income')?.total || 0;
    const expenseTotal = totals.find((item) => item._id === 'expense')?.total || 0;

    return res.json({
      income: incomeTotal,
      expense: expenseTotal,
      balance: incomeTotal - expenseTotal,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getExpenses, addExpense, updateExpense, deleteExpense, getSummary };
