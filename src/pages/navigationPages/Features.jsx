// import React from 'react';
import NavBar from '../../components/NavBar';
import featuresImage from '/image/features.svg';
import Footer from '../../components/Footer';

// assets imports
import Budget from '/image/feature-assets/budget.svg';
import Team from '/image/feature-assets/team-management.svg';
import TaskTracking from '/image/feature-assets/task-tracking.svg';
import VendorCoordination from '/image/feature-assets/vendor-coordination.svg';
import TimelineCreation from '/image/feature-assets/timeline-creation.svg';

const Features = () => {
  return (
    <div>
      <div className="">
        <NavBar />
      </div>
      <div className="flex flex-col items-center lg:px-24 mx-4 lg:py-8">
        {/* Background Image */}
        <div className="lg:w-3/5 lg:h-1/2 w-full h-full lg:mt-0 mt-10 -z-20">
          <img
            src={featuresImage}
            alt="Features Background"
            className="w-full h-full object-cover"
          />
        </div>
        {/* intro */}
        <div className="flex flex-col justify-center items-center lg:px- px-6 py-8">
          <h1 className="lg:max-w-xl lg:text-4xl text-3xl text-center font-semibold text-black lg:mb-4 mb-4">
            Explore our Key Features{' '}
          </h1>
          {/* FEATURES LIST */}
          <div className="flex flex-col gap-8">
            {/* budget managemnet */}
            <div
              id="budget-management"
              className="flex lg:flex-row flex-col-reverse justify-between items-start lg:gap-12 gap-4 py-4"
            >
              <div className="lg:w-1/2 lg:h-1/2 flex justify-center bg-blue-100 py-4 rounded-md">
                <img
                  src={Budget}
                  alt="budget management"
                  className="w-1/2 h-1/2"
                />
              </div>
              <div className="flex flex-col items-start">
                <h2 className="lg:text-4xl text-xl lg:mb-2 mb-1">
                  Budget Management
                </h2>
                <p className="lg:text-lg text-sm text-gray-600">
                  Keep track of your expenses and stay within budget
                  effortlessly.
                </p>
              </div>
            </div>

            {/* TEAM AND GUEST LIST MANAGEMENT */}
            <div
              id="team-management"
              className="flex lg:flex-row-reverse flex-col-reverse justify-center items-start lg:gap-12 gap-4 py-4"
            >
              <div className="lg:w-1/2 lg:h-1/2 flex justify-center bg-blue-100 py-4 rounded-md px-4">
                <img
                  src={Team}
                  alt="Team and Guest management"
                  className="w-3/4 h-3/4"
                />
              </div>
              <div className="flex flex-col items-start">
                <h2 className="lg:text-4xl text-xl lg:mb-2 mb-1">
                  Team and Guest List Management
                </h2>
                <p className="lg:text-lg text-sm text-gray-600">
                  Easily manage your guest or team list, send invitations, and
                  track RSVPs.
                </p>
              </div>
            </div>

            {/* TASK TRACKING */}
            <div
              id="task-tracking"
              className="flex lg:flex-row flex-col-reverse justify-center items-start lg:gap-12 gap-4 py-4"
            >
              <div className="lg:w-1/2 lg:h-1/2 flex justify-center bg-blue-100 py-4 rounded-md px-4">
                <img
                  src={TaskTracking}
                  alt="Task Tracking"
                  className="w-1/2 h-1/2"
                />
              </div>
              <div className="flex flex-col items-start">
                <h2 className="lg:text-4xl text-xl lg:mb-2 mb-1">
                  Task Tracking
                </h2>
                <p className="lg:text-lg text-sm text-gray-600">
                  Assign and monitor tasks to ensure everything is on schedule.
                </p>
              </div>
            </div>

            {/* VENDOR COORDINATION */}
            <div
              id="vendor-coordination"
              className="flex lg:flex-row-reverse flex-col-reverse justify-center items-start lg:gap-12 gap-4 py-4"
            >
              <div className="lg:w-1/2 lg:h-1/2 flex justify-center bg-blue-100 py-4 rounded-md px-4">
                <img
                  src={VendorCoordination}
                  alt="Vendor Coordination"
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col items-start">
                <h2 className="lg:text-4xl text-xl lg:mb-2 mb-1">
                  Vendor Coordination
                </h2>
                <p className="lg:text-lg text-sm text-gray-600">
                  Find and manage vendors, all in one place.
                </p>
              </div>
            </div>

            {/* TASK AND EVENT TIMELINE CREATION */}
            <div
              id="timeline-creation"
              className="flex lg:flex-row flex-col-reverse justify-center items-start lg:gap-12 gap-4 py-4"
            >
              <div className="lg:w-1/2 lg:h-1/2 flex justify-center bg-blue-100 py-4 rounded-md px-4">
                <img
                  src={TimelineCreation}
                  alt="Task and Event Timeline Creation"
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col items-start">
                <h2 className="lg:text-4xl text-xl lg:mb-2 mb-1">
                  Task and Event Timeline Creation
                </h2>
                <p className="lg:text-lg text-sm text-gray-600">
                  Create detailed timelines to ensure your event or schedules
                  run smoothly.
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
