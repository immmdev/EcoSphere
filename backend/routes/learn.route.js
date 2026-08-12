import express from 'express';
import { createArticle, getArticles,likesUpdate,allLikes} from '../controllers/article.controller.js';

import authUser from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';


const learnRouter=express.Router();

learnRouter.post("/new-article",upload.single("coverImage"),authUser,createArticle);
learnRouter.get("/all-articles",getArticles);
learnRouter.post("/likes-update",authUser,likesUpdate);
learnRouter.get("/:id",allLikes);


export default learnRouter;