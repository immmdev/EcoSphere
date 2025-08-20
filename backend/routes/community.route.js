import express from "express";
import { fetchCommunity, createCommunity, actionCommunity ,makePosts,fetchCommunityPosts} from "../controllers/community.controller.js";
import authUser from "../middlewares/auth.js";

const communityRouter = express.Router();

communityRouter.post("/new-community",authUser,createCommunity);
communityRouter.get("/all-communities",fetchCommunity);
communityRouter.post("/action-community",authUser,actionCommunity);
communityRouter.post("/make-post",authUser,makePosts);
communityRouter.post("/fetch-community-posts",authUser,fetchCommunityPosts);


export default communityRouter;
