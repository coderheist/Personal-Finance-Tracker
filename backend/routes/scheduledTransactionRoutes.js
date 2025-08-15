import express from 'express';
import {
  getScheduledTransactions,
  createScheduledTransaction,
  updateScheduledTransaction,
  deleteScheduledTransaction,
  executeScheduledTransaction,
  getUpcomingScheduledTransactions
} from '../controllers/scheduledTransactionController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all scheduled transactions for the user
router.get('/', getScheduledTransactions);

// Get upcoming scheduled transactions (next 30 days)
router.get('/upcoming', getUpcomingScheduledTransactions);

// Create a new scheduled transaction
router.post('/', createScheduledTransaction);

// Update a scheduled transaction
router.put('/:id', updateScheduledTransaction);

// Delete a scheduled transaction
router.delete('/:id', deleteScheduledTransaction);

// Execute a scheduled transaction (convert to actual transaction)
router.post('/:id/execute', executeScheduledTransaction);

export default router;
