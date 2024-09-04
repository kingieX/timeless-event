import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import SignupImage from '/image/signup.png';
import Logo from '/image/logo.svg';
import FloatingLabelInput from '../components/FloatingLabelInput';

const SignUp = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/verification');
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

      <div className="lg:px-36 px-8 lg:py-2 py-8 mb-4">
        <h2 className="lg:text-4xl text-2xl font-semibold lg:mb-12 mb-8 text-center">
          Sign up to get started
        </h2>

        <div className="flex flex-row-reverse justify-between items-center space-x-12">
          <div className="w-full">
            <button className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 px-4 w-full mb-4 hover:text-lg">
              <FcGoogle className="mr-2 w-8 h-8" />
              Continue with Google
            </button>
            <div className="flex items-center justify-center mb-4">
              <span className="border-b w-1/4 lg:w-1/3"></span>
              <span className="text-gray-500 px-2">Sign up with</span>
              <span className="border-b w-1/4 lg:w-1/3"></span>
            </div>
            <form className="space-y-6">
              <FloatingLabelInput label="Phone number" type="text" id="phone" />
              <FloatingLabelInput label="Email" type="email" id="email" />
              <FloatingLabelInput
                label="Password"
                type="password"
                id="password"
              />
              <button
                onClick={handleButtonClick}
                className="bg-primary text-black font-semibold py-2 px-4 w-full hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              >
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

          <div className="hidden lg:block w-full hover">
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
