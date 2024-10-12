import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdWorkOutline } from 'react-icons/md';
import { GoPlus } from 'react-icons/go';
import { TiFolder } from 'react-icons/ti';
import { IoAddCircleOutline } from 'react-icons/io5';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { MdWorkspacesOutline } from 'react-icons/md';

const MyWorkspaceList = ({ workspaces }) => {
  const location = useLocation();
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false); // State to toggle workspace list

  // Toggle workspace menu open/close
  const toggleWorkspaceMenu = () => setIsWorkspaceMenuOpen(prev => !prev);

  // Check if a workspace is active
  const isWorkspaceActive = workspace =>
    location.pathname.includes(workspace.team_space_id);

  return (
    <div className="border-t border-gray mt-4">
      <div className="flex justify-between items-center px-4 py-2 hover:bg-blue-50 cursor-pointer">
        <div className="flex items-center">
          <MdWorkOutline className="w-6 h-6 mr-2" />
          <span>My workspace</span>
        </div>

        <div className="flex items-center">
          {/* Add workspace link */}
          <Link to="/app/workspace" className="hover:bg-blue-100 py-1 px-2">
            <GoPlus className="w-6 h-6" />
          </Link>

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
                <span>
                  {workspace.team_space_name.length > 15
                    ? `${workspace.team_space_name.slice(0, 15)}...`
                    : workspace.team_space_name}
                </span>
              </Link>
            ))
          ) : (
            <div className="flex items-center px-4 py-1 italic">
              <span>No workspace available</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyWorkspaceList;
