import User from "../models/user.model.js";
import Community from "../models/community.model.js";
import Post from "../models/posts.model.js";
import CarbonEntry from "../models/carbonEntry.model.js";

const LEVELS = [0, 50, 150, 300, 500, 800];

const levelFromPoints = (points) => {
  let level = 1;
  for (let i = 1; i < LEVELS.length; i++) {
    if (points >= LEVELS[i]) level = i + 1;
  }
  const min = LEVELS[level - 1];
  const max = LEVELS[level] ?? min + 200;
  return { level, min, max };
};

const getDashboardStats = async (req, res) => {
  try {
    const { userId } = req.body;

    const [user, carbonEntries, communitiesJoined, postsCreated] = await Promise.all([
      User.findById(userId),
      CarbonEntry.find({ user: userId }).sort({ createdAt: -1 }),
      Community.countDocuments({ members: userId }),
      Post.countDocuments({ authorId: userId }),
    ]);

    const initiativesJoined = user?.initiatives?.length || 0;

    const coolPoints =
      carbonEntries.length * 10 + initiativesJoined * 15 + communitiesJoined * 10 + postsCreated * 20;

    const { level, min, max } = levelFromPoints(coolPoints);

    let streak = 0;
    if (carbonEntries.length > 0) {
      const dayKeys = new Set(carbonEntries.map((e) => new Date(e.createdAt).toDateString()));
      const cursor = new Date();
      while (dayKeys.has(cursor.toDateString())) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      }
    }

    const categoryTotals = carbonEntries.reduce(
      (acc, e) => {
        acc.transport += e.breakdown?.transport || 0;
        acc.energy += e.breakdown?.energy || 0;
        acc.food += e.breakdown?.food || 0;
        acc.shopping += e.breakdown?.shopping || 0;
        return acc;
      },
      { transport: 0, energy: 0, food: 0, shopping: 0 }
    );
    const categorySum =
      categoryTotals.transport + categoryTotals.energy + categoryTotals.food + categoryTotals.shopping || 1;
    const categoryPercent = {
      Travel: Math.round((categoryTotals.transport / categorySum) * 100),
      Energy: Math.round((categoryTotals.energy / categorySum) * 100),
      Food: Math.round((categoryTotals.food / categorySum) * 100),
      Waste: Math.round((categoryTotals.shopping / categorySum) * 100),
    };

    const savedEmissions = carbonEntries.length
      ? Math.max(0, Number((carbonEntries.length * 5 - carbonEntries[0].total).toFixed(2)))
      : 0;

    const badges = [];
    if (carbonEntries.length >= 1) badges.push("Green Beginner");
    if (streak >= 7) badges.push("Consistency Champ");
    if (communitiesJoined >= 1) badges.push("Community Builder");
    if (postsCreated >= 1) badges.push("Sustainability Creator");
    if (initiativesJoined >= 1) badges.push("Initiative Taker");

    res.status(200).json({
      success: true,
      stats: {
        coolPoints,
        level,
        levelMin: min,
        levelMax: max,
        completedActions: carbonEntries.length + initiativesJoined + communitiesJoined + postsCreated,
        streak,
        savedEmissions,
        categoryPercent,
        badges,
        latestFootprint: carbonEntries[0]
          ? { total: carbonEntries[0].total, createdAt: carbonEntries[0].createdAt }
          : null,
        recentEntries: carbonEntries.slice(0, 5).map((e) => ({
          total: e.total,
          createdAt: e.createdAt,
        })),
      },
    });
  } catch (err) {
    console.error("Error building dashboard stats:", err);
    res.status(500).json({ success: false, message: "Failed to load dashboard stats." });
  }
};

export { getDashboardStats };
