import express from "express";
import { logFootprint, getHistory, getSummary } from "../controllers/carbon.controller.js";
import authUser from "../middlewares/auth.js";

const carbonRouter = express.Router();

carbonRouter.post("/log", authUser, logFootprint);
carbonRouter.get("/history", authUser, getHistory);
carbonRouter.get("/summary", authUser, getSummary);

export default carbonRouter;
