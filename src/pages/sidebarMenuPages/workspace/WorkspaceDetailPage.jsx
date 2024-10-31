import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { RiGroupLine } from 'react-icons/ri';
import { CiSettings } from 'react-icons/ci';
import axios from 'axios'; // For making PUT requests
import EditWorkspaceModal from './_components/EditWorkspaceModal';
import { AiOutlineSearch } from 'react-icons/ai';
import AddTeamModal from './_components/TeamCreationModal';
import { GoPlus } from 'react-icons/go';
import TeamOptionsMenu from './_components/TeamOptionsMenu';
import FolderModal from './folder/_components/FolderModal';
import { BsThreeDotsVertical } from 'react-icons/bs';
import FolderList from './folder/_components/FolderList';

const WorkspaceDetailPage = () => {
  const { workspaceId } = useParams(); // Get workspaceId from URL
  const [workspaceData, setWorkspaceData] = useState(null);
  const [teamsData, setTeamsData] = useState([]); // State for teams data
  const [loading, setLoading] = useState(true);
  const [teamsLoading, setTeamsLoading] = useState(false); // Loading state for teams
  const [error, setError] = useState(null);
  const [teamsError, setTeamsError] = useState(null); // Error state for teams
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal state
  const [isTeamCreationModal, setIsTeamCreationModal] = useState(false);
  const menuRef = useRef(null); // Consolidated ref for both menu and dropdown

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isTeamOptionsMenuOpen, setIsTeamOptionsMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = teamId => {
    if (isTeamOptionsMenuOpen === teamId) {
      setIsTeamOptionsMenuOpen(null); // Close if already open
    } else {
      setIsTeamOptionsMenuOpen(teamId); // Open the clicked menu
    }
  };

  // Close modal or dropdown if a click happens outside the menu or dropdown
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsTeamOptionsMenuOpen(false); // Close the modal
        setIsDropdownOpen(false); // Close the dropdown
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const access_token = Cookies.get('access_token');
  console.log(access_token);
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch workspace details
  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/teamspace/${workspaceId}/retrieve-teamspace`,
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
        console.log('Workspace detail:', data);
      } catch (error) {
        console.error('Error fetching workspace data:', error);
        setError('Failed to load workspace details.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaceData();
  }, [workspaceId, access_token]);

  // Fetch teams assigned to this workspace once the workspace data is available
  useEffect(() => {
    if (workspaceData && workspaceData.team_space_id) {
      const fetchTeamsData = async () => {
        setTeamsLoading(true); // Set teams loading state
        try {
          const response = await axios.get(
            `${API_BASE_URL}/team/${workspaceData.team_space_id}/teamspace`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );

          setTeamsData(response.data); // Set the fetched teams data

          if (response.status === 404) {
            setTeamsError('No teams found for this workspace, create a team!');
          }
          console.log('Teams data:', response.data); // Log the teams data to console
        } catch (error) {
          console.error('Error fetching teams data:', error);
          setTeamsError(
            'Failed to load teams for this workspace, no team found!',
            error.message
          );
        } finally {
          setTeamsLoading(false); // End teams loading state
        }
      };

      fetchTeamsData();
    }
  }, [workspaceData, access_token]);

  // Routes to handle GET request for folders

  // Function to open the modal
  const openEditModal = () => setIsEditModalOpen(true);

  // Function to close the modal
  const closeEditModal = () => setIsEditModalOpen(false);

  // Function to open team creation modal
  const openTeamModal = () => setIsTeamCreationModal(true);

  // Function to close the team creation modal
  const closeTeamModal = () => setIsTeamCreationModal(false);

  // Function to handle updates to workspace details (after PUT request)
  const handleWorkspaceUpdate = updatedData => {
    setWorkspaceData(updatedData); // Update state with new workspace data
    closeEditModal(); // Close modal after update
  };

  // Function to handle update to workspace
  const handleTeamCreationUpdate = updatedData => {
    setWorkspaceData(updatedData);
    closeTeamModal();
  };

  if (loading) {
    return <p className="lg:py-4 py-1 text-center px-4 lg:px-24">Loading...</p>;
  }

  if (error) {
    return <p className="lg:py-4 py-1 text-center px-4 lg:px-24">{error}</p>;
  }

  // handle folder opening
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openFolderModal = () => {
    setIsFolderModalOpen(true);
    setIsDropdownOpen(false); // Close dropdown after clicking Add folder
  };

  const closeFolderModal = () => {
    setIsFolderModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <div className="flex gap-4 justify-end px-4">
        {/* invite member */}
        <div
          onClick={openTeamModal}
          className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer"
        >
          <RiGroupLine className="w-5 h-5" />
          <p className="text-sm font-semibold lg:block hidden">Create a team</p>
        </div>
        {/* settings */}
        <div
          onClick={openEditModal}
          className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer"
        >
          <CiSettings className="w-5 h-5" />
          <p className="text-sm font-semibold lg:block hidden">settings</p>
        </div>
      </div>

      {/* WorkSpace Header */}
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
      </div>

      {/* Add button */}
      <div className="px-4 lg:px-24">
        <div className="flex my-2 items-center px-4 py-2 border-2 border-gray border-opacity-20 mb-2">
          <AiOutlineSearch className="w-6 h-6 text-gray-400" />
          <input
            type="search"
            className="flex w-full outline-none bg-transparent px-4"
            placeholder="Search teams"
          />
        </div>

        {/* All Teams in the workspace */}
        <div className="flex justify-between items-center py-2 px-1">
          <h1 className="font-bold text-xl">Teams</h1>
        </div>

        {/* Map teams goes here... */}
        <div className="py-2 mb-4 grid lg:grid-cols-2 grid-cols-1 gap-4">
          {teamsLoading ? (
            <p>Loading teams...</p>
          ) : teamsError ? (
            <p className="text-red-500">{teamsError}</p>
          ) : (
            teamsData.map((team, index) => (
              <div
                key={team.team_id}
                // className="flex justify-between items-center border rounded-lg p-4"
              >
                <div className="w-full flex justify-between items-center border rounded-lg">
                  <Link
                    to={`/app/workspace/${workspaceData.team_space_id}/team/${team.team_id}`}
                    className="flex flex-grow gap-4 m-1 p-4 hover:bg-blue-50"
                  >
                    <RiGroupLine className="w-6 h-6 text-primary" />
                    <p>{team.team_name}</p>
                  </Link>
                  {/* Three-dotted icon */}
                  <button
                    className="mr-4"
                    onClick={() => toggleMenu(team.team_id)}
                  >
                    <BsThreeDotsVertical className="w-5 h-5 cursor-pointer" />
                  </button>
                </div>
                {isTeamOptionsMenuOpen === team.team_id && (
                  <TeamOptionsMenu
                    ref={menuRef} // Use the single ref for the team options dropdown
                    isOpen={isTeamOptionsMenuOpen}
                    teamId={team.team_id}
                    teamName={team.team_name}
                    team={team}
                  />
                )}
              </div>
            ))
          )}
        </div>

        {/* All Folders in the workspace */}
        <div className="flex justify-between items-center py-2 px-1">
          <h1 className="font-bold text-xl">My folders</h1>
          <div className="relative">
            <div className="relative">
              <button
                className="flex items-center text-primary text-sm font-semibold"
                onClick={toggleDropdown}
              >
                Add <GoPlus className="ml-2" />
              </button>
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <ul
                  ref={menuRef} // Single ref used for both modal and dropdown
                  className="absolute z-50 top-8 right-2 w-[10rem] rounded-lg shadow-lg bg-white"
                >
                  <li
                    className="px-4 py-2 bg-white z-50 border border-gray hover:bg-gray-100 hover:text-black"
                    onClick={openFolderModal}
                  >
                    Add folder
                  </li>
                  {/* Add more dropdown items as needed */}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Map teams goes here... */}
        <div className="">
          <FolderList />
        </div>
      </div>

      {/* Modals */}
      {isEditModalOpen && (
        <EditWorkspaceModal
          workspaceId={workspaceId}
          workspaceData={workspaceData}
          onClose={closeEditModal}
          onUpdate={handleWorkspaceUpdate}
          initialData={workspaceData}
        />
      )}
      {isTeamCreationModal && (
        <AddTeamModal
          workspaceId={workspaceId}
          onClose={closeTeamModal}
          onUpdate={handleTeamCreationUpdate}
        />
      )}
      {/* Folder Modal */}
      {isFolderModalOpen && (
        <FolderModal
          workspaceId={workspaceId}
          workspaceData={workspaceData}
          onClose={closeFolderModal}
          // Add any additional props needed for FolderModal
        />
      )}
    </div>
  );
};

export default WorkspaceDetailPage;
