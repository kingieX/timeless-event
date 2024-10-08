// import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
// import Logo from '/image/logo.svg';
import Logo from '/image/logo.png';

const Footer = () => {
  return (
    <footer className="bg-footer text-white py-8 lg;px-16 px-4">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          {/* Logo and Name */}
          <Link className="flex items-center" to="/">
            <img src={Logo} alt="Logo" className="lg:h-8 lg:w-8 w-6 h-6" />
            <span className="ml-2 lg:text-2xl lg:font-normal text-gray-800">
              Timeless Planner
            </span>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 w-full justify-around">
            <div>
              <h1 className="text-xl font-bold">Resources</h1>
              <ul className="space-y-2">
                <li>Get Started</li>
                <li>How it works</li>
                <li>User guide</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h1 className="text-xl font-bold mb-4">Support</h1>
              <ul className="space-y-2">
                <li>Get Started</li>
                <li>How it works</li>
                <li>User guide</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h1 className="text-xl font-bold mb-4">About</h1>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Services</li>
              </ul>
              <div className="flex space-x-4 py-8">
                <FaXTwitter className="text-white hover:text-gray-400 w-8 h-8" />
                <FaFacebook className="text-white hover:text-gray-400 w-8 h-8" />
                <FaYoutube className="text-white hover:text-gray-400 w-8 h-8" />
                <FaInstagram className="text-white hover:text-gray-400 w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-600 pt-4 lg:text-left text-center">
          <p>2024 TimelessPlanner Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
