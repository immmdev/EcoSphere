import express from "express";
import { fetchCommunity, createCommunity, actionCommunity ,makePosts,fetchCommunityPosts, fetchJoins, toggleLike, addComment} from "../controllers/community.controller.js";
import authUser from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const communityRouter = express.Router();

communityRouter.post("/new-community",upload.single("coverImage"),authUser,createCommunity);
communityRouter.get("/all-communities",fetchCommunity);
communityRouter.post("/action-community",authUser,actionCommunity);
communityRouter.post("/make-post",upload.single("image"),authUser,makePosts);
communityRouter.post("/fetch-community-posts",authUser,fetchCommunityPosts);
communityRouter.post("/post/like",authUser,toggleLike);
communityRouter.post("/post/comment",authUser,addComment);
communityRouter.get("/:id",fetchJoins);


export default communityRouter;
