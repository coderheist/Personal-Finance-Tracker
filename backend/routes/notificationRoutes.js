import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getNotifications, setBudgetLimit } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', authenticate, getNotifications);
router.post('/set-budget', authenticate, setBudgetLimit);

export default router;
