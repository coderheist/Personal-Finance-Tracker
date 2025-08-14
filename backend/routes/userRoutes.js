import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getProfile, updateProfile, changePassword } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.put('/change-password', authenticate, changePassword);

export default router;
