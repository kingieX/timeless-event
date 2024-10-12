import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios'; // For making PUT requests
import EditWorkspaceModal from './_components/EditWorkspaceModal';

const WorkspaceDetailPage = () => {
  const { workspaceId } = useParams(); // Get workspaceId from URL
  const [workspaceData, setWorkspaceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal state

  const access_token = Cookies.get('access_token');

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_BASE_URL;
        const response = await fetch(
          `${API_BASE_URL}/teamspace/${workspaceId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${access_token}`, // Pass token_id in the header
            },
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse the response as JSON
        setWorkspaceData(data); // Set the data from the API
      } catch (error) {
        console.error('Error fetching workspace data:', error);
        setError('Failed to load workspace details.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaceData();
  }, [workspaceId, access_token]);

  // Function to open the modal
  const openEditModal = () => setIsEditModalOpen(true);

  // Function to close the modal
  const closeEditModal = () => setIsEditModalOpen(false);

  // Function to handle updates to workspace details (after PUT request)
  const handleWorkspaceUpdate = updatedData => {
    setWorkspaceData(updatedData); // Update state with new workspace data
    closeEditModal(); // Close modal after update
  };

  if (loading) {
    return <p className="lg:py-4 py-1 px-4 lg:px-24">Loading...</p>;
  }

  if (error) {
    return <p className="lg:py-4 py-1 px-4 lg:px-24">{error}</p>;
  }

  return (
    <div className="lg:py-4 py-1 px-4 lg:px-24">
      {workspaceData ? (
        <>
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2 justify-start items-center">
              <p className="py-0.5 px-2 font-semibold bg-primary rounded">
                {workspaceData.team_space_name.slice(0, 1)}
              </p>
              <h1 className="lg:text-2xl text-lg font-bold">
                {workspaceData.team_space_name}
              </h1>
              <FiEdit
                className="w-4 h-4 cursor-pointer hover:text-slate-500"
                onClick={openEditModal}
              />
            </div>
            <div className="flex lg:flex-row flex-col lg:items-center items-start lg:gap-2 text-sm text-slate-700">
              <p>
                <span className="font-semibold">Shared: </span>
                {workspaceData.share_space ? 'Yes' : 'No'}
              </p>
              <p className="lg:block hidden"> • </p>
              <p>
                <span className="font-semibold">Created on: </span>
                {new Date(workspaceData.created_at).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </p>
              <p className="lg:block hidden"> • </p>
              <p>
                <span className="font-semibold">Last updated: </span>
                {new Date(workspaceData.updated_at).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </p>
            </div>
          </div>
        </>
      ) : (
        <p>No workspace data found.</p>
      )}

      {/* Render Edit Modal if it's open */}
      {isEditModalOpen && (
        <EditWorkspaceModal
          workspaceData={workspaceData}
          onClose={closeEditModal}
          onWorkspaceUpdated={handleWorkspaceUpdate}
        />
      )}
    </div>
  );
};

export default WorkspaceDetailPage;
