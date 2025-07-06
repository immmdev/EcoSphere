import { useState } from "react";

const faqs = [
  {
    question: "How do I join a community?",
    answer: "Go to the Communities page and click 'Join' next to the community you're interested in.",
  },
  {
    question: "What is the EcoScore?",
    answer: "EcoScore is a rating based on your sustainable actions tracked through EcoSphere tools.",
  },
  {
    question: "How do I track my carbon footprint?",
    answer: "Use the Carbon Tracker tool under the Learn section to log daily activities and get estimates.",
  },
  {
    question: "How do I reset my password?",
    answer: "Go to Login > Forgot Password and follow the instructions.",
  },
  {
    question: "Can I sell handmade eco-products?",
    answer: "Yes, visit the EcoShop page and register as a seller.",
  },
  {
    question: "How to delete my account?",
    answer: "Send a request through the support form at the bottom with the subject 'Account Deletion'.",
  },
];

function Support() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="eco-static-bg text-white">
      {/* A. Header */}
      <section className="py-10 text-center px-4 ">
        <h1 className="text-4xl font-bold text-white mb-2">How can we help you?</h1>
        <p className="text-lg text-green-100 mb-6">Get quick help on common issues or contact our team.</p>
      </section>

      {/* B. FAQs */}
      <section className="max-w-4xl mx-auto py-12 px-4 bg-black rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-lime-700 rounded-md">
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full text-left px-4 py-3 hover:bg-lime-950 focus:outline-none transition"
              >
                <span className="font-medium text-lg text-white">{faq.question}</span>
              </button>
              {activeIndex === idx && (
                <div className="px-4 py-3">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* C. Help Topics / Guides */}
      <section className="py-12 px-4">
        <h2 className="text-2xl font-semibold text-lime-300 text-center mb-10">Help Topics & Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { title: "Getting Started", desc: "Setup your profile and begin your journey", icon: "🌱" },
            { title: "Communities", desc: "Explore and join like-minded eco-groups", icon: "👥" },
            { title: "Learn & Grow", desc: "Browse educational content on sustainability", icon: "📚" },
            { title: "Using the Carbon Tracker", desc: "Learn how to log your emissions and track EcoScore", icon: "📊" },
            { title: "EcoShop Help", desc: "How to buy and sell eco-products", icon: "🛍️" },
            { title: "Account & Security", desc: "Manage your data, privacy and more", icon: "🔐" },
          ].map((card, i) => (
            <div key={i} className=" border border-lime-700 p-6 rounded-xl shadow-lg hover:shadow-4xl transition duration-200">
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="text-xl font-semibold0 mb-2">{card.title}</h3>
              <p className="text-green-100">{card.desc}</p>
              <a href="#" className=" mt-2 inline-block hover:underline text-lime-300">Learn More →</a>
            </div>
          ))}
        </div>
      </section>

      {/* D. Contact Support */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-lime-300 mb-6">Contact Support</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submitted");
          }}
          className="space-y-4"
        >
          <input type="text" placeholder="Your Name" className="w-full p-3 border border-lime-600   rounded-md" required />
          <input type="email" placeholder="Your Email" className="w-full p-3 border border-lime-600  rounded-md" required />
          <select className="w-full p-3 border border-lime-600 rounded-md" required>
            <option value="">Select Category</option>
            <option  className="text-black">Bug</option>
            <option className="text-black">Account</option>
            <option className="text-black">Feedback</option>
            <option className="text-black">Other</option>
          </select>
          <textarea rows="5" placeholder="Your Message" className="w-full p-3 border border-lime-600 rounded-md" required />
          <button
            type="submit"
            className="bg-lime-300 text-black font-semibold px-6 py-2 rounded-full shadow-[0_4px_0_#65a30d] hover:translate-y-[1px] hover:shadow-[0_2px_0_#65a30d] active:translate-y-[2px] active:shadow-none transition-all duration-150"
          >
            Submit
          </button>
          <p className="text-center text-sm text-green-300 mt-2">We respond within 24–48 hrs</p>
          <div className="text-center mt-2">
            <p>📧 support@ecosystem.com</p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Support;

