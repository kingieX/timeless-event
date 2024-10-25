import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import SignupImage from '/image/signup.png';
import Logo from '/image/logo.png';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Cookies from 'js-cookie';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract team_id and invite_id from the URL query params
  const searchParams = new URLSearchParams(location.search);
  const team_id = searchParams.get('team_id');
  const invite_id = searchParams.get('invite_id');

  // console.log('team_id:', team_id);
  // console.log('invite_id:', invite_id);

  // Set your API base URL here
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  // State to capture form inputs
  const [fullname, setFullname] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Regular expression for password validation (Capital letter, number, and symbol)
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  // Function to check if email exists
  const checkEmailExists = async email => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/user/email?email=${email}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (response.status === 200) {
        return true; // Email already exists
      }
      return false; // Email doesn't exist
    } catch (error) {
      setError('There was an issue checking your email. Please try again.');
      return true; // Assuming true to prevent proceeding with invalid state
    }
  };

  // Handle normal form submission
  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate password strength
    if (!passwordRegex.test(password)) {
      setError(
        'Password must contain at least 1 uppercase letter, 1 number, and 1 symbol.'
      );
      setLoading(false);
      return;
    }

    // Check if email already exists
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      setError('Email already exists.');
      setLoading(false);
      return;
    }

    // Store important details in secure cookies
    Cookies.set('fullname', fullname, { secure: true, sameSite: 'Strict' });
    Cookies.set('phone_no', phone_number, { secure: true, sameSite: 'Strict' });
    Cookies.set('email', email, { secure: true, sameSite: 'Strict' });
    Cookies.set('password', password, { secure: true, sameSite: 'Strict' });
    Cookies.set('team_id', team_id, { secure: true, sameSite: 'Strict' });
    Cookies.set('invite_id', invite_id, { secure: true, sameSite: 'Strict' });

    // Log the values
    // console.log('Fullname from cookies:', fullname);
    // console.log('Email from cookies:', email);
    // console.log('Password from cookies:', password);
    // console.log('Team ID from cookies:', team_id);
    // console.log('Invite ID from cookies:', invite_id);

    // Navigate to next page to complete other details
    navigate(
      `/team/user-verification?team_id=${team_id}&invite_id=${invite_id}`
    );
  };

  // Handle Google sign-up
  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'GET',
        credentials: 'include', // Include credentials if needed
      });

      if (response.ok) {
        navigate('/verification');
      } else {
        setError('Google sign-up failed.');
      }
    } catch (err) {
      setError('Google sign-up error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="">
      <div className="fixed z-20 bg-white w-full mb-6 flex items-center shadow-md py-4 lg:px-8 px-4">
        <Link className="flex items-center" to="/">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 lg:text-xl text-sm lg:font-bold text-gray-800">
            Timeless Planner
          </span>
        </Link>
      </div>

      <div className="lg:px-36 px-8 lg:pt-28 pt-24 lg:py-2 py-8 mb-4">
        <h2 className="lg:text-4xl text-2xl font-semibold lg:mb-12 mb-8 text-center">
          Sign up to get access to the team
        </h2>

        <div className="flex flex-row-reverse justify-between items-center space-x-12">
          <div className="w-full">
            <button
              onClick={handleGoogleSignUp}
              className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 px-4 w-full mb-4 hover:text-lg"
              disabled={loading}
            >
              <FcGoogle className="mr-2 w-8 h-8" />
              Continue with Google
            </button>

            <div className="flex items-center justify-center mb-4">
              <span className="border-b w-1/4 lg:w-1/3"></span>
              <span className="text-gray-500 px-2">Sign up with</span>
              <span className="border-b w-1/4 lg:w-1/3"></span>
            </div>

            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <FloatingLabelInput
                label="Full Name"
                type="text"
                id="fullname"
                value={fullname}
                onChange={e => setFullname(e.target.value)}
              />
              <div className="w-full border py-2 mb-8">
                <PhoneInput
                  country={'ng'}
                  value={phone_number}
                  onChange={setPhoneNumber}
                  inputClass="text-xl w-full"
                  buttonClass=""
                  inputStyle={{
                    width: '100%',
                    border: 'none',
                    paddingLeft: '58px',
                  }} // Removed border, padded for the flag and code
                />
              </div>
              <FloatingLabelInput
                label="Email"
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
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
              <button
                type="submit"
                className="bg-primary text-black font-semibold py-2 px-4 w-full hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
            </form>

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
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

export default RegistrationPage;
