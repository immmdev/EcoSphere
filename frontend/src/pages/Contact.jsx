import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import ContactForm from '../components/Contacts/ContactForm'; // ✅ Import it

const ContactUs = () => {
  return (
    <div className="min-h-screen eco-static-bg from-white to-green-100 px-6 py-16 flex items-center justify-center">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">

        {/* Left Section - Contact Info */}
        <div className="text-green-800 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-green-50">
            Reach out to us for support, collaborations, or eco-ideas. Let’s connect and grow greener together.
          </p>

          <div className="flex items-start space-x-4">
            <div className="text-green-100 text-2xl mt-1"><FaMapMarkerAlt /></div>
            <div>
              <h4 className="font-semibold text-green-100 text-lg">Address</h4>
              <p className='text-green-100'>EcoSphere HQ<br />#101, Greenway Lane,<br />New Delhi – 110001, India</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="text-green-100 text-2xl mt-1"><FaPhoneAlt /></div>
            <div>
              <h4 className="font-semibold text-green-100 text-lg">Phone</h4>
              <p className='text-green-100'>+91-9876543210</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="text-green-100 text-2xl mt-1"><FaEnvelope /></div>
            <div>
              <h4 className="font-semibold text-green-100 text-lg">Email</h4>
              <p className='text-green-100'>support@ecosphere.green</p>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div style={{ borderRadius: "20px" }} className="bg-green-100 shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-bold text-green-900 mb-6">Send Message</h3>
          <ContactForm /> {/* ✅ Placed here */}
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
