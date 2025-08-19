import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    type: {
        type: String,
        default: "Article"
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    coverImage: {
        type: String,
        default: ""
    },

    likes: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const articleModel = mongoose.model("Article", articleSchema);

export default articleModel;
