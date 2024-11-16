import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/image/logo.svg';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  industryOptions,
  workOptions,
  organizationSizeOptions,
} from './_components/TeamSelectionData';
import FormInput from './_components/FormInput';
import SelectInput from './_components/SelectInput';

const Onboard4 = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const teamSpaceId = Cookies.get('team_space_id');
  // console.log('Team Space ID:', teamSpaceId);

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
        setIsLoading(true);
        const body = {
          team_name: values.team_name,
          work_industry: values.workIndustry,
          user_work_type: values.workType,
          organization_size: values.organizationSize,
          allow_team_discovery: values.allowTeamDiscovery,
        };

        // console.log('Request Body:', body);

        const response = await fetch(
          `${BASE_URL}/team/?team_space_id=${teamSpaceId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }
        );

        if (response.ok) {
          const TeamData = await response.json();
          // console.log('Team Data:', TeamData);

          // console.log('Team id:', team_id);

          Cookies.set('team_id', TeamData.team_id);

          navigate('/signup/team-invite');
        } else {
          const errorData = await response.json();
          // console.log(errorData);
          setErrorMessage('Failed to submit the form. Please try again.');
        }
      } catch (error) {
        setErrorMessage('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <div className="fixed w-full z-50 bg-white mb-6 flex items-center shadow-md py-4 lg:px-8 px-4">
        <Link className="flex items-center" to="/">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 lg:text-xl text-sm lg:font-bold text-gray-800">
            Timeless Planner
          </span>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center lg:pt-16 pt-12 mx-6">
        <div className="flex flex-col justify-center items-center lg:w-1/2  lg:my-8 py-8 lg:shadow-md lg:border lg:border-gray rounded-md">
          <h2 className="lg:text-4xl text-2xl font-semibold text-center">
            About you and your team
          </h2>
          <p className="lg:mb-8 mb-4 text-center lg:text-lg text-gray-700">
            Your answer will help us tailor your overall experience.
          </p>

          <form onSubmit={formik.handleSubmit} className="lg:w-3/4 w-full">
            <FormInput
              label="Team Name"
              name="team_name"
              type="text"
              value={formik.values.team_name}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={formik.errors.team_name}
              touched={formik.touched.team_name}
            />

            <SelectInput
              label="Work Industry"
              name="workIndustry"
              value={formik.values.workIndustry}
              options={industryOptions}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={formik.errors.workIndustry}
              touched={formik.touched.workIndustry}
            />

            <SelectInput
              label="Work Type"
              name="workType"
              value={formik.values.workType}
              options={workOptions}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={formik.errors.workType}
              touched={formik.touched.workType}
            />

            <SelectInput
              label="Organization Size"
              name="organizationSize"
              value={formik.values.organizationSize}
              options={organizationSizeOptions}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              error={formik.errors.organizationSize}
              touched={formik.touched.organizationSize}
            />

            <div className="mb-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="allowTeamDiscovery"
                  checked={formik.values.allowTeamDiscovery}
                  onChange={formik.handleChange}
                  className="form-checkbox text-primary"
                />
                <span className="ml-2 text-gray-700">Allow team discovery</span>
              </label>
            </div>

            <button
              type="submit"
              className=" w-full bg-primary mb-4 text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
            >
              {isloading ? 'Submitting...' : 'Submit'}
            </button>
            {errorMessage && (
              <div className="lg:w-3/4 w-full p-2 bg-red-100 text-red-500 border border-red-400 rounded">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboard4;
