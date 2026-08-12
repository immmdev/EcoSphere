import { v2 as cloudinary } from "cloudinary";
import articleModel from "../models/article.model.js";
import mongoose from "mongoose";


const createArticle = async (req, res) => {
    try {
        const {
            title,
            summary,
            content,
            tags,
            category,
            type,
            userId
        } = req.body;


        // validation
        if (!title || !summary || !content || !category) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing!"
            });
        }

        let coverImage = "";
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
            coverImage = result.secure_url;
        }

        const tagsArray = Array.isArray(tags)
            ? tags
            : (tags || "").split(",").map((t) => t.trim()).filter(Boolean);

        const newArticle = new articleModel({
            title,
            summary,
            content,
            category,
            tags: tagsArray,
            type,
            author: new mongoose.Types.ObjectId(userId),
            coverImage
        });

        await newArticle.save();

        return res.status(201).json({
            success: true,
            message: "Article saved successfully!",
            article: newArticle
        });
    } catch (error) {
   
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const getArticles = async (req, res) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.max(1, Number(req.query.limit) || 9);
        const category = req.query.category;

        const filter = category && category !== "All" ? { category } : {};

        const [allArticles, totalCount] = await Promise.all([
            articleModel
                .find(filter)
                .populate("author")
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),
            articleModel.countDocuments(filter),
        ]);

        return res.status(200).json({
            success: true,
            allArticles,
            currentPage: page,
            totalPages: Math.max(1, Math.ceil(totalCount / limit)),
            totalCount,
        });

    } catch (error) {

        return res.status(500).json({ error: error });
    }
}

const likesUpdate = async (req, res) => {
  try {
    const { articleId, userId } = req.body;
  

    // Article fetch
    const article = await articleModel.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Convert userId to ObjectId
    const userObjId = new mongoose.Types.ObjectId(userId);

    // Check if already liked
    const alreadyLiked = article.likes.some(
      like => like.toString() === userObjId.toString()
    );

    if (alreadyLiked) {
      // Unlike (remove userId)
      article.likes = article.likes.filter(
        like => like.toString() !== userObjId.toString()
      );
    } else {
      // Like (add userId)
      article.likes.push(userObjId);
    }

  
    await article.save();

    return res.status(200).json({
      isLiked:alreadyLiked,  
      message: "Likes updated",
      likesCount: article.likes.length,
      likes: article.likes
    });

  } catch (err) {
    console.error("likesUpdate error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const allLikes = async (req, res) => {
  try {
    const {id} = req.params;
    const article = await articleModel.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const likesCount = article.likes.length;
    const likesArray=article.likes;

   
    return res.status(200).json({
      likes: likesCount,
      likesArray:likesArray
   
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};







export { createArticle, getArticles, likesUpdate,allLikes };
