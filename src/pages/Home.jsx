/* eslint-disable react/no-unescaped-entities */
// import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import HowItWorks from '../components/HowItWorks';

import image from '/image/hero3.png';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const featuresData = [
  {
    icon: '/image/assets/feature1.svg',
    title: 'BUDGET MANAGEMENT',
    description:
      'Keep track of your expenses and stay within budget effortlessly.',
    link: '#budget-management',
  },
  {
    icon: '/image/assets/feature2.svg',
    title: 'TEAM AND GUEST LIST MANAGEMENT',
    description:
      'Easily manage your guest or team list, send invitations, and track RSVPs.',
    link: '#team-management',
  },
  {
    icon: '/image/assets/feature3.svg',
    title: 'TASK TRACKING',
    description:
      'Assign and monitor tasks to ensure everything is on schedule.',
    link: '#task-tracking',
  },
  {
    icon: '/image/assets/feature4.svg',
    title: 'VENDOR COORDINATION',
    description: 'Find and manage vendors, all in one place.',
    link: '#vendor-coordination',
  },
  {
    icon: '/image/assets/feature5.svg',
    title: 'TASK AND EVENT TIMELINE CREATION',
    description:
      'Create detailed timelines to ensure your event or schedules run smoothly.',
    link: '#timeline-creation',
  },
];

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="containe w-full mx-auto py-8">
        <Hero />
        <Feature feature={featuresData} />

        {/* why choose us */}
        <section className="bg-secondary text-white py-16 px-8 lg:py-12 lg:px-32 flex flex-col lg:flex-row items-center lg:items-end space-y-8 lg:space-y-0 lg:space-x-12">
          {/* Text Content */}
          <div className="flex-1">
            <h2 className="lg:text-4xl text-2xl font-bold mb-4">
              Why Choose Timeless Planner?
            </h2>
            <ul className="space-y-4">
              <li>
                <h3 className="text-2xl">• User-Friendly Interface</h3>
                <p className="lg:text-lg text-sm text-gray-600">
                  Our intuitive design makes event planning a breeze for
                  everyone.
                </p>
              </li>
              <li>
                <h3 className="text-2xl">• Comprehensive Tools</h3>
                <p className="lg:text-lg text-sm text-gray-600">
                  From team tracking to vendor management, we've got you
                  covered.
                </p>
              </li>
              <li>
                <h3 className="text-2xl">• Collaborative Planning</h3>
                <p className="lg:text-lg text-sm text-gray-600">
                  Work seamlessly with your team and vendors in real-time.
                </p>
              </li>
              <li>
                <h3 className="text-2xl">• Reliable and Secure</h3>
                <p className="lg:text-lg text-sm text-gray-600">
                  Your data is safe with us, and our platform is available 24/7.
                </p>
              </li>
              <li>
                <h3 className="text-2xl">• Customizable Experience</h3>
                <p className="lg:text-lg text-sm text-gray-600">
                  Tailor TimelessEvent to suit your specific needs and
                  preferences.
                </p>
              </li>
            </ul>
          </div>

          {/* Image */}
          <div className="flex-1">
            <img
              src={image}
              alt="Why Choose Us"
              className="w-full h-auto object-cover"
            />
          </div>
        </section>

        {/* Steps */}
        <HowItWorks />

        {/* ready to ... */}
        <section className="flex flex-col items-center justify-between px-8 py-8">
          <h1 className="lg:text-4xl text-2xl font-bold mb-4 text-center max-w-xl">
            Ready to Plan Your Perfect Event?
          </h1>
          <p className="lg:text-lg text-sm text-gray-600 text-center max-w-2xl mb-8">
            Join Timeless Planner today and transform the way you plan and
            manage your events. Sign up now to start your journey towards a
            seamless and unforgettable event experience.
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
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
