import React from 'react';
import { FaTwitter, FaFacebookSquare, FaInstagram, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';

const companyLinks = [
  "About Us",
  "Sustainability Mission",
  "How It Works",
  "Partnerships",
  "Careers",
  "EcoBlog",
  "Media Kit",
  "EcoSphere Cares",
];

const supportLinks = [
  'Help Center',
  'Contact Us',
  'FAQs',
  'Carbon Tracker Guide',
  'Community Guidelines',
  'Resources',
];

const getStartedLinks = ['Create an Account', 'Start Your Eco Journey', 'Join a Community'];

const socialIcons = [
  { Icon: FaTwitter, hover: "hover:text-sky-400" },
  { Icon: FaFacebookSquare, hover: "hover:text-blue-400" },
  { Icon: FaInstagram, hover: "hover:text-pink-400" },
  { Icon: FaLinkedinIn, hover: "hover:text-blue-300" },
  { Icon: FaTelegramPlane, hover: "hover:text-sky-300" },
];

function LinkList({ items }) {
  return (
    <>
      {items.map((item, idx) => (
        <a key={idx} href="#" className="block text-green-200 text-sm hover:text-lime-300 mb-1">
          {item}
        </a>
      ))}
    </>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-white/10 eco-static-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Logo and Socials */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left mb-8 md:mb-0">
          <div className="flex items-center gap-3 mb-4">
            <img className="w-6 h-6" src="/earth.png" alt="logo" />
            <span style={{fontFamily: 'Pacifico, cursive'}} className="text-green-50 text-lg font-medium">EcoSphere</span>
          </div>
          <p className="text-green-200 text-sm mb-2">
            © 2025, EcoSphere Community<br />All rights reserved.
          </p>
          <div className="flex gap-3 mt-2 text-green-200 text-lg">
            {socialIcons.map(({ Icon, hover }, idx) => (
              <Icon key={idx} className={`transition-colors cursor-pointer ${hover}`} />
            ))}
          </div>
        </div>

        {/* Desktop link grid */}
        <div className="hidden md:grid grid-cols-12 gap-8 mt-8">
          <div className="col-span-3" />
          <div className="col-span-2">
            <p className="text-lime-300 font-semibold mb-2">Company</p>
            <LinkList items={companyLinks} />
          </div>
          <div className="col-span-1" />
          <div className="col-span-2">
            <p className="text-lime-300 font-semibold mb-2">Support</p>
            <LinkList items={supportLinks} />
          </div>
          <div className="col-span-1" />
          <div className="col-span-2">
            <p className="text-lime-300 font-semibold mb-2">Get Started</p>
            <LinkList items={getStartedLinks} />
          </div>
        </div>

        {/* Mobile accordion link groups */}
        <div className="md:hidden mt-2 space-y-2">
          {[
            { title: "Company", items: companyLinks },
            { title: "Support", items: supportLinks },
            { title: "Get Started", items: getStartedLinks },
          ].map(({ title, items }) => (
            <details key={title} className="group rounded-xl bg-white/5 border border-white/10 px-4 py-3">
              <summary className="flex items-center justify-between cursor-pointer text-lime-300 font-semibold list-none">
                {title}
                <span className="transition-transform duration-200 group-open:rotate-45 text-green-200 text-xl leading-none">+</span>
              </summary>
              <div className="mt-3 space-y-1">
                <LinkList items={items} />
              </div>
            </details>
          ))}
        </div>

        {/* Description Text */}
        <div className="mt-8 text-sm text-green-200 space-y-4">
          <p>
            EcoSphere is your one-stop platform to reduce your carbon footprint, join eco-conscious communities, and explore sustainable living. From tracking daily emissions to learning how to recycle and upcycle, we provide tools and motivation to live greener every day.
          </p>
          <p>
            All actions and data visualizations are meant to guide behavioral change and provide insights. This platform does not replace certified environmental auditing. Please consult experts for regulatory or commercial carbon reporting.
          </p>
          <p>
            For queries or feedback, reach out to{' '}
            <a href="mailto:support@greenpulse.org" className="hover:underline text-green-100">
              ecospherehelpdesk@gmail.com
            </a>.
          </p>
          <p>
            © 2025 EcoSphere. All rights reserved. Head Office: I.E.T. Lucknow, District Lucknow, Uttar Pradesh– 226021, India.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
