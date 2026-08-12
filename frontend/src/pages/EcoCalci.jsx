import React, { useContext, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';
import {
  Footprints, Bike, Fuel, Bus, TrainFront, Car,
  Home as HomeIcon, MapPin, Route, Globe,
  Battery, Zap, Snowflake, Factory,
  Ban, Utensils, ChefHat, Flame,
  Leaf, Salad, Beef, UtensilsCrossed,
  Plane, PlaneTakeoff,
  Smartphone, Laptop, Monitor,
  Shirt, Droplets, RotateCw,
  Recycle, Droplet, CupSoda,
} from 'lucide-react';
import IntroRightCalci from '../components/IntroRightCalci';
import IntroLeftCalci from '../components/IntroLeftCalci'
import bulbImg from '../assets/CalculatorImages/light-bulb_1566384.png';
import transportImg from '../assets/CalculatorImages/logistics-delivery_10857143.png';
import houseImg from '../assets/CalculatorImages/eco-house_5383420.png';
import foodImg from '../assets/CalculatorImages/catering_3475952.png';
import shoppingImg from '../assets/CalculatorImages/shopping-bag_5939887.png';
import { ShopContext } from '../contexts/ShopContext';
import carbonService from '../services/carbonService';

const QUESTIONS = [
  {
    section: 'Travel',
    name: 'transportMode',
    question: 'How do you usually get around?',
    options: [
      { value: 'walk', icon: Footprints, label: 'Walking' },
      { value: 'cycle', icon: Bike, label: 'Cycling' },
      { value: 'bike', icon: Fuel, label: 'Motorbike' },
      { value: 'bus', icon: Bus, label: 'Bus' },
      { value: 'train', icon: TrainFront, label: 'Train' },
      { value: 'car', icon: Car, label: 'Car' },
    ],
  },
  {
    section: 'Travel',
    name: 'dailyKm',
    question: 'How far do you travel each day?',
    options: [
      { value: 2, icon: HomeIcon, label: 'Not far', sublabel: 'Under 5 km' },
      { value: 10, icon: MapPin, label: 'A little', sublabel: '5–15 km' },
      { value: 22, icon: Route, label: 'Quite a bit', sublabel: '15–30 km' },
      { value: 45, icon: Globe, label: 'A lot', sublabel: '30+ km' },
    ],
  },
  {
    section: 'Home',
    name: 'electricity',
    question: 'How much electricity does your home use?',
    options: [
      { value: 100, icon: Battery, label: 'Not much', sublabel: 'Few gadgets' },
      { value: 250, icon: Zap, label: 'Average', sublabel: 'Typical home' },
      { value: 450, icon: Snowflake, label: 'Quite a lot', sublabel: 'AC / heavy use' },
      { value: 800, icon: Factory, label: 'A lot', sublabel: 'Big home' },
    ],
  },
  {
    section: 'Home',
    name: 'gas',
    question: 'Do you use gas at home?',
    options: [
      { value: 0, icon: Ban, label: 'Not at all' },
      { value: 5, icon: Utensils, label: 'A little' },
      { value: 15, icon: ChefHat, label: 'Regularly' },
      { value: 30, icon: Flame, label: 'A lot' },
    ],
  },
  {
    section: 'Food',
    name: 'diet',
    question: 'What do you usually eat?',
    options: [
      { value: 'vegan', icon: Leaf, label: 'Vegan' },
      { value: 'vegetarian', icon: Salad, label: 'Vegetarian' },
      { value: 'nonVeg', icon: Beef, label: 'Non-vegetarian' },
    ],
  },
  {
    section: 'Food',
    name: 'meatMeals',
    question: 'How many meat meals a week?',
    options: [
      { value: 0, icon: Ban, label: 'None' },
      { value: 2, icon: Utensils, label: 'A few' },
      { value: 4, icon: UtensilsCrossed, label: 'About half' },
      { value: 7, icon: Beef, label: 'Most meals' },
    ],
  },
  {
    section: 'Food',
    name: 'flights',
    question: 'How often do you fly?',
    options: [
      { value: 0, icon: Ban, label: 'Never' },
      { value: 2, icon: Plane, label: 'Rarely', sublabel: '1–2 trips/yr' },
      { value: 4, icon: PlaneTakeoff, label: 'Sometimes', sublabel: '3–5 trips/yr' },
      { value: 8, icon: Globe, label: 'Often', sublabel: '6+ trips/yr' },
    ],
  },
  {
    section: 'Habits',
    name: 'devices',
    question: 'How many gadgets do you use daily?',
    options: [
      { value: 1, icon: Smartphone, label: '1–2' },
      { value: 3.5, icon: Laptop, label: '3–4' },
      { value: 6, icon: Monitor, label: '5 or more' },
    ],
  },
  {
    section: 'Habits',
    name: 'laundryLoads',
    question: 'How often do you do laundry?',
    options: [
      { value: 1, icon: Shirt, label: 'Rarely' },
      { value: 3, icon: Droplets, label: 'A few times' },
      { value: 6, icon: RotateCw, label: 'Almost daily' },
    ],
  },
  {
    section: 'Habits',
    name: 'bottledWater',
    question: 'Do you use plastic water bottles?',
    options: [
      { value: 0, icon: Recycle, label: 'No, I reuse' },
      { value: 1, icon: Droplet, label: 'Sometimes' },
      { value: 3, icon: CupSoda, label: 'Often' },
    ],
  },
];

function CarbonFootprintCalculator() {
  const { token } = useContext(ShopContext);
  const [form, setForm] = useState({});

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const isReview = step === QUESTIONS.length;
  const current = QUESTIONS[step];

  const selectOption = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (step < QUESTIONS.length) {
      setStep((s) => Math.min(QUESTIONS.length, s + 1));
    }
  };

  const handleSubmit = async () => {
    if (!token) {
      toast.error('Please login to save and track your footprint.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await carbonService.logFootprint(form);
      if (res.data.success) {
        setResult(res.data.entry);
      } else {
        toast.error('Could not log your footprint.');
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        toast.error('Your session has expired. Please log in again.');
      } else {
        toast.error('Something went wrong while logging your footprint.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const restart = () => {
    setResult(null);
    setForm({});
    setStep(0);
  };

  return (
    <div className='eco-static-bg p-5' >

      <h1 className="text-4xl md:text-4xl text-center font-bold text-white mb-4 mt-5">
        Calculate today's carbon footprint
      </h1>
      <p className='text-green-100 mb-5 text-lg text-center'>Just tap what fits — no numbers needed.</p>

      <div className="max-w-2xl mx-auto shadow-lg p-8 rounded-lg mt-10 bg-green-100">

        {result ? (
          <div className="space-y-4 text-center">
            <p className="font-semibold text-green-900">
              Your <b>daily</b> carbon footprint is approximately{" "}
              <span className="text-green-900 text-xl">{result.total} kg CO₂</span>
            </p>
            {result.aiInsight && (
              <div className="bg-green-200 border border-green-400 p-4 rounded-md text-left text-green-900 prose prose-sm max-w-none">
                <ReactMarkdown>{result.aiInsight}</ReactMarkdown>
              </div>
            )}
            <button
              onClick={restart}
              className="bg-emerald-400 text-green-900 font-semibold px-6 py-2 rounded-full shadow-[0_4px_0_#047857] hover:translate-y-[1px] hover:shadow-[0_2px_0_#047857] active:translate-y-[2px] active:shadow-none transition-all duration-150"
            >
              Log Another Day
            </button>
          </div>
        ) : (
          <>
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              {[...QUESTIONS, {}].map((_, idx) => (
                <span
                  key={idx}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${idx === step ? 'bg-emerald-500 w-6' : idx < step ? 'bg-emerald-300' : 'bg-green-300'}`}
                />
              ))}
            </div>

            {!isReview ? (
              <div>
                <span className="block text-center text-xs font-semibold uppercase tracking-wide text-green-700 mb-1">
                  {current.section}
                </span>
                <OptionQuestion
                  question={current.question}
                  options={current.options}
                  value={form[current.name]}
                  onSelect={(value) => selectOption(current.name, value)}
                />
              </div>
            ) : (
              <div className="space-y-2 text-green-900">
                <h2 className="text-xl font-semibold text-center mb-4">Review your answers</h2>
                {QUESTIONS.map((field) => {
                  const chosen = field.options.find((opt) => opt.value === form[field.name]);
                  const Icon = chosen?.icon;
                  return (
                    <div key={field.name} className="flex justify-between items-center text-sm border-b border-green-300 py-2">
                      <span className="pr-3">{field.question}</span>
                      <span className="font-medium whitespace-nowrap flex items-center gap-1.5">
                        {Icon && <Icon className="w-4 h-4" />}
                        {chosen ? chosen.label : '—'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="px-6 py-2 rounded-full font-semibold text-green-900 border border-green-800 disabled:opacity-30"
              >
                Back
              </button>
              {isReview && (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-emerald-400 text-green-900 font-semibold px-6 py-2 rounded-full shadow-[0_4px_0_#047857] hover:translate-y-[1px] hover:shadow-[0_2px_0_#047857] active:translate-y-[2px] active:shadow-none transition-all duration-150 disabled:opacity-60"
                >
                  {submitting ? 'Calculating…' : 'Calculate Daily Footprint'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <div>
      <h1 className="text-4xl md:text-5xl text-center font-bold text-white mb-5 mt-20">
        How your choices impact Environment?
      </h1>
       <p className='text-green-100 mb-10 text-lg text-center'>Small everyday choices add up. Here's how simple swaps in energy, travel, food, and shopping shrink your footprint.</p>
        <IntroRightCalci
        header="Save Power, Save the Planet"
        info="Turning off a fan for 5 hours a day saves about 1 kg of CO₂ a week — like skipping a 3 km drive. One LED bulb saves roughly 40 kg of CO₂ a year, same as a tree working for you all year."

        imgURL={bulbImg}
      />

      <IntroLeftCalci
        header="Travel Smarter, Emit Less"
        info="Taking a bus instead of driving 10 km saves about 2 kg of CO₂ — like charging 250 phones. Walking or cycling 2 km cuts 0.5 kg, similar to planting a tree every 4 days."
        imgURL={transportImg}

      />

      <IntroRightCalci
        header="Eat Mindfully, Live Sustainably"
        info="Skipping meat for one day saves up to 3 kg of CO₂ and 1,500 litres of water — about 10 bathtubs. A reusable bottle saves 0.2 kg of CO₂ each use and cuts plastic waste."
        imgURL={foodImg}
      />

      <IntroLeftCalci
        header=" Efficient Living, Greener Future"
        info="LED bulbs cut up to 40 kg of CO₂ a year each — like a tree working all year. Powering down your laptop at night saves another 1 kg a week."
        imgURL={houseImg } />

      <IntroRightCalci
        header="Shop Wise, Save Carbon"
        info="One recycled item can cut up to 90% of production emissions — like skipping a 10 km drive. A cloth bag instead of plastic saves 0.3 kg of CO₂ each time."
        imgURL={ shoppingImg }
      />
      </div>

    </div>

  );
}

// A single question rendered as a grid of pressable option cards
function OptionQuestion({ question, options, value, onSelect }) {
  return (
    <div>
      <p className="text-green-900 font-semibold text-lg text-center mb-4">{question}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {options.map((opt) => {
          const selected = value === opt.value;
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl px-3 py-4 text-center border-2 transition-all duration-150 ${
                selected
                  ? 'border-emerald-600 bg-emerald-400 text-green-900 shadow-[0_4px_0_#047857]'
                  : 'border-green-300 bg-white text-green-900 hover:border-emerald-400 hover:bg-green-50'
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={1.75} />
              <span className="font-semibold text-sm">{opt.label}</span>
              {opt.sublabel && <span className="text-xs text-green-700">{opt.sublabel}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CarbonFootprintCalculator;
