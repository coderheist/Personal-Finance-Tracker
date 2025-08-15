import mongoose from 'mongoose';

const scheduledTransactionSchema = new mongoose.Schema({
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
  scheduledDate: {
    type: Date,
    required: [true, 'Scheduled date is required']
  },
  isExecuted: {
    type: Boolean,
    default: false
  },
  executedAt: {
    type: Date,
    default: null
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recurrence: {
    type: String,
    enum: ['none', 'weekly', 'monthly', 'yearly'],
    default: 'none'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
scheduledTransactionSchema.index({ user: 1, scheduledDate: 1 });
scheduledTransactionSchema.index({ user: 1, isExecuted: 1, isActive: 1 });

const ScheduledTransaction = mongoose.model('ScheduledTransaction', scheduledTransactionSchema);
export default ScheduledTransaction;
