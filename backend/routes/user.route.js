import express from 'express';
import { registerUser, loginUser, adminLogin, userDetails } from '../controllers/user.controller.js';
import authUser from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/profile', authUser, userDetails);

export default userRouter;