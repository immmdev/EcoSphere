import express from "express";
import { getDashboardStats } from "../controllers/stats.controller.js";
import authUser from "../middlewares/auth.js";

const statsRouter = express.Router();

statsRouter.get("/dashboard", authUser, getDashboardStats);

export default statsRouter;
