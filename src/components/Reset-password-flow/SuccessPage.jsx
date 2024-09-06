import { Link } from 'react-router-dom';
import Logo from '/image/logo.svg';
import { Checkmark } from 'react-checkmark';

const SuccessPage = () => {
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center shadow-md py-4 lg:px-8 px-4">
        {/* Logo and Name */}
        <Link className="flex items-center" to="/">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 lg:text-xl text-sm lg:font-bold text-gray-800">
            Timeless Planner
          </span>
        </Link>
      </div>

      <div className="lg:min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col justify-center items- bg-white py-0 lg:py-10 lg:px-24 px-8 lg:border m-8 border-gray lg:shadow-lg rounded-md w-full max-w-md md:max-w-lg lg:max-w-2xl lg:mt-0 mt-20">
          <Checkmark size="128px" color="#16E1F5" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center lg:my-4 my-2">
            Password Reset Successful
          </h2>
          <p className="text-slate-600 text-center mb-6 text-base md:text-lg lg:text-xl">
            Your password has been successfully reset. You can now log in with
            your new password.
          </p>
          <Link
            to="/login"
            className="bg-primary text-black text-center font-semibold py-2 px-4 lg:mt-4 mt-2 w-full hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
