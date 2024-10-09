import express from 'express';
import { getme, login, logout, signup, update } from '../controllers/authController.js';
import protectedRoute from '../middlewares/protectedRoute.js';

const router=express.Router();

router.get("/getme",protectedRoute as any,getme as any)
router.post("/signup",signup as any)
router.post("/login",login as any)
router.post("/logout",logout as any)
router.post("/update",update as any)


export default router;