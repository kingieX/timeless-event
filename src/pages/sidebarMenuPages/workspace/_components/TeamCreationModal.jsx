import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  industryOptions,
  workOptions,
  organizationSizeOptions,
} from '../../../upboardingPages/_components/TeamSelectionData';
import FormInput from '../../../upboardingPages/_components/FormInput';
import SelectInput from '../../../upboardingPages/_components/SelectInput';
import AddMemberModal from '../../../create-team/AddMemberModal';

const AddTeamModal = ({ onClose, onWorkspaceUpdated, workspaceData }) => {
  const [data, setData] = useState(null); // State to store the API response
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [teamName, setTeamName] = useState(''); // New state for team name
  const [isTeamNameValid, setIsTeamNameValid] = useState(false); // Validation for team name

  // AddMember Modal
  const [isAddMemberModal, setIsAddMemberModal] = useState(false);
  // Function to open AddMember modal
  const openAddMemberModal = () => setIsAddMemberModal(true);
  // Function to close AddMember modal
  const closeAddMemberModal = () => setIsAddMemberModal(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Formik hook for form handling
  const formik = useFormik({
    initialValues: {
      team_name: '',
      workIndustry: '',
      workType: '',
      organizationSize: '',
      allowTeamDiscovery: true,
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

        // Make the API request to create the team
        const response = await fetch(
          `${BASE_URL}/team/?team_space_id=${workspaceData.team_space_id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }
        );

        // Handle response
        if (response.ok) {
          const TeamData = await response.json();
          setData(TeamData);
          setIsAddMemberModal(true); // Show the AddMemberModal

          setMessage('Team created successfully');
          //   onWorkspaceUpdated(data);
          console.log('response', TeamData);
          // onClose(); // Close modal first
          // window.location.reload(); // Reload the page
        } else {
          const errorData = await response.json();
          console.log(errorData);
          setErrorMessage('Failed to submit the form. Please try again.');
        }
      } catch (error) {
        setErrorMessage('An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Handle team name input validation
  const handleTeamNameChange = e => {
    const name = e.target.value;
    formik.setFieldValue('team_name', name); // Update formik's team_name field
    setTeamName(name);
    setIsTeamNameValid(name.length > 0); // Validate team name (at least one character)
  };

  // Handle "Continue" button click (Step 1 -> Step 2)
  const handleContinue = () => {
    if (isTeamNameValid) {
      setStep(2); // Move to step 2 if the team name is valid
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-xl lg:px-10 p-6 rounded-lg m-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold ">Team Creation</h2>
          <IoMdClose size={25} onClick={onClose} />
        </div>

        {/* Step 1: Team name input */}
        {step === 1 && (
          <div>
            <p className="text-sm text-slate-700 mb-6">
              Creating a team will enable you to work on projects, create
              events, tasks, and assign subtasks to members of your team.
            </p>
            <form>
              {/* Team Name */}
              <FormInput
                label="Team Name"
                name="team_name"
                type="text"
                value={formik.values.team_name}
                handleChange={handleTeamNameChange} // Custom handler
                handleBlur={formik.handleBlur}
                error={formik.errors.team_name}
                touched={formik.touched.team_name}
              />
              <button
                type="button"
                className={`bg-primary text-black font-semibold py-2 px-4 transition duration-300 mb-4 ${
                  isTeamNameValid
                    ? 'hover:bg-transparent hover:border hover:border-primary hover:text-primary'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!isTeamNameValid} // Disable button if the team name is not valid
                onClick={handleContinue}
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Team details form */}
        {step === 2 && (
          <div>
            <h2 className="text-lg text-slate-700 mt-2">
              About you and your team
            </h2>
            <form
              className="py-4 overflow-y-auto max-h-[60vh] px-4"
              onSubmit={formik.handleSubmit}
            >
              <p className="mb-2 text-sm text-slate-700">
                Your answers will help tailor your experience.
              </p>

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

              {/* Allow team discovery */}
              <div className="mb-6">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="allowTeamDiscovery"
                    checked={formik.values.allowTeamDiscovery}
                    onChange={formik.handleChange}
                    className="form-checkbox text-primary"
                  />
                  <span className="ml-2 text-gray-700">
                    Allow team discovery
                  </span>
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
                  onClick={openAddMemberModal}
                  type="submit"
                  className="bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
                >
                  {isSubmitting ? 'Creating...' : 'Create team'}
                </button>
              </div>

              {/* Display error message */}
              {errorMessage && (
                <div className="text-center w-full p-2 bg-red-100 text-red-500 border border-red-400 rounded mt-4">
                  {errorMessage}
                </div>
              )}
              {/* Display success message */}
              {message && (
                <div className="text-center w-full p-2 bg-green-100 text-green-500 border border-green-400 rounded mt-4">
                  {message}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
      {/* Render AddMemberModal if it's open */}
      {isAddMemberModal && data && (
        <AddMemberModal
          onClose={closeAddMemberModal}
          teamId={data.team_id}
          teamName={data.team_name}
        />
      )}
    </div>
  );
};

export default AddTeamModal;
