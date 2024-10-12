import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

const EditWorkspaceModal = ({ workspaceData, onClose, onWorkspaceUpdated }) => {
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [message, setMessage] = useState(''); // Feedback message state

  const navigate = useNavigate();

  const access_token = Cookies.get('access_token');

  //   Delete workspace
  const handleDeleteWorkspace = async () => {
    if (window.confirm('Are you sure you want to delete this workspace?')) {
      try {
        setIsSubmitting(true);
        setMessage('');

        const response = await axios.delete(
          `${API_BASE_URL}/teamspace/${workspaceData.team_space_id}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        if (response.status === 200) {
          onClose(); // Close the modal
          setMessage('Workspace deleted successfully!');
          navigate('/app/workspace');
        } else {
          setMessage('Failed to delete workspace.');
        }
      } catch (error) {
        console.error('Error deleting workspace:', error);
        setMessage('Failed to delete workspace.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

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
      <div className="bg-white w-full max-w-xl lg:px-10 p-6 rounded-lg m-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold ">Settings</h2>
          <IoMdClose size={25} onClick={onClose} />
        </div>

        {/* Scrollable form */}
        <form
          onSubmit={formik.handleSubmit}
          className="overflow-y-auto max-h-[60vh] px-4"
        >
          <div className="flex flex-col mb-4">
            <p className="font-semibold mb-1 text-sm">Logo</p>
            <div className="w-16 h-16 flex justify-center items-center text-4xl font-semibold bg-primary rounded">
              <p>{workspaceData.team_space_name.slice(0, 1)}</p>
            </div>
          </div>
          {/* Workspace Name Input */}
          <div className="mb-4">
            <label
              htmlFor="workspaceName"
              className="text-sm font-semibold mb-1"
            >
              Team name
            </label>
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
          </div>

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

          {/* Danger action */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Danger action</h2>

            {/* leave team */}
            <div className="mb-4">
              <p className="text-sm font-semibold">Leave workspace</p>
              <p className="text-xs text-slate-700 mb-2">
                By leaving, you’ll immediately lose access to all{' '}
                <span className="font-semibold">
                  {workspaceData.team_space_name}
                </span>{' '}
                projects. You’ll need to be re-invited to join again.
              </p>
              <button className="border border-red-500 text-red-500 font-semibold text-sm px-4 py-2 hover:border-red-800 hover:text-red-800">
                Leave workspace
              </button>
            </div>

            {/* delete workspace */}
            <div className="mb-4">
              <p className="text-sm font-semibold">Delete Workspace</p>
              <p className="text-xs text-slate-700 mb-2">
                This will immediately and permanently delete the{' '}
                <span className="font-semibold">
                  {workspaceData.team_space_name}
                </span>{' '}
                workspace and its data for everyone – including all projects and
                tasks. This cannot be undone.
              </p>
              <button
                onClick={handleDeleteWorkspace}
                className="border border-red-500 text-red-500 font-semibold text-sm px-4 py-2 hover:border-red-800 hover:text-red-800"
              >
                Delete Workspace
              </button>
            </div>
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
