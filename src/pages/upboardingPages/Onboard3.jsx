// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/image/logo.svg';
import FloatingLabelInput from '../../components/FloatingLabelInput'; // Import the FloatingLabelInput component

const Onboard3 = () => {
  const navigate = useNavigate();

  const handleSkipClick = () => {
    navigate('/app');
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
        <div className="flex flex-col justify-center items-center lg:w-1/2 my-8 py-8 lg:pb-28 lg:shadow-md lg:border lg:border-gray rounded-md">
          <h2 className="lg:text-4xl text-2xl font-semibold lg:mb-12 mb-8 text-center">
            Create a team
          </h2>
          <div className="lg:w-3/4 w-full mb-12">
            {/* Replace regular input with FloatingLabelInput */}
            <FloatingLabelInput label="Team Name" type="text" id="teamName" />
            <div className="flex items-center space-x-4 py-4">
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
              onClick={handleSkipClick}
              className="lg:w-1/2 w-full border border-primary text-primary font-semibold py-2 px-4 hover:bg-primary hover:text-black transition duration-300"
            >
              Skip
            </button>
            <button
              onClick={handleButtonClick}
              className="lg:w-1/2 w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard3;
