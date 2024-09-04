/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import loginImage from '/image/login.png';
import Logo from '/image/logo.svg';
import FloatingLabelInput from '../components/FloatingLabelInput';

const Login = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/app');
  };

  const handleForgottenPassword = () => {
    navigate('/reset-password');
  };

  return (
    <div className="">
      <div className="mb-6 flex items-center shadow-md py-4 lg:px-8 px-4">
        {/* Logo and Name */}
        <Link className="flex items-center" to="/">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 lg:text-xl text-sm lg:font-bold text-gray-800">
            Timeless Planner
          </span>
        </Link>
      </div>

      <div className="lg:px-48 px-8 py-8">
        <h2 className="lg:text-4xl text-2xl font-semibold lg:mb-12 mb-8 text-center">
          Log in to Continue
        </h2>

        <div className="flex flex-row-reverse justify-between items-center space-x-12">
          <div className="w-full">
            <button className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 px-4 w-full mb-4 hover:text-lg">
              <FcGoogle className="mr-2 w-8 h-8" />
              Continue with Google
            </button>
            <div className="flex items-center justify-center mb-4">
              <span className="border-b w-1/4 lg:w-1/3"></span>
              <span className="text-gray-500 px-2">Log in with</span>
              <span className="border-b w-1/4 lg:w-1/3"></span>
            </div>
            <form className="space-y-6">
              <div className="mb-4">
                {/* Replace Email input with FloatingLabelInput */}
                <FloatingLabelInput label="Email" type="email" id="email" />
              </div>
              <div className="">
                {/* Replace Password input with FloatingLabelInput */}
                <FloatingLabelInput
                  label="Password"
                  type="password"
                  id="password"
                />
                <p
                  onClick={handleForgottenPassword}
                  className="mb-4 mt-1 text-sm text-red-500 cursor-pointer ml-1 font-semibold"
                >
                  Forgotten password
                </p>
              </div>
              <button
                onClick={handleButtonClick}
                className="bg-primary text-black font-semibold py-2 px-4 w-full hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              >
                Log in
              </button>
            </form>
            <p className="lg:text-left text-center text-gray-700 mt-4">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-primary font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="hidden lg:block w-full">
            <img
              src={loginImage}
              alt="Sign up illustration"
              className="w-3/4 h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
