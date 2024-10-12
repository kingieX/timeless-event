import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // For validation schema
import Logo from '/image/logo.svg';
import FloatingLabelInput from '../../components/FloatingLabelInput'; // Import the FloatingLabelInput component
import Cookies from 'js-cookie'; // For accessing userId from cookies
import { useState } from 'react'; // For error state handling

const Onboard3 = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null); // Handle errors

  // Access userId from Cookies
  const userId = Cookies.get('userId');
  // const access_token = Cookies.get('access_token'); // Get the access token from cookies

  // if (!access_token) {
  //   throw errorMessage('You do not have an access_token');
  // }

  const BASE_URL = import.meta.env.VITE_BASE_URL; // Load the base URL from .env

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      workspaceName: '',
      sharedWorkspace: false,
    },
    validationSchema: Yup.object({
      workspaceName: Yup.string().required('workspace name is required'),
    }),
    onSubmit: async values => {
      setErrorMessage(null); // Reset error message before submission
      try {
        const body = {
          team_space_name: values.teamName,
          share_space: values.sharedWorkspace,
          user_id: userId, // Get userId from cookies
        };

        const response = await fetch(`${BASE_URL}/teamspace/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${access_token}`, // Pass token_id in the header
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          // Save the team_space_id in cookies
          Cookies.set('team_space_id', data.team_space_id);

          // Handle successful team creation
          navigate('/signup/create-team');
        } else {
          // Handle non-successful response
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Failed to create workspace');
        }
      } catch (error) {
        // Handle fetch error
        setErrorMessage('An unexpected error occurred. Please try again.');
        console.error('Error:', error);
      }
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center shadow-md py-4 lg:px-8 px-4">
        {/* Logo and Name */}
        <Link className="flex items-center" to="/">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 lg:text-xl text-sm lg:font-bold text-gray-800">
            Timeless Planner
          </span>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center mx-6">
        <div className="flex flex-col justify-center items-center lg:w-1/2 my-8 py-8 lg:pb-28 lg:shadow-md lg:border lg:border-gray rounded-md">
          <h2 className="lg:text-4xl text-2xl font-semibold lg:mb-12 mb-8 text-center">
            Create your workspace
          </h2>
          {/* Display error message if it exists */}
          {errorMessage && (
            <div className="lg:w-3/4 w-full mb-4 p-2 bg-red-100 text-red-500 border border-red-400 rounded-md">
              {errorMessage}
            </div>
          )}
          <div className="lg:w-3/4 w-full mb-12">
            {/* Replace regular input with FloatingLabelInput */}
            <FloatingLabelInput
              label="Give your workspace a name"
              type="text"
              id="workspaceName"
              value={formik.values.workspaceName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Track input blur for validation
            />
            {formik.touched.workspaceName && formik.errors.workspaceName ? (
              <div className="text-red-500">{formik.errors.workspaceName}</div>
            ) : null}
            <div className="flex items-center justify-between space-x-4 py-4">
              <label
                htmlFor="sharedWorkspace"
                className="lg:text-normal text-sm text-gray-700"
              >
                Do you wish to share workspace with your team?
              </label>
              <input
                id="sharedWorkspace"
                type="checkbox"
                className="mr-2 w-6 h-6"
                checked={formik.values.sharedWorkspace}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="lg:w-3/4 w-full flex justify-between gap-8">
            <button
              onClick={() => navigate('/app')}
              className="lg:w-1/2 w-full border border-primary text-primary font-semibold py-2 px-4 hover:bg-primary hover:text-black transition duration-300"
            >
              Skip
            </button>
            <button
              type="submit"
              onClick={formik.handleSubmit}
              className="lg:w-1/2 w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard3;
