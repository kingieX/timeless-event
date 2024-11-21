import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import loginImage from '/image/login.png';
import Logo from '/image/logo.png';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle form submission
  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new URLSearchParams({
        grant_type: 'password',
        username: email,
        password: password,
        scope: '',
        client_id: 'string', // Replace with actual client ID
        client_secret: 'string', // Replace with actual client secret
      });

      // Authenticate the user
      const response = await fetch(`${API_BASE_URL}/user/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: data.toString(),
      });

      const postData = await response.json();
      // console.log('Server Response:', postData);

      if (response.ok) {
        // Extract tokens and userId from the server response
        const access_token = postData?.access_token;
        const token_id = postData?.token_id;
        const refresh_token = postData?.refresh_token;
        const userId = postData?.user_id || postData?.id;

        if (!userId || !access_token || !token_id || !refresh_token) {
          throw new Error('Missing user ID or tokens in the server response.');
        }

        const expirationTime = new Date().getTime() + 12 * 60 * 60 * 1000; // 12 hours
        Cookies.set('access_token_expiration', expirationTime);

        // Store tokens and userId in secure cookies
        Cookies.set('access_token', access_token, {
          secure: true,
          sameSite: 'Strict',
        });
        Cookies.set('token_id', token_id, { secure: true, sameSite: 'Strict' });
        Cookies.set('refresh_token', refresh_token, {
          secure: true,
          sameSite: 'Strict',
        });

        // Fetch user details using the userId
        const userResponse = await fetch(`${API_BASE_URL}/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            // Authorization: `Bearer ${access_token}`, // Pass token_id in the header
          },
        });

        const userDetails = await userResponse.json();
        // console.log('User Details:', userDetails);

        if (userResponse.ok) {
          // Store all user details in cookies
          Cookies.set('user_id', userDetails.user_id);
          Cookies.set('fullname', userDetails.fullname, {
            secure: true,
            sameSite: 'Strict',
          });
          Cookies.set('role', userDetails.role, {
            secure: true,
            sameSite: 'Strict',
          });
          Cookies.set('reason_for_use', userDetails.reason_for_use, {
            secure: true,
            sameSite: 'Strict',
          });
          Cookies.set('phone_no', userDetails.phone_no, {
            secure: true,
            sameSite: 'Strict',
          });
          Cookies.set('is_active', userDetails.is_active, {
            secure: true,
            sameSite: 'Strict',
          });
          Cookies.set('avatar_url', userDetails.avatar_url, {
            secure: true,
            sameSite: 'Strict',
          });

          // Check if the user is active
          if (userDetails.is_active === true) {
            navigate('/app');
          } else {
            navigate('/loginverification');
          }
        } else {
          throw new Error('Failed to fetch user details.');
        }
      } else {
        const errorMessage =
          postData?.message || 'Incorrect email or password.';
        setError(errorMessage);
      }
    } catch (err) {
      setError('An error occurred.');
      console.error('An error occurred:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgottenPassword = () => {
    navigate('/forgot-password');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div>
      <div className="mb-6 flex items-center shadow-md py-4 lg:px-8 px-4">
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
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />

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
