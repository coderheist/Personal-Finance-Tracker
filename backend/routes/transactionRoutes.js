import express from 'express';
import { getAllTransactions, addTransaction, updateTransaction, deleteTransaction } from '../controllers/transactionController.js';
import { authenticate } from '../middleware/auth.js';
import { validateTransaction } from '../middleware/validation.js';

const router = express.Router();

router.get('/', authenticate, getAllTransactions);
router.post('/', authenticate, validateTransaction, addTransaction);
router.put('/:id', authenticate, updateTransaction);
router.delete('/:id', authenticate, deleteTransaction);

export default router;
