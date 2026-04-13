// Expense schema linked to a specific user
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Salary', 'Investment', 'Other'],
      default: 'Other',
    },
    type: { type: String, required: true, enum: ['income', 'expense'] },
    date: { type: Date, default: Date.now },
    note: { type: String, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model('Expense', expenseSchema);
