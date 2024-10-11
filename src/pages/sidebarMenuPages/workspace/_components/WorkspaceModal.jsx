/* eslint-disable react/prop-types */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const WorkspaceModal = ({ onClose, onCreateWorkspace }) => {
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

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
      const token = Cookies.get('access_token'); // Retrieve token from cookies
      const userId = Cookies.get('userId');

      if (!token) {
        formik.setFieldError(
          'general',
          'Authentication token is missing. Please log in again.'
        );
        return;
      }

      const newWorkspace = {
        team_space_name: values.workspaceName,
        share_space: values.isShared,
        user_id: userId, // Use actual user ID
      };

      try {
        setIsSubmitting(true);

        const response = await axios.post(
          `${API_BASE_URL}/teamspace`,
          newWorkspace,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );

        console.log();

        if (response.status === 201) {
          onCreateWorkspace(response.data); // Pass the created workspace data to the parent
          console.log(response.data);
          onClose(); // Close the modal after successful creation
        }
      } catch (error) {
        // Backend error handling
        if (error.response && error.response.data) {
          // Assuming backend sends an error message in `error.response.data.message`
          formik.setFieldError('general', error.response.data.message);
        } else {
          // Generic error message if no specific message from the backend
          formik.setFieldError(
            'general',
            'An error occurred. Please try again.'
          );
        }
      } finally {
        // Set loading state back to false
        setIsSubmitting(false);
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

          {/* General Error Display */}
          {formik.errors.general && (
            <p className="w-full mb-4 p-2 bg-red-100 text-red-500 border border-red-400 rounded-md">
              {formik.errors.general}
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
