import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const WorkspaceDetailPage = () => {
  const { workspaceId } = useParams(); // Get workspaceId from URL
  const [workspaceData, setWorkspaceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        // console.log('Workspace data:', data);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      {workspaceData ? (
        <>
          <h1 className="text-2xl font-bold">
            {workspaceData.team_space_name}
          </h1>
          <p>Shared: {workspaceData.share_space ? 'Yes' : 'No'}</p>
          {/* Render other workspace details here */}
        </>
      ) : (
        <p>No workspace data found.</p>
      )}
    </div>
  );
};

export default WorkspaceDetailPage;
