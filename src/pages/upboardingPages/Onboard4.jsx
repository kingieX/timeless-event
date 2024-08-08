// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/image/logo.svg';

const Onboard4 = () => {
  const navigate = useNavigate();

  const handleSkipClick = () => {
    navigate('/dashboard');
  };

  const handleButtonClick = () => {
    navigate('/signup/about-team');
  };
  return (
    <div>
      <div className="mb-6 flex items-center shadow-md py-4 lg:px-8 px-4">
        {/* Logo and Name */}
        <Link className="flex items-center" to="/">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 lg:text-xl text-sm lg:font-bold text-gray-800">
            Timeless Planner
          </span>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center mx-6">
        <div className="flex flex-col justify-center items-center lg:w-1/2  my-8 py-8 lg:pb-28 lg:shadow-md lg:border lg:border-gray rounded-md">
          <h2 className="lg:text-4xl text-2xl font-semibold text-center">
            About you and your team
          </h2>
          <p className="lg:mb-12 mb-8 text-center lg:text-lg text-gray-700">
            Your answer will help us tailor your overall experience.
          </p>
          <div className="lg:w-3/4 w-full mb-12">
            <label className="block text-gray-700">
              What industry do you work in?
            </label>
            <select
              id="options"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="option1">I own or run the company</option>
              <option value="option2">
                I lead a team within the company or organisation
              </option>
              <option value="option3">I’m a team member</option>
            </select>
            <div className="flex items-center space-x-4 py-6">
              <label
                htmlFor="sharedWorkspace"
                className="lg:text-normal text-sm text-gray-700"
              >
                Set up shared workspace for team project or event alongside your
                personal?
              </label>
              <input
                id="sharedWorkspace"
                type="checkbox"
                className="mr-2 w-6 h-6"
              />
            </div>
          </div>
          <div className="lg:w-3/4 w-full flex justify-between gap-8">
            <button
              onClick={handleButtonClick}
              className="lg:w-1/2 w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
            >
              Continue
            </button>
            <button
              onClick={handleSkipClick}
              className="lg:w-1/2 w-full border border-primary text-primary font-semibold py-2 px-4 hover:bg-primary hover:text-black transition duration-300"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard4;
