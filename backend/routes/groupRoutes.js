import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { createGroup, joinGroup, getGroups } from '../controllers/groupController.js';

const router = express.Router();

router.post('/create', authenticate, createGroup);
router.post('/join', authenticate, joinGroup);
router.get('/', authenticate, getGroups);

export default router;
