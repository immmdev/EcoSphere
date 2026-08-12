import mongoose from "mongoose";

const carbonEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dailyKm: { type: Number, default: 0 },
  transportMode: { type: String, default: "car" },
  electricity: { type: Number, default: 0 },
  gas: { type: Number, default: 0 },
  diet: { type: String, default: "nonVeg" },
  flights: { type: Number, default: 0 },
  meatMeals: { type: Number, default: 0 },
  devices: { type: Number, default: 0 },
  laundryLoads: { type: Number, default: 0 },
  bottledWater: { type: Number, default: 0 },
  breakdown: {
    transport: { type: Number, default: 0 },
    energy: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    shopping: { type: Number, default: 0 },
  },
  total: { type: Number, required: true },
  aiInsight: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const CarbonEntry = mongoose.model("CarbonEntry", carbonEntrySchema);

export default CarbonEntry;
