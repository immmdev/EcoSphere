import Community from "../models/community.model.js";

const createCommunity = async (req, res) => {
  try {
    const { name, agenda, description, coverImage, userId } = req.body;

    // Check if community with the same name already exists
    const isMatch = await Community.findOne({ name });
    if (isMatch) {
      return res.status(409).json({ message: "Community already exists" });
    }

    // Create new community
    const newCommunity = new Community({
      name,
      agenda,
      description,
      coverImage,
      members: 1,
      creator: userId,
      users: [userId],
    });

    await newCommunity.save();

    res.status(201).json({ message: "Successfully created community", newCommunity });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchCommunity = async (req, res) => {
  try {
    const allCommunities = await Community.find({});
    res.status(200).json(allCommunities);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


const updateCommunity = async (req, res) => {
  const { communityName, userId } = req.body;

  try {
    // Get a single community by name
    const community = await Community.findOne({ name: communityName });

    if (!community) {
      return res.status(404).json({ message: "No such community exists" });
    }

    let users = community.users || []; // Ensure it's an array

    if (users.includes(userId)) {
      // User already joined, so remove
      const index = users.indexOf(userId);
      if (index !== -1) {
        users.splice(index, 1);
        community.members = Math.max(0, community.members - 1);
        community.users = users;

        await community.save();
        return res.json({ message: "Removed from users" });
      }
    } else {
      // User not joined, so add
      users.push(userId);
      community.users = users;
      community.members = (community.members || 0) + 1;

      await community.save();
      return res.json({ message: "Joined in users" });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating community" });
  }
};


export { createCommunity, fetchCommunity, updateCommunity };
