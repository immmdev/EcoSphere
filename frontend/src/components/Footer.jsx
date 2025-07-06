import React from 'react';

function Footer() {
  return (
    <footer className="w-full border-black bg-black border-t ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and Socials */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <img className="w-6 h-6" src="/earth.png" alt="logo" />
              <span style={{fontFamily: 'Pacifico, cursive'}} className="text-gray-600 text-lg font-medium">EcoSphere</span>
            </div>
            <p className="text-gray-500 text-sm mb-2">
              © 2025, GreenPulse Community<br />All rights reserved.
            </p>
            <div className="flex gap-2 mt-2 text-gray-500 text-lg">
              <i className="fa-brands fa-twitter hover:text-blue-400"></i>
              <i className="fa-brands fa-square-facebook hover:text-blue-600"></i>
              <i className="fa-brands fa-instagram hover:text-pink-500"></i>
              <i className="fa-brands fa-linkedin-in hover:text-blue-700"></i>
              <i className="fa-brands fa-telegram hover:text-sky-400"></i>
            </div>
          </div>

          {/* Company Links */}
          <div className="md:col-span-2">
            <p className="text-green-400 font-semibold mb-2">Company</p>
            {[
              'About Us',
              'Sustainability Mission',
              'How It Works',
              'Partnerships',
              'Careers',
              'EcoBlog',
              'Media Kit',
              'GreenPulse Cares',
            ].map((item, idx) => (
              <a key={idx} href="#" className="block text-gray-500 text-sm hover:text-gray-700 mb-1">
                {item}
              </a>
            ))}
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Support Links */}
          <div className="md:col-span-2">
            <p className="text-green-400 font-semibold mb-2">Support</p>
            {[
              'Help Center',
              'Contact Us',
              'FAQs',
              'Carbon Tracker Guide',
              'Community Guidelines',
              'Resources',
            ].map((item, idx) => (
              <a key={idx} href="#" className="block text-gray-500 text-sm hover:text-gray-700 mb-1">
                {item}
              </a>
            ))}
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Get Started Links */}
          <div className="md:col-span-2">
            <p className="text-green-400 font-semibold mb-2">Get Started</p>
            {[
              'Create an Account',
              'Start Your Eco Journey',
              'Join a Community',
            ].map((item, idx) => (
              <a key={idx} href="#" className="block text-gray-500 text-sm hover:text-gray-700 mb-1">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Description Text */}
        <div className="mt-8 text-sm text-gray-500 space-y-4">
          <p>
            GreenPulse is your one-stop platform to reduce your carbon footprint, join eco-conscious communities, and explore sustainable living. From tracking daily emissions to learning how to recycle and upcycle, we provide tools and motivation to live greener every day.
          </p>
          <p>
            All actions and data visualizations are meant to guide behavioral change and provide insights. This platform does not replace certified environmental auditing. Please consult experts for regulatory or commercial carbon reporting.
          </p>
          <p>
            For queries or feedback, reach out to{' '}
            <a href="mailto:support@greenpulse.org" className="hover:underline text-gray-600">
              support@greenpulse.org
            </a>.
          </p>
          <p>
            © 2025 GreenPulse. All rights reserved. Head Office: 221B Sustainability Lane, Eco District, New Delhi – 110001, India.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
