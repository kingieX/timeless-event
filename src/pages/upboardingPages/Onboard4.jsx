// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/image/logo.svg';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const industryOptions = [
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'arts-entertainment', label: 'Arts and Entertainment' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'banking-financial', label: 'Banking and Financial Services' },
  { value: 'construction', label: 'Construction' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'consumer-goods', label: 'Consumer Goods' },
  { value: 'education', label: 'Education' },
  { value: 'energy-utilities', label: 'Energy and Utilities' },
  { value: 'food-beverages', label: 'Food and Beverages' },
  { value: 'government-public', label: 'Government and Public Sector' },
  { value: 'healthcare-life-sciences', label: 'Healthcare and Life Sciences' },
  { value: 'information-technology', label: 'Information Technology' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'legal-services', label: 'Legal Services' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'non-profit', label: 'Non-Profit' },
  { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'retail-wholesale', label: 'Retail and Wholesale' },
  { value: 'telecommunications', label: 'Telecommunications' },
  { value: 'transportation-logistics', label: 'Transportation and Logistics' },
  { value: 'travel-hospitality', label: 'Travel and Hospitality' },
  { value: 'other', label: 'Other' },
];

const workOptions = [
  { value: 'administration', label: 'Administration' },
  { value: 'customer-service', label: 'Customer Service' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'executive-management', label: 'Executive Management' },
  { value: 'finance-accounting', label: 'Finance and Accounting' },
  { value: 'human-resources', label: 'Human Resources' },
  { value: 'information-technology', label: 'Information Technology' },
  { value: 'legal', label: 'Legal' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'operations', label: 'Operations' },
  { value: 'product-development', label: 'Product Development' },
  { value: 'quality-assurance', label: 'Quality Assurance' },
  { value: 'sales', label: 'Sales' },
  { value: 'supply-chain-management', label: 'Supply Chain Management' },
  { value: 'other', label: 'Other' },
];

const organizationSizeOptions = [
  { value: '1', label: '1' },
  { value: '2-5', label: '2 to 5' },
  { value: '6-10', label: '6 to 10' },
  { value: '11-50', label: '11 to 50' },
  { value: '51-100', label: '51 to 100' },
  { value: '101-250', label: '101 to 250' },
];

const Onboard4 = () => {
  const navigate = useNavigate();
  // State to store error message
  const [errorMessage, setErrorMessage] = useState('');

  const BASE_URL = import.meta.env.VITE_BASE_URL; // Load the base URL from .env

  // Retrieve team_space_id from cookies
  const teamSpaceId = Cookies.get('team_space_id');
  // const access_token = Cookies.get('access_token'); // Get the access token from cookies

  // if (!access_token) {
  //   throw errorMessage('You do not have an access_token');
  // }

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      team_name: '',
      workIndustry: '',
      workType: '',
      organizationSize: '',
      allowTeamDiscovery: true,
    },
    validationSchema: Yup.object({
      team_name: Yup.string().required('Team name is required'),
      workIndustry: Yup.string().required('Industry is required'),
      workType: Yup.string().required('Work type is required'),
      organizationSize: Yup.string().required('Organization size is required'),
    }),
    onSubmit: async values => {
      try {
        const body = {
          team_name: values.team_name, // Use actual team name or fetch it if needed
          work_industry: values.workIndustry,
          user_work_type: values.workType,
          organization_size: values.organizationSize,
          allow_team_discovery: values.allowTeamDiscovery,
        };

        const response = await fetch(
          `${BASE_URL}/team/?team_space_id=${teamSpaceId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ${access_token}`, // Pass token_id in the header
            },
            body: JSON.stringify(body),
          }
        );

        if (response.ok) {
          // Navigate to the next page on success
          navigate('/signup/team-invite');
        } else {
          const errorData = await response.json();
          console.error('Failed to submit data:', errorData);
          setErrorMessage('Failed to submit the form. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('An error occurred. Please try again.');
      }
    },
  });

  const handleButtonClick = () => {
    navigate('/signup/invite');
  };

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
        <div className="flex flex-col justify-center items-center lg:w-1/2  lg:my-8 py-8 lg:pb-28 lg:shadow-md lg:border lg:border-gray rounded-md">
          <h2 className="lg:text-4xl text-2xl font-semibold text-center">
            About you and your team
          </h2>
          <p className="lg:mb-12 mb-8 text-center lg:text-lg text-gray-700">
            Your answer will help us tailor your overall experience.
          </p>

          <form onSubmit={formik.handleSubmit} className="lg:w-3/4 w-full">
            {/* Error display */}
            {errorMessage && (
              <div className="lg:w-3/4 w-full mb-4 p-2 bg-red-100 text-red-500 border border-red-400 rounded-md">
                {errorMessage}
              </div>
            )}

            {/* Team name */}
            <div className="mb-6">
              <label className="block text-gray-700">
                What is the name of your team?
              </label>
              <input
                id="team_name"
                name="team_name"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
                // placeholder="Enter team name"
                value={formik.values.team_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.team_name && formik.errors.team_name ? (
                <div className="text-red-500">{formik.errors.team_name}</div>
              ) : null}
            </div>

            {/* Industry option */}
            <div className="mb-6">
              <label className="block text-gray-700">
                What industry do you work in?
              </label>
              <select
                id="workIndustry"
                name="workIndustry"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
                value={formik.values.workIndustry}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" disabled>
                  Select industry
                </option>
                {industryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formik.touched.workIndustry && formik.errors.workIndustry ? (
                <div className="text-red-500">{formik.errors.workIndustry}</div>
              ) : null}
            </div>

            {/* Work type option */}
            <div className="mb-6">
              <label className="block text-gray-700">What is your role?</label>
              <select
                id="workType"
                name="workType"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
                value={formik.values.workType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" disabled>
                  Select role
                </option>
                {workOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formik.touched.workType && formik.errors.workType ? (
                <div className="text-red-500">{formik.errors.workType}</div>
              ) : null}
            </div>

            {/* Organization size option */}
            <div className="mb-8">
              <label className="block text-gray-700">
                How big is your Organization?
              </label>
              <select
                id="organizationSize"
                name="organizationSize"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
                value={formik.values.organizationSize}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" disabled>
                  Select organization size
                </option>
                {organizationSizeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formik.touched.organizationSize &&
              formik.errors.organizationSize ? (
                <div className="text-red-500">
                  {formik.errors.organizationSize}
                </div>
              ) : null}
            </div>

            {/* Continue Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="lg:w-1/2 w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboard4;
