import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GrGroup } from 'react-icons/gr';
import { MdWorkOutline, MdWorkspacesOutline } from 'react-icons/md';
import { IoAddCircleOutline } from 'react-icons/io5';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import axios from 'axios';
import Cookies from 'js-cookie';

const MemberWorkspaceList = ({ handleLinkClick }) => {
  const [workspaces, setWorkspaces] = useState([]);
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false); // State to toggle workspace list
  const location = useLocation();
  const access_token = Cookies.get('access_token'); // Assuming access_token is stored in cookies

  // Fetch workspaces the user is a member of
  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_BASE_URL; // Update with your base URL from environment variables
        const response = await axios.get(
          `${API_BASE_URL}/teamspace/user-linked-team-space`,
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );
        setWorkspaces(response.data);
        // console.log('Added to workspace:', response.data);

        // if ((response.status = 404)) {
        //   // Handle 404 status when no workspaces are found
        //   console.log('No workspaces found');
        //   setWorkspaces([]);
        //   return;
        // }
      } catch (error) {
        console.error('Error fetching member workspaces:', error);
      }
    };

    fetchWorkspaces();
  }, [access_token]);

  // Toggle workspace menu open/close
  const toggleWorkspaceMenu = () => setIsWorkspaceMenuOpen(prev => !prev);

  // Check if a workspace is active
  const isWorkspaceActive = workspace =>
    location.pathname.includes(workspace.team_space_id);

  return (
    <div className=" border-gray mb-10">
      <div
        onClick={toggleWorkspaceMenu}
        className="flex justify-between items-center px-4 py-1 hover:bg-blue-50 cursor-pointer"
      >
        <div className="flex items-center">
          <GrGroup className="w-6 h-6 mr-2 text-slate-800" />
          <span>Team Workspace</span>
        </div>

        <div className="flex items-center">
          {/* Toggle button for showing/hiding workspaces */}
          <span className="ml-2 cursor-pointer" onClick={toggleWorkspaceMenu}>
            {isWorkspaceMenuOpen ? (
              <IoMdArrowDropup className="w-6 h-6" />
            ) : (
              <IoMdArrowDropdown className="w-6 h-6" />
            )}
          </span>
        </div>
      </div>

      {/* Conditionally render workspace list based on toggle state */}
      {isWorkspaceMenuOpen && (
        <div className="pl-4">
          {workspaces.length > 0 ? (
            workspaces.map((workspace, index) => (
              <Link
                key={index}
                onClick={handleLinkClick}
                to={`/app/workspace/${workspace.team_space_id}`}
                className={`flex items-center px-4 py-1 hover:bg-blue-50 cursor-pointer ${
                  isWorkspaceActive(workspace)
                    ? 'bg-blue-100 text-primary border-l-4 border-l-primary'
                    : ''
                }`}
              >
                <MdWorkspacesOutline
                  className={`w-6 h-6 mr-2 ${
                    isWorkspaceActive(workspace) ? 'text-primary' : ''
                  }`}
                />
                <span>{workspace.team_space_name}</span>
              </Link>
            ))
          ) : (
            <div className="flex items-center text-sm max-w-56 text-center px-4 py-2 italic">
              <span>You have not been added to any team workspace</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberWorkspaceList;
