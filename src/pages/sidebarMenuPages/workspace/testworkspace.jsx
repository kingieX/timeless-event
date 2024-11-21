import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { RiGroupLine } from 'react-icons/ri';
import { CiSettings } from 'react-icons/ci';
import axios from 'axios';
import EditWorkspaceModal from './_components/EditWorkspaceModal';
import { AiOutlineSearch } from 'react-icons/ai';
import AddTeamModal from './_components/TeamCreationModal';
import { GoPlus } from 'react-icons/go';
import TeamOptionsMenu from './_components/TeamOptionsMenu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import FolderList from './folder/_components/FolderList';

const WorkspaceDetailPage = () => {
  const { workspaceId } = useParams();
  const [workspaceData, setWorkspaceData] = useState(null);
  const [teamsData, setTeamsData] = useState([]);
  const [foldersData, setFoldersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teamsLoading, setTeamsLoading] = useState(false);
  const [teamsError, setTeamsError] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Added state for search query
  const [filteredTeams, setFilteredTeams] = useState([]); // Filtered teams
  const [filteredFolders, setFilteredFolders] = useState([]); // Filtered folders

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
              Authorization: `Bearer ${Cookies.get('access_token')}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setWorkspaceData(data);
        }
      } catch (error) {
        setError('Failed to load workspace details.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaceData();
  }, [workspaceId]);

  useEffect(() => {
    if (workspaceData && workspaceData.team_space_id) {
      const fetchTeamsData = async () => {
        setTeamsLoading(true);
        try {
          const response = await axios.get(
            `${API_BASE_URL}/team/${workspaceData.team_space_id}/teamspace`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`,
              },
            }
          );
          setTeamsData(response.data);
          setFilteredTeams(response.data); // Initially, display all teams
        } catch (error) {
          setTeamsError('Failed to fetch teams. Please try again.');
        } finally {
          setTeamsLoading(false);
        }
      };

      fetchTeamsData();
    }
  }, [workspaceData]);

  useEffect(() => {
    // Function to filter teams and folders based on searchQuery
    const filterTeamsAndFolders = () => {
      // Filter teams
      const filteredTeamsData = teamsData.filter(team =>
        team.team_name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredTeams(filteredTeamsData);

      // Assuming foldersData is fetched similarly to teams
      const filteredFoldersData = foldersData.filter(folder =>
        folder.folder_name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredFolders(filteredFoldersData);
    };

    filterTeamsAndFolders();
  }, [searchQuery, teamsData, foldersData]); // Re-run the filtering when searchQuery, teamsData, or foldersData changes

  // Handle folder opening
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const openFolderModal = () => setIsFolderModalOpen(true);

  return (
    <div className="min-h-screen">
      {/* Workspace Header */}
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
            </div>
          </>
        ) : (
          <p className="text-center">No workspace data found.</p>
        )}
      </div>

      {/* Search Input */}
      <div className="px-4 lg:px-24">
        <div className="flex my-2 items-center px-4 py-2 border-2 border-gray border-opacity-20 mb-2">
          <AiOutlineSearch className="w-6 h-6 text-gray-400" />
          <input
            type="search"
            className="flex w-full outline-none bg-transparent px-4"
            placeholder="Search teams & folders"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)} // Update search query on input change
          />
        </div>
      </div>

      {/* Teams Section */}
      <div className="flex justify-between items-center py-2 px-1">
        <h1 className="font-bold text-xl">Teams</h1>
      </div>

      <div className="py-2 mb-4 grid lg:grid-cols-2 grid-cols-1 gap-4">
        {teamsLoading ? (
          <p>Loading teams...</p>
        ) : teamsError ? (
          <div className="w-full py-2 px-2 border border-gray my-4 border-l-4 border-l-red-500">
            <p className="text-red-500 text-center">{teamsError}</p>
          </div>
        ) : (
          filteredTeams.map((team, index) => (
            <div
              key={team.team_id}
              className="w-full flex justify-between items-center border rounded-lg"
            >
              <Link
                to={`/app/workspace/${workspaceData.team_space_id}/team/${team.team_id}`}
                className="flex flex-grow gap-4 m-1 p-4 hover:bg-blue-50"
              >
                <RiGroupLine className="w-6 h-6 text-primary" />
                <p>{team.team_name}</p>
              </Link>
              <button className="mr-4" onClick={() => toggleMenu(team.team_id)}>
                <BsThreeDotsVertical className="w-5 h-5 cursor-pointer" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Folders Section */}
      <div className="flex justify-between items-center py-2 px-1">
        <h1 className="font-bold text-xl">My folders</h1>
        <div className="relative">
          <button
            onClick={openFolderModal}
            className="flex items-center text-primary text-sm font-semibold"
          >
            Add <GoPlus className="ml-2" />
          </button>
        </div>
      </div>

      <div>
        <FolderList workspaceId={workspaceId} folders={filteredFolders} />
      </div>

      {/* Modals */}
      {isEditModalOpen && <EditWorkspaceModal onClose={closeEditModal} />}
      {isTeamCreationModal && <AddTeamModal onClose={closeTeamModal} />}
      {isFolderModalOpen && <FolderModal onClose={closeFolderModal} />}
    </div>
  );
};

export default WorkspaceDetailPage;
