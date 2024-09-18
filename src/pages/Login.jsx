/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import loginImage from '/image/login.png';
import Logo from '/image/logo.png';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();

  // Set your API base URL here
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  // State to capture form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Handle normal form submission
  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Create a URL-encoded string from form data
    const data = new URLSearchParams({
      grant_type: 'password',
      username: email,
      password: password,
      scope: '',
      client_id: 'string', // Replace 'string' with actual client ID if necessary
      client_secret: 'string', // Replace 'string' with actual client secret if necessary
    });

    try {
      const response = await fetch(`${API_BASE_URL}/user/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the correct content type
          Accept: 'application/json',
        },
        body: data.toString(), // Send URL-encoded data
      });

      if (response.ok) {
        // Navigate to the verification page
        navigate('/app');
        console.log('Login successful');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong, please try again');
        console.error('Error details:', errorData);
      }
    } catch (err) {
      setError('Network error, please try again later.');
      console.error('An error occurred:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgottenPassword = () => {
    navigate('/forgot-password');
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
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
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="mb-4">
                {/* Replace Email input with FloatingLabelInput */}
                <FloatingLabelInput
                  label="Email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="">
                <div className="relative">
                  <FloatingLabelInput
                    label="Password"
                    type={showPassword ? 'text' : 'password'} // Dynamically change input type
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />

                  {/* Icon for toggling password visibility */}
                  <span
                    className="absolute right-3 top-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} className="text-slate-600" />
                    ) : (
                      <FaEye size={20} className="text-slate-600" />
                    )}
                  </span>
                </div>
                <p
                  onClick={handleForgottenPassword}
                  className="mb-4 mt-1 text-sm text-red-500 cursor-pointer ml-1 font-semibold"
                >
                  Forgotten password
                </p>
              </div>
              <button
                type="submit"
                className="bg-primary text-black font-semibold py-2 px-4 w-full hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </form>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

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
