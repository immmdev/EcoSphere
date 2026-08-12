import CarbonEntry from "../models/carbonEntry.model.js";
import { askGemini } from "./ai.controller.js";

const emissionFactors = {
  transport: {
    car: 0.21,
    bike: 0.1,
    bus: 0.05,
    train: 0.04,
    walk: 0,
    cycle: 0,
  },
  electricity: 0.92, // kg CO2/kWh
  gas: 2.3, // kg CO2/kg
  diet: {
    vegan: 1.5, // tons/year
    vegetarian: 2.0,
    nonVeg: 3.0,
  },
  flights: 250,
  meatMeal: 2.5,
  deviceDaily: 0.4,
  laundry: 0.6,
  bottledWater: 0.5,
};

const computeBreakdown = (input) => {
  const dailyKm = Number(input.dailyKm) || 0;
  const electricity = Number(input.electricity) || 0;
  const gas = Number(input.gas) || 0;
  const flights = Number(input.flights) || 0;
  const meatMeals = Number(input.meatMeals) || 0;
  const devices = Number(input.devices) || 0;
  const laundryLoads = Number(input.laundryLoads) || 0;
  const bottledWater = Number(input.bottledWater) || 0;

  const transport =
    dailyKm * (emissionFactors.transport[input.transportMode] ?? emissionFactors.transport.car) +
    (flights * emissionFactors.flights) / 365;

  const energy =
    (electricity * emissionFactors.electricity) / 30 + (gas * emissionFactors.gas) / 30;

  const food =
    (emissionFactors.diet[input.diet] ?? emissionFactors.diet.nonVeg) * 1000 / 365 +
    (meatMeals * emissionFactors.meatMeal) / 7;

  const shopping =
    devices * emissionFactors.deviceDaily +
    (laundryLoads * emissionFactors.laundry) / 7 +
    bottledWater * emissionFactors.bottledWater;

  const total = transport + energy + food + shopping;

  return {
    breakdown: {
      transport: Number(transport.toFixed(2)),
      energy: Number(energy.toFixed(2)),
      food: Number(food.toFixed(2)),
      shopping: Number(shopping.toFixed(2)),
    },
    total: Number(total.toFixed(2)),
  };
};

const buildInsightPrompt = (breakdown, total) =>
  `A user's daily carbon footprint breakdown (kg CO2): transport ${breakdown.transport}, energy ${breakdown.energy}, food ${breakdown.food}, shopping ${breakdown.shopping}, total ${total}. ` +
  `In under 60 words, give 2 short, specific, encouraging tips to help them reduce their biggest contributor. Plain sentences, no markdown headers.`;

const logFootprint = async (req, res) => {
  try {
    const { userId, ...form } = req.body;
    const { breakdown, total } = computeBreakdown(form);

    let aiInsight = "";
    try {
      aiInsight = await askGemini(buildInsightPrompt(breakdown, total));
    } catch (err) {
      console.error("AI insight failed:", err.response?.data || err.message);
    }

    const entry = await CarbonEntry.create({
      user: userId,
      ...form,
      breakdown,
      total,
      aiInsight,
    });

    res.status(201).json({ success: true, entry });
  } catch (err) {
    console.error("Error logging footprint:", err);
    res.status(500).json({ success: false, message: "Failed to log footprint." });
  }
};

const getHistory = async (req, res) => {
  try {
    const { userId } = req.body;
    const entries = await CarbonEntry.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, entries });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch history." });
  }
};

const getSummary = async (req, res) => {
  try {
    const { userId } = req.body;
    const entries = await CarbonEntry.find({ user: userId }).sort({ createdAt: -1 });

    if (entries.length === 0) {
      return res.status(200).json({
        success: true,
        summary: { count: 0, latestTotal: 0, streak: 0, categoryAverage: null },
      });
    }

    const latestTotal = entries[0].total;

    const categoryTotals = entries.reduce(
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
    const categoryAverage = {
      transport: Math.round((categoryTotals.transport / categorySum) * 100),
      energy: Math.round((categoryTotals.energy / categorySum) * 100),
      food: Math.round((categoryTotals.food / categorySum) * 100),
      shopping: Math.round((categoryTotals.shopping / categorySum) * 100),
    };

    // streak: consecutive calendar days with an entry, counting back from today
    const dayKeys = new Set(entries.map((e) => new Date(e.createdAt).toDateString()));
    let streak = 0;
    const cursor = new Date();
    while (dayKeys.has(cursor.toDateString())) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    res.status(200).json({
      success: true,
      summary: { count: entries.length, latestTotal, streak, categoryAverage },
    });
  } catch (err) {
    console.error("Error building summary:", err);
    res.status(500).json({ success: false, message: "Failed to build summary." });
  }
};

export { logFootprint, getHistory, getSummary, computeBreakdown };
