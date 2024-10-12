import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Cookies from 'js-cookie';

const EditWorkspaceModal = ({ workspaceData, onClose, onWorkspaceUpdated }) => {
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [message, setMessage] = useState(''); // Feedback message state

  const access_token = Cookies.get('access_token');

  // Formik setup with initial values from `workspaceData`
  const formik = useFormik({
    initialValues: {
      workspaceName: workspaceData.team_space_name || '',
      isShared: workspaceData.share_space || false,
    },
    validationSchema: Yup.object({
      workspaceName: Yup.string()
        .required('Workspace Name is required')
        .min(3, 'Workspace Name must be at least 3 characters'),
    }),
    onSubmit: async values => {
      const updatedWorkspace = {
        team_space_name: values.workspaceName,
        share_space: values.isShared,
      };

      try {
        setIsSubmitting(true);
        setMessage('');

        const response = await axios.put(
          `${API_BASE_URL}/teamspace/${workspaceData.team_space_id}`,
          updatedWorkspace,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        if (response.status === 200) {
          onWorkspaceUpdated(response.data); // Update the parent with new workspace data
          setMessage('Workspace updated successfully!');
        } else {
          setMessage('Failed to update workspace.');
        }
      } catch (error) {
        console.error('Error updating workspace:', error);
        setMessage('An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-xl lg:px-10 p-6 rounded-lg m-4">
        <h2 className="text-xl font-semibold mb-4">Edit Workspace</h2>

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

          {/* Feedback message */}
          {message && <p>{message}</p>}

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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWorkspaceModal;
