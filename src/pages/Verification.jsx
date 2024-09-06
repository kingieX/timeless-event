import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import Logo from '/image/logo.svg';

const VerificationPage = () => {
  const [phoneNumber, setPhoneNumber] = useState(''); // Store the phone number
  const [codeSent, setCodeSent] = useState(false); // Track if code was sent
  const [code, setCode] = useState(Array(6).fill('')); // Array to store each digit of the code
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [isResending, setIsResending] = useState(false); // Track resend state
  const [resendTimeout, setResendTimeout] = useState(0); // Track resend timeout
  const [countdown, setCountdown] = useState(0); // Timer countdown for the resend code button
  const [showVerificationMessage, setShowVerificationMessage] = useState(false); // Control visibility of verification message
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (codeSent) {
      setShowVerificationMessage(false); // Hide the message when the countdown ends
    }
  }, [countdown, codeSent]);

  // Handle change in each input box
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      // Allow only numbers
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        // Automatically focus on the next input if a digit is entered
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  // Handle sending the code
  const handleSendCode = () => {
    if (phoneNumber && phoneNumber.length >= 8) {
      // Simple validation for phone number
      setCodeSent(true);
      setCountdown(60); // Start 60 seconds countdown
      setShowVerificationMessage(true); // Show the message when code is sent
      console.log(`Code sent to ${phoneNumber}`);
    } else {
      alert('Please enter a valid phone number.');
    }
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);
    const verificationCode = code.join('');

    // Logic to verify the code
    setTimeout(() => {
      navigate('/signup/onboard');
      console.log(`Phone verification code submitted:`, verificationCode);
    }, 2000);
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
            Verify Your Account
          </h2>
          <p className="text-gray-600 text-center mb-6 text-base md:text-lg lg:text-xl">
            Enter your phone number to receive a 6-digit verification code.
          </p>
          <form onSubmit={handleSubmit} className="w-full space-y-2">
            <div className="w-full flex justify-between items-center border border-gray p-2">
              <PhoneInput
                country={'us'}
                value={phoneNumber}
                onChange={setPhoneNumber}
                inputClass="text-xl w-full"
                buttonClass=""
                inputStyle={{
                  width: '100%',
                  border: 'none',
                  paddingLeft: '58px',
                }} // Removed border, padded for the flag and code
              />
              <button
                type="button"
                onClick={handleSendCode}
                className={`pl-4 lg:text-lg text-sm whitespace-nowrap ${countdown > 0 ? 'text-black' : 'text-primary'}`}
                disabled={countdown > 0}
                style={{ minWidth: '' }} // Ensures the button has enough width to avoid text wrapping
              >
                {countdown > 0 ? `${countdown}s` : 'Send Code'}
              </button>
            </div>
            {showVerificationMessage && (
              <p className="text-primary mt-1">Verification code sent</p>
            )}

            {codeSent && (
              <>
                <div className="flex justify-between space-x-2 mt-4 py-4">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-input-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleChange(e, index)}
                      className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-center text-xl md:text-2xl lg:text-3xl border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                      required
                    />
                  ))}
                </div>
              </>
            )}

            <button
              type="submit"
              className={`w-full bg-primary text-black font-semibold py-2 px-4 transition duration-300 text-base md:text-lg lg:text-xl md:py-3 lg:py-4
                ${isSubmitting ? 'bg-gray cursor-not-allowed' : 'hover:bg-transparent hover:border hover:border-primary hover:text-primary'}`}
              disabled={isSubmitting} // Disable the button during submission
            >
              {isSubmitting ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerificationPage;
