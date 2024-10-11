/* eslint-disable react/prop-types */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const WorkspaceModal = ({ onClose, onWorkspaceCreated }) => {
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [message, setMessage] = useState(''); // Message state for feedback

  // Formik configuration with validation schema
  const formik = useFormik({
    initialValues: {
      workspaceName: '',
      isShared: false,
    },
    validationSchema: Yup.object({
      workspaceName: Yup.string()
        .required('Workspace Name is required')
        .min(3, 'Workspace Name must be at least 3 characters'),
    }),
    onSubmit: async values => {
      const userId = Cookies.get('userId');
      const newWorkspace = {
        team_space_name: values.workspaceName,
        share_space: values.isShared,
      };

      try {
        setIsSubmitting(true);
        setMessage(''); // Clear any previous messages

        const response = await axios.post(
          `${API_BASE_URL}/teamspace/?user_id=${userId}`,
          newWorkspace,
          {
            headers: {
              // Authorization: `Bearer ${token}`, // Include token in Authorization header if needed
            },
          }
        );

        if (response.status === 200) {
          const data = response.data; // Workspace data from the response
          onWorkspaceCreated(data.team_space_id); // Pass the ID of the workspace to parent for navigation
          setMessage('Workspace created successfully!'); // Success message
        } else {
          setMessage('Failed to create workspace.');
        }
      } catch (error) {
        // Backend error handling
        if (error.response && error.response.data) {
          setMessage(`Error: ${error.response.data.message}`);
        } else {
          setMessage('An error occurred. Please try again.');
        }
      } finally {
        setIsSubmitting(false); // Stop loading state
      }
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-xl lg:px-10 p-6 rounded-lg m-4">
        <h2 className="text-xl font-semibold mb-4">Create Workspace</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Workspace Name Input */}
          <input
            type="text"
            id="workspaceName"
            placeholder="Workspace Name"
            value={formik.values.workspaceName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border p-2 w-full mb-2"
          />
          {formik.touched.workspaceName && formik.errors.workspaceName ? (
            <p className="text-red-500">{formik.errors.workspaceName}</p>
          ) : null}

          {/* Shared Workspace Checkbox */}
          <div className="mb-4">
            <input
              type="checkbox"
              id="isShared"
              checked={formik.values.isShared}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="isShared" className="ml-2">
              Shared Workspace
            </label>
          </div>

          {/* Message display for success/error */}
          {message && (
            <p
              className={`w-full mb-4 p-2 rounded-md ${message.includes('Error') ? 'bg-red-100 text-red-500 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}`}
            >
              {message}
            </p>
          )}

          {/* Action Buttons */}
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
              className="bg-primary text-black font-semibold py-2 px-4 w- hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkspaceModal;
