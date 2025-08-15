import express from 'express';
import authUser from '../middlewares/auth.js';
import { createInitiative,getInitiatives,memberAction } from '../controllers/initiative.controller.js';

const initiativeRouter = express.Router();

initiativeRouter.post('/create', authUser, createInitiative);
initiativeRouter.get('/getinitiatives', getInitiatives);
initiativeRouter.post('/memberaction', authUser, memberAction);

export default initiativeRouter;