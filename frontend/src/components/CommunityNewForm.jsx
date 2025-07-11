import React, { useState, useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const CommunityNewForm = () => {
  const { token, backendUrl, navigate, refresh, setRefresh } = useContext(ShopContext);

  const [form, setForm] = useState({
    name: "",
    agenda: "",
    description: "",
    coverImage: "",
  });

  const [error, setError] = useState("");

  //function using await, and attaching proper Authorization header
  const postCommunity = async () => {
    try {
      await axios.post(`${backendUrl}/api/communities/new-community`, form,{headers: {token}});

      toast.success("EcoCommunity created");
      return true;
    } catch (err) {
      console.error(err);
      toast.error("EcoCommunity Creation failed");
      return false;
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.agenda || !form.description) {
      setError("Please fill in all required fields.");
      return;
    }

    const isCreated = await postCommunity();
    if (isCreated) {
      setRefresh(!refresh);        
      navigate("/communities");     
    }


    setForm({
      name: "",
      agenda: "",
      description: "",
      coverImage: "",
    });

    setError("");
  };

  return (
    <div className="eco-static-bg p-10">
      <h2 className="text-4xl font-bold text-white text-center mb-4 tracking-wide">
        Start a New EcoCommunity
      </h2>
      <p className="text-green-50 mb-5 text-lg text-center">
        Unite people under a shared environmental mission. Start a community and inspire action.
      </p>

      <div className="max-w-3xl mx-auto p-6 bg-green-50 rounded-lg shadow-md">
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Community Name *"
            className="w-full text-green-900 border-b-1 border-green-800 focus:border-green-600 outline-none py-2"
          />

          <input
            type="text"
            name="agenda"
            value={form.agenda}
            onChange={handleChange}
            placeholder="Community Agenda *"
            className="w-full text-green-900 border-b-1 border-green-800 focus:border-green-600 outline-none py-2"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short Description *"
            rows={4}
            className="w-full text-green-900 border-b-1 border-green-800 focus:border-green-600 outline-none py-2"
          />

          <input
            type="text"
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            placeholder="Cover Image URL (optional)"
            className="w-full text-green-900 border-b-1 border-green-800 focus:border-green-600 outline-none py-2"
          />

          <button
            type="submit"
            className="bg-emerald-400 text-green-900 font-semibold px-6 py-2 rounded-full shadow-[0_4px_0_#047857] hover:translate-y-[1px] hover:shadow-[0_2px_0_#047857] active:translate-y-[2px] active:shadow-none transition-all duration-150"
          >
            Create Community
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommunityNewForm;
