import { useState } from "react";
import axios from "axios";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact/contact`, form);
      setStatus("Message sent successfully ✅");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("Something went wrong ❌");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full text-green-900 border-b-1 border-green-800 focus:border-green-600 outline-none py-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full text-green-900 border-b-1 border-green-800 focus:border-green-600 outline-none py-2"
      />
      <textarea
        name="message"
        placeholder="Type your Message..."
        value={form.message}
        onChange={handleChange}
        required
        rows="4"
        className="w-full text-green-900 border-b-1 border-green-800 focus:border-green-600 outline-none py-2 resize-none"
      />
      <button
        type="submit"
        className="w-full bg-emerald-400 text-green-900 font-semibold px-6 py-2 rounded-full shadow-[0_4px_0_#047857] hover:translate-y-[1px] hover:shadow-[0_2px_0_#047857] active:translate-y-[2px] active:shadow-none transition-all duration-150"
      >
        Send
      </button>
      {status && <p className="text-sm text-green-800">{status}</p>}
    </form>
  );
}
