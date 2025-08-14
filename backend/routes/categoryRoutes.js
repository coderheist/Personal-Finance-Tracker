import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getCategories, addCategory, deleteCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', authenticate, getCategories);
router.post('/add', authenticate, addCategory);
router.post('/delete', authenticate, deleteCategory);

export default router;
