import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  industryOptions,
  workOptions,
  organizationSizeOptions,
} from '../../../upboardingPages/_components/TeamSelectionData';
import FormInput from '../../../upboardingPages/_components/FormInput';
import SelectInput from '../../../upboardingPages/_components/SelectInput';
import Cookies from 'js-cookie';

const EditTeamModal = ({ onClose, teamId, team, onTeamUpdated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const access_token = Cookies.get('access_token');
  // console.log(access_token);
  if (!access_token) {
    setErrorMessage('Authorization failed. Please log in again.');
    return;
  }

  const formik = useFormik({
    initialValues: {
      team_name: team?.team_name || '',
      workIndustry: team?.work_industry || '',
      workType: team?.user_work_type || '',
      organizationSize: team?.organization_size || '',
      allowTeamDiscovery: team?.allow_team_discovery || false,
    },
    validationSchema: Yup.object({
      team_name: Yup.string().required('Please provide a team name'),
      workIndustry: Yup.string().required('Please select a work industry'),
      workType: Yup.string().required('Please select a work type'),
      organizationSize: Yup.string().required(
        'Please specify your organization size'
      ),
    }),
    onSubmit: async values => {
      try {
        setIsSubmitting(true);

        const body = {
          team_name: values.team_name,
          work_industry: values.workIndustry,
          user_work_type: values.workType,
          organization_size: values.organizationSize,
          allow_team_discovery: values.allowTeamDiscovery,
        };

        const response = await fetch(`${BASE_URL}/team/${teamId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const TeamData = await response.json();
          setMessage('Team updated successfully');
          console.log('updated response', TeamData);
          onClose();
          onTeamUpdated(); // Trigger team data refresh
        } else {
          const errorData = await response.json();
          setErrorMessage(
            errorData.message || 'Failed to submit the form. Please try again.'
          );
        }
      } catch (error) {
        setErrorMessage('An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg p-6 rounded-lg m-4 max-h-[90vh] overflow-auto"
        onClick={e => e.stopPropagation()} // Prevent close on inside click
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold ">Edit Team</h2>
          <IoMdClose size={25} onClick={onClose} />
        </div>
        {team ? (
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
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
            </div>
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
            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="border border-red-400 text-red-400 font-semibold py-2 px-4 hover:bg-red-400 hover:text-white transition duration-300"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              >
                {isSubmitting ? 'Updating...' : 'Update team'}
              </button>
            </div>

            {errorMessage && (
              <div className="w-full p-2 text-center bg-red-100 text-red-500 border border-red-400 rounded mt-4">
                {errorMessage}
              </div>
            )}
            {message && (
              <div className="w-full p-2 bg-green-100 text-green-500 border border-green-400 rounded mt-4">
                {message}
              </div>
            )}
          </form>
        ) : (
          <p>Loading team details...</p>
        )}
      </div>
    </div>
  );
};

export default EditTeamModal;
