import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import Logo from '/image/logo.png';
import Cookies from 'js-cookie';

const LoginVerificationPage = () => {
  const [phone_number, setPhoneNumber] = useState(''); // Store the phone number
  const [loading, setLoading] = useState(false); // Track loading state
  const [showVerificationMessage, setShowVerificationMessage] = useState(false); // Control visibility of verification message
  const [error, setError] = useState(null); // Handle errors
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL; // Load the base URL from .env

  // Retrieve email and userId from cookies (or session, depending on your implementation)
  const email = Cookies.get('email');
  const userId = Cookies.get('userId'); // Assuming userId is stored when the user logs in
  // console.log(userId);

  // Function to send OTP
  const handleSendOtp = async (userId, phone_no) => {
    try {
      setLoading(true);

      let formattedPhoneNo = phone_no.trim(); // Assume phone_no is from the state
      // Check if the phone number already includes a '+', if not, add it
      if (!formattedPhoneNo.startsWith('+')) {
        formattedPhoneNo = `+${formattedPhoneNo}`;
      }

      const otpResponse = await fetch(
        `${BASE_URL}/user/resend-otp?user_id=${userId}&phone_number=${formattedPhoneNo}&otp_type=sms`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token_id}`, // Pass token_id in the header
          },
        }
      );

      console.log('For login verification', formattedPhoneNo);

      if (otpResponse.ok) {
        setShowVerificationMessage(true); // Show verification message
        navigate('/otp-verification');
      } else {
        setError('Failed to send OTP, Please enter a valid phone number.');
      }

      Cookies.set('phone_no', phone_number, {
        secure: true,
        sameSite: 'Strict',
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('An error occurred while sending OTP.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle form submission
  const handleFormSubmit = async e => {
    e.preventDefault();

    if (phone_number && phone_number.length >= 8) {
      // Send OTP directly without registering the user
      await handleSendOtp(userId, phone_number);
    } else {
      alert('Please enter a valid phone number.');
    }
  };

  return (
    <>
      <div className="flex items-center shadow-md py-4 lg:px-8 px-4">
        {/* Logo and Name */}
        <Link className="flex items-center" to="/">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 lg:text-xl text-sm lg:font-bold text-gray-800">
            Timeless Planner
          </span>
        </Link>
      </div>

      <div className="flex justify-center items-center lg:min-h-screen">
        <div className="flex flex-col justify-center items-center bg-white py-8 lg:px-12 px-8 lg:border m-8 border-gray lg:shadow-lg rounded-md w-full max-w-md md:max-w-lg lg:max-w-2xl lg:mt-0 mt-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center lg:mb-2 mb-2">
            Verify Your Account to Continue
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
      </div>
    </>
  );
};

export default LoginVerificationPage;
