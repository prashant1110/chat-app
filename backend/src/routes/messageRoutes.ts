import express from 'express';
import protectedRoute from '../middlewares/protectedRoute.js';
import { getMessage, getUserForSidebar, sendMessage } from '../controllers/messageController.js';

const router=express.Router();

router.get('/conversations',protectedRoute as any,getUserForSidebar)
router.get('/:id',protectedRoute as any,getMessage as any)
router.post('/send/:id',protectedRoute as any,sendMessage)

export default router;