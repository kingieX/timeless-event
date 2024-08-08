/* eslint-disable react/prop-types */
// import React from 'react';
import featuresImage from '/image/hero2.png';

const Feature = ({ feature }) => {
  return (
    <section className="container relative flex justify-center items-end mt-10 py-4 px-8">
      {/* Background Image */}
      <div className="lg:block hidden w-full h-full">
        <img
          src={featuresImage}
          alt="Features Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Features Content */}
      <div className="relative z-10 bg-white p-8 lg:px-8 shadow-md max-w-md lg:max-w-md right-0 lg:absolute lg:right-8 border border-gray">
        <h2 className="lg:text-2xl font-normal mb-8">FEATURES</h2>
        <div className="space-y-6">
          {feature.map((feature, index) => (
            <div
              key={index}
              className="flex justify-between items-start space-x-8"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="h-8 w-8"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="lg:text-lg font-semibold">{feature.title}</h3>
                  <div className="flex items-start lg:gap-12 gap-4">
                    <p className="lg:text-normal text-sm text-gray-600">
                      {feature.description}
                    </p>
                    <a href={feature.link} className="w-12 hover:translate-x-4">
                      <img
                        src="/image/assets/arrow-right.svg"
                        alt="arrow"
                        className="h-10 w-10"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
