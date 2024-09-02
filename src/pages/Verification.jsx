import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/image/logo.svg';

const VerificationPage = () => {
  const [verificationMethod, setVerificationMethod] = useState('email'); // 'email' or 'phone'
  const [code, setCode] = useState(Array(6).fill('')); // Array to store each digit of the code
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [isResending, setIsResending] = useState(false); // Track resend state
  const [resendTimeout, setResendTimeout] = useState(0); // Track resend timeout
  const navigate = useNavigate();

  // Handle change in each input box
  const handleChange = (e, index) => {
    const { value } = e.target;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Automatically focus on the next input if a digit is entered
      if (value && index < 5) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true
    const verificationCode = code.join('');
    // Logic to verify the code
    setTimeout(() => {
      navigate('/signup/onboard');
      console.log(
        `${verificationMethod.charAt(0).toUpperCase() + verificationMethod.slice(1)} verification code submitted:`,
        verificationCode
      );
    }, 2000); // Simulate a delay for submission
  };

  // Handle resending the code
  const handleResendCode = () => {
    setIsResending(true);
    setResendTimeout(30); // Set timeout to 30 seconds before user can resend again

    // Simulate sending the code again
    setTimeout(() => {
      console.log(`Resent code for ${verificationMethod}`);
      setIsResending(false);
    }, 2000); // Simulate a delay for resending code

    // Countdown for the resend button
    const countdown = setInterval(() => {
      setResendTimeout(prevTimeout => {
        if (prevTimeout === 1) {
          clearInterval(countdown);
        }
        return prevTimeout - 1;
      });
    }, 1000);
  };

  // Switch to phone verification form and reset inputs
  const switchToPhoneVerification = () => {
    setVerificationMethod('phone');
    setCode(Array(6).fill('')); // Reset the input fields
  };

  // Switch back to email verification form and reset inputs
  const switchToEmailVerification = () => {
    setVerificationMethod('email');
    setCode(Array(6).fill('')); // Reset the input fields
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
        <div className="bg-white py-8 lg:px-12 px-8 lg:border m-8 border-gray lg:shadow-lg rounded-md w-full max-w-md md:max-w-lg lg:max-w-2xl lg:mt-0 mt-24">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center lg:mb-6 mb-2">
            {verificationMethod === 'email'
              ? 'Verify Using Your Email'
              : 'Verify Using Phone Number'}
          </h2>
          <p className="text-gray-600 text-center mb-4 text-base md:text-lg lg:text-xl">
            {verificationMethod === 'email'
              ? 'Enter the 6-digit code we sent to your email.'
              : 'Enter the 6-digit code sent to your phone number.'}
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between space-x-2">
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
            <button
              type="submit"
              className={`w-full bg-primary text-black font-semibold py-2 px-4 rounded transition duration-300 text-base md:text-lg lg:text-xl md:py-3 lg:py-4
                ${isSubmitting ? 'bg-gray cursor-not-allowed' : 'hover:bg-transparent hover:border hover:border-primary hover:text-primary'}`}
              disabled={isSubmitting} // Disable the button during submission
            >
              {isSubmitting ? 'Verifying...' : 'Verify'}
            </button>
          </form>

          {/* Options */}
          <div className="flex flex-row-reverse justify-between">
            <div className="text-center mt-4">
              <button
                onClick={handleResendCode}
                className={`text-primary hover:underline focus:outline-none text-sm font-semibold md:text-base lg:text-lg ${
                  isResending || resendTimeout > 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : ''
                }`}
                disabled={isResending || resendTimeout > 0} // Disable the button when resending or timeout is active
              >
                {isResending
                  ? 'Resending...'
                  : resendTimeout > 0
                    ? `Resend Code in ${resendTimeout}s`
                    : 'Resend Code'}
              </button>
            </div>
            <div className="text-center mt-4">
              {verificationMethod === 'email' ? (
                <button
                  onClick={switchToPhoneVerification}
                  className="text-primary hover:underline focus:outline-none text-sm font-semibold md:text-base lg:text-lg"
                >
                  Verify using phone number
                </button>
              ) : (
                <button
                  onClick={switchToEmailVerification}
                  className="text-primary hover:underline focus:outline-none text-sm font-semibold md:text-base lg:text-lg"
                >
                  Verify using email
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerificationPage;
