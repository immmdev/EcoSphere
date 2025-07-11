import express from "express";
import { fetchCommunity, createCommunity, updateCommunity } from "../controllers/community.controller.js";
import authUser from "../middlewares/auth.js";

const communityRouter = express.Router();

communityRouter.post("/new-community",authUser,createCommunity);
communityRouter.get("/all-communities",fetchCommunity);
communityRouter.post("/join-community",authUser,updateCommunity);


export default communityRouter;
