// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/image/logo.svg';

const industryOptions = [
  { value: '', label: 'Select your answer', disabled: true },
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
  { value: '', label: 'Select your work', disabled: true },
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
  { value: '', label: 'Select your organization size', disabled: true },
  { value: '1', label: '1' },
  { value: '2-5', label: '2 to 5' },
  { value: '6-10', label: '6 to 10' },
  { value: '11-50', label: '11 to 50' },
  { value: '51-100', label: '51 to 100' },
  { value: '101-250', label: '101 to 250' },
];

const Onboard4 = () => {
  const navigate = useNavigate();

  const handleSkipClick = () => {
    navigate('/dashboard');
  };

  const handleButtonClick = () => {
    navigate('/signup/about-team');
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
        <div className="flex flex-col justify-center items-center lg:w-1/2  my-8 py-8 lg:pb-28 lg:shadow-md lg:border lg:border-gray rounded-md">
          <h2 className="lg:text-4xl text-2xl font-semibold text-center">
            About you and your team
          </h2>
          <p className="lg:mb-12 mb-8 text-center lg:text-lg text-gray-700">
            Your answer will help us tailor your overall experience.
          </p>

          {/* Industry option */}
          <div className="lg:w-3/4 w-full mb-6">
            <label className="block text-gray-700">
              What industry do you work in?
            </label>
            <select
              id="options"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
            >
              <option value="" disabled>
                Select role
              </option>
              {industryOptions.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          {/* work options */}
          <div className="lg:w-3/4 w-full mb-6">
            <label className="block text-gray-700">
              What industry do you work in?
            </label>
            <select
              id="options"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
            >
              <option value="" disabled>
                Select role
              </option>
              {workOptions.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          {/* Organization size options */}
          <div className="lg:w-3/4 w-full mb-8">
            <label className="block text-gray-700">
              What industry do you work in?
            </label>
            <select
              id="options"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-primary"
            >
              <option value="" disabled>
                Select role
              </option>
              {organizationSizeOptions.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            <div className="flex items-center space-x-4 py-6">
              <label
                htmlFor="sharedWorkspace"
                className="lg:text-normal text-sm text-gray-700"
              >
                Set up shared workspace for team project or event alongside your
                personal?
              </label>
              <input
                id="sharedWorkspace"
                type="checkbox"
                className="mr-2 w-6 h-6"
              />
            </div>
          </div>

          <div className="lg:w-3/4 w-full flex justify-between gap-8">
            <button
              onClick={handleButtonClick}
              className="lg:w-1/2 w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
            >
              Continue
            </button>
            <button
              onClick={handleSkipClick}
              className="lg:w-1/2 w-full border border-primary text-primary font-semibold py-2 px-4 hover:bg-primary hover:text-black transition duration-300"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard4;
