import React, { useState } from 'react';

function CarbonFootprintCalculator() {
  const [form, setForm] = useState({
    dailyKm: '',
    transportMode: 'car',
    electricity: '',
    gas: '',
    diet: 'nonVeg',
  });

  const [result, setResult] = useState(null);

  const emissionFactors = {
    transport: {
      car: 0.21,
      bike: 0.1,
      bus: 0.05,
      train: 0.04,
      walk: 0,
      cycle: 0,
    },
    electricity: 0.92, // kg CO₂/kWh
    gas: 2.3,          // kg CO₂/kg
    diet: {
      vegan: 1.5,      // tons/year
      vegetarian: 2.0,
      nonVeg: 3.0,
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateFootprint = () => {
    const kmPerYear = Number(form.dailyKm) * 365;
    const transportEmission = kmPerYear * emissionFactors.transport[form.transportMode];

    const electricityEmission = Number(form.electricity) * 12 * emissionFactors.electricity;
    const gasEmission = Number(form.gas) * 12 * emissionFactors.gas;

    const dietEmission = emissionFactors.diet[form.diet] * 1000; // convert tons to kg

    const total = transportEmission + electricityEmission + gasEmission + dietEmission;

    setResult(total.toFixed(2));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-forest mb-6">Carbon Footprint Calculator</h2>

      <div className="space-y-4">
        {/* Distance */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Daily travel distance (in km):</label>
          <input
            type="number"
            name="dailyKm"
            value={form.dailyKm}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Transport */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Transport Mode:</label>
          <select
            name="transportMode"
            value={form.transportMode}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="walk">Walk</option>
            <option value="cycle">Cycle</option>
          </select>
        </div>

        {/* Electricity */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Monthly electricity use (kWh):</label>
          <input
            type="number"
            name="electricity"
            value={form.electricity}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Gas */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Monthly gas use (kg):</label>
          <input
            type="number"
            name="gas"
            value={form.gas}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Diet */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Diet Type:</label>
          <select
            name="diet"
            value={form.diet}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="nonVeg">Non-Vegetarian</option>
          </select>
        </div>

        {/* Button */}
        <button
          onClick={calculateFootprint}
          className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition mt-4"
        >
          Calculate
        </button>

        {/* Result */}
        {result && (
          <div className="mt-6 bg-green-100 border border-green-300 p-4 rounded-md text-green-800">
            <p className="font-semibold">
              🌍 Your annual carbon footprint is approximately <span className="text-green-900">{result} kg CO₂</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarbonFootprintCalculator;
