/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const SearchModal = ({ recentSearches, sidebarLinks }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full bg-white border border-gray rounded-lg shadow-md max-w-xl mx-auto">
        {/* Search Input */}
        <div className="flex items-center px-4 py-4 border-b border-gray border-opacity-20 pb-2 mb-4">
          <AiOutlineSearch className="w-6 h-6 text-gray" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow outline-none text-sm px-2"
          />
        </div>

        {/* Recently Searched */}
        <div className="mb-4 px-4">
          <h2 className="text-xs font-semibold text-slate-500 mb-2">
            Recently Searched
          </h2>
          <ul className="space-y-2">
            {recentSearches.map((item, index) => (
              <li key={index} className="text-slate-600 hover:text-black">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="px-4 mb-4">
          <h2 className="text-xs font-semibold text-slate-700 mb-2">
            Navigation
          </h2>
          <ul className="space-y-2">
            {sidebarLinks.map((link, index) => (
              <li key={index} className="text-slate-600 hover:text-black">
                <Link to={link.path}>Go to {link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
