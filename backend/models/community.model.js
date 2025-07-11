import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  agenda: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  members: {
    type: Number,
    default: 1,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coverImage: {
    type: String,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Community = mongoose.model("Community", communitySchema);

export default Community;
