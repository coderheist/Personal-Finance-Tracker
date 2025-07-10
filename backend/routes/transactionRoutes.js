import express from 'express';
import { getAllTransactions, addTransaction } from '../controllers/transactionController.js';
import { validateTransaction } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getAllTransactions);

router.post('/', addTransaction);
router.post('/', validateTransaction, addTransaction);

export default router;
