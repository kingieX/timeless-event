import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  industryOptions,
  workOptions,
  organizationSizeOptions,
} from '../upboardingPages/_components/TeamSelectionData';
import SelectInput from '../upboardingPages/_components/SelectInput';

const AddTeam = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [teamSpaces, setTeamSpaces] = useState([]);
  const [selectedTeamSpaceId, setSelectedTeamSpaceId] = useState('');
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const accessToken = Cookies.get('access_token'); // Assuming token is stored in cookies

  // Fetch linked team spaces when the component mounts
  useEffect(() => {
    const fetchTeamSpaces = async () => {
      try {
        const response = await fetch(
          'https://api.timelessplanner.com/teamspace/user-linked-team-space',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setTeamSpaces(data); // Assume data is an array of team spaces
        } else {
          throw new Error('Failed to fetch team spaces');
        }
      } catch (error) {
        setErrorMessage('An error occurred while fetching team spaces.');
      }
    };

    fetchTeamSpaces();
  }, [accessToken]);

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
      if (!selectedTeamSpaceId) {
        setErrorMessage('Please select a team space');
        return;
      }

      const body = {
        team_name: values.team_name,
        work_industry: values.workIndustry,
        user_work_type: values.workType,
        organization_size: values.organizationSize,
        allow_team_discovery: values.allowTeamDiscovery,
      };

      try {
        setIsLoading(true);

        const response = await fetch(
          `${BASE_URL}/team?team_space_id=${selectedTeamSpaceId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
          }
        );

        if (response.ok) {
          const teamData = await response.json();
          // Save the team ID in cookies or local storage
          Cookies.set('team_id', teamData.team_id);
          // Navigate to the next step (team invite or other page)
          navigate(`/app/workspace/${teamData.team_space_id}`);
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Failed to create team');
        }
      } catch (error) {
        setErrorMessage('An error occurred while creating the team.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center my-4">Add a New Team</h2>

      <form onSubmit={formik.handleSubmit} className="w-full max-w-lg mx-auto">
        {/* Team Space Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="teamSpace"
            className="block text-gray-700 font-bold mb-2"
          >
            Select Team Space
          </label>
          {teamSpaces.length === 0 ? (
            <div className="text-red-500">
              You don't have any linked team spaces. Please create one first.
            </div>
          ) : (
            <select
              name="teamSpace"
              id="teamSpace"
              value={selectedTeamSpaceId}
              onChange={e => setSelectedTeamSpaceId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select a Team Space
              </option>
              {teamSpaces.map(space => (
                <option key={space.team_space_id} value={space.team_space_id}>
                  {space.team_space_name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Team Name */}
        <div className="mb-4">
          <label
            htmlFor="team_name"
            className="block text-gray-700 font-bold mb-2"
          >
            Team Name
          </label>
          <input
            type="text"
            id="team_name"
            name="team_name"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formik.values.team_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter team name"
          />
          {formik.errors.team_name && formik.touched.team_name && (
            <div className="text-red-500 text-sm">
              {formik.errors.team_name}
            </div>
          )}
        </div>

        {/* Work Industry */}
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

        {/* Work Type */}
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

        {/* Organization Size */}
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

        {/* Allow Team Discovery Checkbox */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary mb-4 text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
        >
          {isLoading ? 'Submitting...' : 'Create Team'}
        </button>

        {/* Error Message */}
        {errorMessage && (
          <div className="w-full p-2 bg-red-100 text-red-500 border border-red-400 rounded">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTeam;
