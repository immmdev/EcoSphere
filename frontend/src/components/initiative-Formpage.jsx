import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const categories = [
  "Others",
  "Tree Plantation",
  "Waste & Recycling",
  "Sustainable Living",
  "Awareness & Campaigns",
  "Community Cleanups",
  "Workshops & Training",
  "Renewable Energy",
  "Water & Conservation",
  "Biodiversity & Nature",
  "Green Tech & Innovation",
];

const CreateInitiative = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    imgUrl: "",
    description: "",
    category: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/initiative/create`, formData, {
        headers: { token },
      })
      .then(() => {
        toast.success("Initiative created successfully!");
        navigate("/initiatives");
      })
      .catch((error) => {
        console.error("Error creating initiative:", error);
        toast.error("Failed to create initiative.");
      });
  };

  return (
    <div className="min-h-screen eco-static-bg py-10 px-4 flex flex-col items-center">
      {/* Heading + Subtext */}
      <h2 className="text-4xl font-bold text-white text-center mb-4 tracking-wide">
        Small Acts, Big Impact
      </h2>
      <p className="text-green-50 mb-10 text-lg text-center max-w-5xl">
        Join hands to create a greener tomorrow through tree plantations, clean-ups,
        awareness drives, and sustainable practices. Every initiative brings us closer
        to a healthier planet.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-green-100 rounded-lg shadow-md p-8 w-full max-w-2xl space-y-6"
      >
        
        {/* Title */}
        <div>
      
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
             className="w-full text-green-900 border-b border-green-800 focus:border-green-600 outline-none py-2"
            placeholder="Enter the title of your initiative"
          />
        </div>

     

        {/* Description */}
        <div>
     
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full text-green-900 border-b border-green-800 focus:border-green-600 outline-none py-2"
            placeholder="Full description "
          ></textarea>
        </div>
           {/* Image URL */}
        <div>
          
        
          <input
            type="text"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full text-green-900 border-b border-green-800 focus:border-green-600 outline-none py-2"
          />
        </div>

      
        {/* Location */}
        <div>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full text-green-900 border-b border-green-800 focus:border-green-600 outline-none py-2"
            placeholder="Enter the location of your initiative"
          />
        </div>

          {/* Category */}
        <div>
     
   
            <select
              value={formData.category}
              onChange={handleChange}
              name="category"
               className="w-full text-green-900 border-b border-green-800 focus:border-green-600 outline-none py-2"
            >
              <option value="Others">Others</option>
              <option value="Tree Plantation">Tree Plantation</option>
              <option value="Waste & Recycling">Waste & Recycling</option>
              <option value="Sustainable Living">Sustainable Living</option>
              <option value="Awareness & Campaigns">Awareness & Campaigns</option>
              <option value="Community Cleanups">Community Cleanups</option>
              <option value="Workshops & Training">Workshops & Training</option>
              <option value="Renewable Energy">Renewable Energy</option>
              <option value="Water & Conservation">Water & Conservation</option>
              <option value="Biodiversity & Nature">Biodiversity & Nature</option>
              <option value="Green Tech & Innovation">Green Tech & Innovation</option>
            </select>

        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-emerald-400 px-6 py-2 rounded-full shadow-[0_4px_0_#047857] 
                   hover:translate-y-[1px] hover:shadow-[0_2px_0_#047857] 
                   active:translate-y-[2px] active:shadow-none 
                   text-green-900 font-semibold transition-all duration-150"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateInitiative;
