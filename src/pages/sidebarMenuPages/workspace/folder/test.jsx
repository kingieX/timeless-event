import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const [isTeamOptionsMenuOpen, setIsTeamOptionsMenuOpen] = useState(false);

  const menuRef = useRef(null); // Ref for the modal

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close modal if a click happens outside the menu
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsTeamOptionsMenuOpen(false); // Close the modal
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTeamOptionsMenuOpen]);

  // setting up drop for three dotted icon
  const [selectedTeam, setSelectedTeam] = useState({
    teamId: null,
    teamName: '',
  });

  // handle passing teamName and teamId to dotten icon menu
  const handleTeamOptionsClick = (teamId, teamName) => {
    setSelectedTeam({ teamId, teamName }); // Set selected team
  };

  const access_token = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch workspace details
  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
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
      console.log('Teams data:', response.data); // Log the teams data to console
    } catch (error) {
      console.error('Error fetching teams data:', error);
      setTeamsError('Failed to load teams for this workspace.');
    } finally {
      setTeamsLoading(false); // End teams loading state
    }
  };
  useEffect(() => {
    if (workspaceData && workspaceData.team_space_id) {
      fetchTeamsData();
    }
  }, [workspaceData, access_token]);

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

  // Detect outside click and close dropdown
  useEffect(() => {
    const handleOutsideClick = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when the dropdown is open
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    // Cleanup event listener when component unmounts or dropdown state changes
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDropdownOpen]);

  return (
    <>
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
          <AiOutlineSearch className="w-6 h-6 text-gray" />
          <input
            type="text"
            placeholder="Search teams, projects..."
            className="flex-grow outline-none text-sm px-2"
          />
        </div>
        <div className="relative flex justify-end" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className=" flex space-x-1 border border-slate-300 text-slate-800 rounded py-1 px-2 hover:bg-blue-50"
          >
            <GoPlus className="w-6 h-6" />
            Add
          </button>
          {isDropdownOpen && (
            <div className="absolute bg-white border shadow-md mt-8 rounded-md">
              <ul>
                <li>
                  <button
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={openFolderModal}
                  >
                    Add Folder
                  </button>
                </li>
                {/* Add other options here if needed */}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Display teams assigned to this workspace */}
      <div className="px-4 lg:px-24 mt-4">
        <h2 className="text-xl font-bold mb-2">Teams in this workspace:</h2>
        {teamsLoading ? (
          <p>Loading teams...</p>
        ) : teamsError ? (
          <p className="text-red-500">{teamsError}</p>
        ) : teamsData.length > 0 ? (
          <ul className="mb-8">
            {teamsData.map((team, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border-b hover:bg-blue-50 rounded"
              >
                <div className="flex items-center space-x-2">
                  <RiGroupLine className="w-6 h-6 text-gray-500" />
                  <div className="w-full flex flex-col">
                    <p className="lg:text-xl">{team.team_name}</p>
                    <div className="w-full flex space-x-1 items-center">
                      <p className="lg:flex hidden items-center space-x-1 text-sm text-slate-700">
                        <span className="lg:block hidden font-semibold">
                          Created on:{' '}
                        </span>
                        <span>
                          {new Date(team.created_at).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            // hour: 'numeric',
                            // minute: 'numeric',
                            // hour12: true,
                          })}
                        </span>
                      </p>
                      <p className="lg:flex hidden">•</p>
                      <p className="flex items-center space-x-1 text-sm text-slate-700">
                        <span className="lg:block hidden font-semibold">
                          Work industry:{' '}
                        </span>
                        <span>{team.work_industry}</span>
                      </p>
                      <p className="">•</p>
                      <p className="flex items-center space-x-1 text-sm text-slate-700">
                        <span className="lg:block hidden font-semibold">
                          Organization size:{' '}
                        </span>
                        <span>{team.organization_size}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  ref={menuRef}
                  onClick={() =>
                    handleTeamOptionsClick(team.team_id, team.team_name)
                  }
                  className="hover:bg-blue-100 px-2 pt-1 rounded"
                >
                  <TeamOptionsMenu
                    teamId={team.team_id}
                    teamName={team.team_name}
                    team={team}
                    onTeamUpdated={() => fetchTeamsData()}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No teams found for this workspace.</p>
        )}
      </div>

      {/* Render Edit Modal if it's open */}
      {isEditModalOpen && (
        <EditWorkspaceModal
          workspaceData={workspaceData}
          onClose={closeEditModal}
          onWorkspaceUpdated={handleWorkspaceUpdate}
        />
      )}

      {/* Render TeamCreation Modal if it's open */}
      {isTeamCreationModal && (
        <AddTeamModal
          workspaceData={workspaceData}
          onClose={closeTeamModal}
          onWorkspaceUpdated={handleTeamCreationUpdate}
        />
      )}

      {/* Render Folder Modal if it's open */}
      {/* Folder Modal */}
      {isFolderModalOpen && <FolderModal closeModal={closeFolderModal} />}
    </>
  );
};

export default WorkspaceDetailPage;
