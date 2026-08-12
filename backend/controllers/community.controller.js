import { v2 as cloudinary } from "cloudinary";
import Community from "../models/community.model.js";
import Post from "../models/posts.model.js";

const createCommunity = async (req, res) => {
  try {
    const { name, agenda, description, category, userId } = req.body;

    // Check if community with the same name already exists
    const isMatch = await Community.findOne({ name });
    if (isMatch) {
      return res.status(409).json({ message: "Community already exists" });
    }

    let coverImage;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      coverImage = result.secure_url;
    }

    // Create new community
    const newCommunity = new Community({
      name,
      agenda,
      description,
      ...(coverImage && { coverImage }),
      category,
      creator: userId,
      members: [userId],
      posts: [],
    });

    await newCommunity.save();

    res.status(201).json({
      message: "Successfully created community",
      CommunityName: newCommunity.name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const findCommunityByName = async (req, res) => {
  try {
    const name = req.body.name;
    const community = await Community.findOne({ name });
    if (community) {
      return res
        .status(200)
        .json({ message: "Community found", communityName: community.name });
    }
    res.status(404).json({ message: "Community not found" });
  } catch (err) {
    console.error(err);
    throw new Error("Error finding community");
  }
};

const fetchCommunity = async (req, res) => {
  try {
    const allCommunities = await Community.find({}).populate("creator");
    res.status(200).json(allCommunities);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const actionCommunity = async (req, res) => {
  try {
    const { communityName, action, userId } = req.body;

    // findOne to get single community object
    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }


    if (userId == community.creator.toString()) {
      return res.status(200).json({ message: "You are the leader of this initiative." });
    }

    if (action === "join") {
      const updatedCommunity = await Community.findOneAndUpdate(
        { name: communityName },
        { $addToSet: { members: userId } },
        { new: true }
      );

      return res.status(200).json({
        message: "success",
        members: updatedCommunity.members,
      });
    }

    else if (action === "leave") {
      const updatedCommunity = await Community.findOneAndUpdate(
        { name: communityName },
        { $pull: { members: userId } },
        { new: true }
      );

      return res.status(200).json({
        message: "success",
        members: updatedCommunity.members,
        updatedCommunity: updatedCommunity,
      });
    }

    else {
      return res.status(400).json({ message: "Invalid Action" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


const makePosts = async (req, res) => {
  try {
    const { communityId, userId, title, content, tag } = req.body;

    let image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      image = result.secure_url;
    }

    const Postdata = {
      communityId,
      authorId: userId,
      title,
      content,
      tag,
      image,
      comments: [],
    };

    const newPost = await Post.create(Postdata);

    await Community.findByIdAndUpdate(communityId, {
      $push: { posts: newPost._id },
    });

    res
      .status(201)
      .json({ message: "Post created successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to create post." });
  }
};

const fetchCommunityPosts = async (req, res) => {
  try {
    const { communityId } = req.body;
    const community = await Community.findById(communityId).populate({
      path: "posts",
      select: "authorId title content tag image likes comments createdAt",
      populate: [
        { path: "authorId", select: "name" },
        { path: "comments.user", select: "name" },
      ],
    });

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    res.status(200).json({ posts: community.posts });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const toggleLike = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const likes = Array.isArray(post.likes) ? post.likes : [];
    const alreadyLiked = likes.some((like) => like.toString() === userId.toString());

    post.likes = alreadyLiked
      ? likes.filter((like) => like.toString() !== userId.toString())
      : [...likes, userId];

    await post.save();

    res.status(200).json({
      message: "Likes updated",
      isLiked: !alreadyLiked,
      likesCount: post.likes.length,
      likes: post.likes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const addComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: { user: userId, content, createdAt: new Date() } } },
      { new: true }
    ).populate({ path: "comments.user", select: "name" });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(201).json({
      message: "Comment added",
      comments: post.comments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// fetch-joins
const fetchJoins = async (req, res) => {
  try {
    const { id } = req.params;


    if (id) {
      let community = await Community.findById(id).populate("members");
      let members = community.members;
      return res.status(200).json({ message: "Success", members: members })
    } else {
      return res.status(404).json({ message: "invalid community id"})
    }

  } catch {
    return res.status(500), json({ message: "server failed" })
  }
}

export {
  createCommunity,
  fetchCommunity,
  actionCommunity,
  makePosts,
  findCommunityByName,
  fetchCommunityPosts,
  fetchJoins,
  toggleLike,
  addComment,
};
