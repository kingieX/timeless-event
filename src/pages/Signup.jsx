// import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import SignupImage from '/image/signup.png';

const SignUp = () => {
  return (
    <div className="">
      <div className="mb-6 flex items-center border-b py-4 px-8">
        <h1 className="text-lg font-bold">Logo</h1>
      </div>

      <div className="lg:px-48 px-8 py-8">
        <h2 className="lg:text-4xl text-2xl font-semibold lg:mb-12 mb-8 text-center">
          Sign up to get started
        </h2>

        <div className="flex justify-between items-center space-x-12">
          <div className="w-full">
            <button className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 px-4 w-full mb-4">
              <FcGoogle className="mr-2 w-8 h-8" />
              Continue with Google
            </button>
            <div className="flex items-center justify-center mb-4">
              <span className="border-b w-1/4 lg:w-1/3"></span>
              <span className="text-gray-500 px-2">Sign up with</span>
              <span className="border-b w-1/4 lg:w-1/3"></span>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
                />
              </div>
              <button className="bg-primary text-black font-semibold py-2 px-4 w-full hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300">
                Sign up
              </button>
            </form>
            <p className="lg:text-left text-center text-gray-700 mt-4">
              Already signed up?{' '}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                Go to login
              </Link>
            </p>
          </div>

          <div className="hidden lg:block w-full">
            <img
              src={SignupImage}
              alt="Sign up illustration"
              className="w-3/4 h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
