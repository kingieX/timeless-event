// import React from 'react';
import NavBar from '../../components/NavBar';
import featuresImage from '/image/features.svg';
import Footer from '../../components/Footer';

// assets imports
import Budget from '/image/feature-assets/budget.svg';

const Features = () => {
  return (
    <div>
      <div className="">
        <NavBar />
      </div>
      <div className="flex flex-col items-center lg:mx-24 mx-4 lg:py-8">
        {/* Background Image */}
        <div className="lg:w-3/5 lg:h-1/2 lg:-mt-16 w-full h-full lg:mx-12 -z-20">
          <img
            src={featuresImage}
            alt="Features Background"
            className="w-full h-full object-cover"
          />
        </div>
        {/* intro */}
        <div className="flex flex-col justify-center items-center lg:px-12 px-6 py-8">
          <h1 className="lg:max-w-xl lg:text-4xl text-2xl text-center font-bold text-black lg:mb-4 mb-1">
            Key Features{' '}
          </h1>
          {/* FEATURES LIST */}
          <div>
            {/* budget managemnet */}
            <div className="flex justify-between items-center">
              <div className="w-1/2 h-1/2 flex justify-center bg-slate-100 py-4 rounded">
                <img
                  src={Budget}
                  alt="budget management"
                  className="w-1/2 h-1/2"
                />
              </div>
              <div>
                <h2 className="lg:text-4xl text-2xl font-bol mb-4">
                  Budget Management
                </h2>
                <p>
                  Keep track of your expenses and stay within budget
                  effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Features;
