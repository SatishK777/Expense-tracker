// Routes for expenses (all protected)
const express = require('express');
const { body } = require('express-validator');

const authMiddleware = require('../middleware/authMiddleware');
const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getSummary,
} = require('../controllers/expenseController');

const router = express.Router();

// Get summary totals
router.get('/summary', authMiddleware, getSummary);

// Get all expenses
router.get('/', authMiddleware, getExpenses);

// Add expense
router.post(
  '/',
  authMiddleware,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  ],
  addExpense
);

// Update expense
router.put(
  '/:id',
  authMiddleware,
  [
    body('title').optional().notEmpty().withMessage('Title is required'),
    body('amount').optional().isNumeric().withMessage('Amount must be a number'),
    body('category').optional().notEmpty().withMessage('Category is required'),
    body('type').optional().isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  ],
  updateExpense
);

// Delete expense
router.delete('/:id', authMiddleware, deleteExpense);

module.exports = router;
