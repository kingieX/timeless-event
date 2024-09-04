// import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/image/logo.svg';
import FloatingLabelInput from '../../components/FloatingLabelInput'; // Import the FloatingLabelInput component

const Onboard1 = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/signup/customize-experience');
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

      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center lg:w-1/2 my-8 py-12 lg:shadow-md lg:border lg:border-gray rounded-md">
          <h2 className="lg:text-4xl text-2xl font-semibold lg:mb-12 mb-8 text-center">
            Let’s get to know you better
          </h2>
          <div className="lg:w-3/4 w-full mb-8">
            {/* Replace regular input with FloatingLabelInput */}
            <FloatingLabelInput label="Enter your name" type="text" id="name" />
          </div>
          <button
            onClick={handleButtonClick}
            className="lg:w-1/2 w-full bg-primary text-black font-semibold py-2 px-4 mb-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboard1;
