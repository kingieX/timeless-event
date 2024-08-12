// import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import featuresImage from '/image/features.svg';
import Footer from '../../components/Footer';

const Features = () => {
  return (
    <div>
      <div className="">
        <NavBar />
      </div>
      <div className="flex flex-col items-center lg:mx-24 lg:py-8">
        {/* Background Image */}
        <div className="lg:w-3/4 lg:h-1/2 lg:-mt-20 w-full h-full lg:mx-12 -z-20">
          <img
            src={featuresImage}
            alt="Features Background"
            className="w-full h-full object-cover"
          />
        </div>
        {/* intro */}
        <div className="flex flex-col justify-center items-center lg:px-12 px-6 py-8">
          <h1 className="lg:max-w-xl lg:text-4xl text-2xl text-center font-bold text-black lg:mb-4 mb-1">
            Bringing Your Vision to Life with Ease and Elegance
          </h1>
          <p className="lg:max-w-xl lg:text-xl text-center text-gray-700 mb-6">
            TimelessPlanner is your ultimate event planning companion, designed
            to help you create unforgettable experiences with minimal effort.
          </p>
          <Link to="/signup">
            <button className="bg-primary text-black font-bold py-3 px-6 inline-flex items-center transition-transform transform lg:hover:translate-x-2 hover:border hover:border-primary hover:bg-transparent hover:text-primary">
              Get Started
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Features;
