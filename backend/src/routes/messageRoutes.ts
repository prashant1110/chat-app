import express from 'express';
import protectedRoute from '../middlewares/protectedRoute.js';
import { sendMessage } from '../controllers/messageController.js';

const router=express.Router();

router.post('/send/:id',protectedRoute as any,sendMessage)

export default router;