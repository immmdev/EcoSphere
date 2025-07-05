import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend API
      const res = await axios.post('http://localhost:5000/api/signup', form);
      alert('Signup successful! 🎉');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">Join EcoSphere 🌱</h2>
        <p className="text-gray-600 text-center mb-6">Track impact. Build community. Create green change.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" required />
          <button type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300">Sign Up</button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account? <Link to="/login" className="text-green-700 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
