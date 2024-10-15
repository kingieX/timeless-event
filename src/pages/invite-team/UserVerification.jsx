import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import Logo from '/image/logo.png';
import Cookies from 'js-cookie';

const UserVerification = () => {
  const [phone_number, setPhoneNumber] = useState(''); // Store the phone number
  const [loading, setLoading] = useState(false); // Track loading state
  const [showVerificationMessage, setShowVerificationMessage] = useState(false); // Control visibility of verification message
  const [error, setError] = useState(null); // Handle errors
  const navigate = useNavigate();
  const location = useLocation();

  const BASE_URL = import.meta.env.VITE_BASE_URL; // Load the base URL from .env

  //   Retrieve details from cookies
  const fullname = Cookies.get('fullname');
  const email = Cookies.get('email');
  const password = Cookies.get('password');

  const searchParams = new URLSearchParams(location.search);
  const team_id = searchParams.get('team_id');
  const invite_id = searchParams.get('invite_id');

  //   console.log('Fetched teams_id: ', team_id);
  //   console.log('Fetchd invite_id: ', invite_id);

  //   Function to register the user
  const handleRegisterUser = async () => {
    try {
      setLoading(true);
      setError('');

      // Ensure the phone number starts with a '+'
      let formattedPhoneNo = phone_number.trim();
      if (!formattedPhoneNo.startsWith('+')) {
        formattedPhoneNo = `+${formattedPhoneNo}`;
      }

      const requestBody = {
        fullname,
        email,
        phone_no: formattedPhoneNo,
        password,
        is_active: false,
        provider_id: '',
        avatar_url: '',
        role: 'user',
        reason_for_use: 'work',
      };
      // Make a POST request to register the user
      const response = await fetch(
        `${BASE_URL}/teamMember/register-and-join/${team_id}/${invite_id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || 'Registration failed.');

      Cookies.set('user_id', result.user_id, {
        secure: true,
        sameSite: 'Strict',
      });
      handleSendOtp(result.user_id);
    } catch (error) {
      console.error('Error registering user:', error);
      setError('An error occurred while registering user');
    } finally {
      setLoading(false);
      // setError('');
    }
  };

  // Function to send OTP
  const handleSendOtp = async (userId, phone_no) => {
    // await handleRegisterUser();
    try {
      let formattedPhoneNo = phone_no.trim(); // Assume phone_no is from the state
      // Check if the phone number already includes a '+', if not, add it
      if (!formattedPhoneNo.startsWith('+')) {
        formattedPhoneNo = `+${formattedPhoneNo}`;
      }

      Cookies.set('phone_no', formattedPhoneNo, {
        secure: true,
        sameSite: 'Strict',
      });

      const otpResponse = await fetch(
        `${BASE_URL}/user/resend-otp?user_id=${userId}&phone_number=${formattedPhoneNo}&otp_type=sms`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('For sign up verification', formattedPhoneNo);

      if (otpResponse.ok) {
        setLoading(true);
        setShowVerificationMessage(true); // Show verification message
        // Navigate to the OTP verification page
        navigate('/team/send-otp');
      } else {
        setError('Failed to send OTP.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('An error occurred while sending OTP.');
    }
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    handleRegisterUser();
  };

  return (
    <>
      <div className="fixed z-20 w-full bg-white flex items-center shadow-md py-4 lg:px-8 px-4">
        {/* Logo and Name */}
        <Link className="flex items-center" to="/">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 lg:text-xl text-sm lg:font-bold text-gray-800">
            Timeless Planner
          </span>
        </Link>
      </div>

      <div className="flex justify-center items-center pt-8 lg:min-h-screen">
        <div className="flex flex-col justify-center items-center bg-white py-8 lg:px-12 px-8 lg:border m-8 border-gray lg:shadow-lg rounded-md w-full max-w-md md:max-w-lg lg:max-w-2xl lg:mt-0 mt-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center lg:mb-2 mb-2">
            Verify Your Account
          </h2>
          <p className="text-gray-600 text-center mb-6 text-base md:text-lg lg:text-xl">
            Enter your phone number to receive a 6-digit verification code.
          </p>
          <form className="w-full space-y-2" onSubmit={handleFormSubmit}>
            <div className="w-full flex justify-between items-center border border-gray p-2">
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

            <button
              type="submit"
              className="bg-primary text-black font-semibold py-2 px-4 w-full hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              disabled={loading}
            >
              {loading ? 'Sending Code...' : 'Send Code'}
            </button>
            {showVerificationMessage && (
              <p className="text-primary mt-1">Verification code sent</p>
            )}
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default UserVerification;
