import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-100 px-6 py-16 flex items-center justify-center">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">

        {/* Left Section - Contact Info */}
        <div className="text-green-800 space-y-6">
          <h2 className="text-4xl font-bold text-green-700">Contact Us</h2>
          <p className="text-gray-700">
            Reach out to us for support, collaborations, or eco-ideas. Let’s connect and grow greener together.
          </p>

          {/* Address */}
          <div className="flex items-start space-x-4">
            <div className="text-green-600 text-2xl mt-1"><FaMapMarkerAlt /></div>
            <div>
              <h4 className="font-semibold text-lg">Address</h4>
              <p>EcoSphere HQ<br />#101, Greenway Lane,<br />New Delhi – 110001, India</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-4">
            <div className="text-green-600 text-2xl mt-1"><FaPhoneAlt /></div>
            <div>
              <h4 className="font-semibold text-lg">Phone</h4>
              <p>+91-9876543210</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4">
            <div className="text-green-600 text-2xl mt-1"><FaEnvelope /></div>
            <div>
              <h4 className="font-semibold text-lg">Email</h4>
              <p>support@ecosphere.green</p>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="bg-white shadow-lg rounded-md p-8">
          <h3 className="text-2xl font-bold text-green-800 mb-6">Send Message</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border-b-2 border-gray-300 focus:border-green-600 outline-none py-2"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b-2 border-gray-300 focus:border-green-600 outline-none py-2"
            />
            <textarea
              placeholder="Type your Message..."
              rows="4"
              className="w-full border-b-2 border-gray-300 focus:border-green-600 outline-none py-2 resize-none"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 mt-2 rounded-md transition duration-300"
            >
              Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
