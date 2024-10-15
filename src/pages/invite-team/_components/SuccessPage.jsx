import { Link } from 'react-router-dom';
import { Checkmark } from 'react-checkmark';
import Logo from '/image/logo.png';

const TeamSuccessPage = () => {
  return (
    <div className="w-full">
      <div className="fixed z-20 w-full bg-white mb-6 flex items-center shadow-md py-4 lg:px-8 px-4">
        {/* Logo and Name */}
        <Link className="flex items-center" to="/">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 lg:text-xl text-sm lg:font-bold text-gray-800">
            Timeless Planner
          </span>
        </Link>
      </div>
      <div className="flex lg:pt-28 pt-12 justify-center items-center bg-gray-100">
        <div className="flex flex-col justify-center items-center bg-white py-0 lg:py-10 lg:px-24 px-8 lg:border m-8 border-gray lg:shadow-lg rounded-md w-full max-w-md md:max-w-lg lg:max-w-2xl lg:mt-0 mt-20">
          <Checkmark size="128px" color="#16E1F5" />

          <h1 className="text-3xl mt-4 font-semibold text-green-600 mb-4">
            Account Verified!
          </h1>
          <p className="text-gray-700 text-lg text-center mb-6">
            Your account has been successfully verified, and you've been added
            to the team. You can now log in to view your team details.
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

export default TeamSuccessPage;
