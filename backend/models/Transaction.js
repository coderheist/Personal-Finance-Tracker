import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Transaction type is required (income or expense)'],
    lowercase: true,
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Transaction amount is required'],
    min: [0, 'Amount must be a positive number']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: false
  }
});

// ✅ Optional: Set default sorting by date descending
transactionSchema.set('timestamps', true);

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
