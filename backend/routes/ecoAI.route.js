import express from "express";
import { ecoBot } from "../controllers/ai.controller.js";

const ecoRouter = express.Router();

ecoRouter.post("/generate",ecoBot);

export default ecoRouter;
