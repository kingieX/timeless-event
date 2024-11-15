import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdWorkOutline } from 'react-icons/md';
import { GoPlus } from 'react-icons/go';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { MdWorkspacesOutline } from 'react-icons/md';

const MyWorkspaceList = ({
  workspaces,
  handleLinkClick,
  openWorkspaceModal,
}) => {
  const location = useLocation();
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false); // State to toggle workspace list

  const [showDropdown, setShowDropdown] = useState(null); // Track which dropdown is open
  const dropdownRef = useRef(null);

  // Toggle workspace menu open/close
  const toggleWorkspaceMenu = () => setIsWorkspaceMenuOpen(prev => !prev);

  // Check if a workspace is active
  const isWorkspaceActive = workspace =>
    location.pathname.includes(workspace.team_space_id);

  // function to close dropdown when clicked outside of the page
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(null); // Close dropdown if clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = workspaceId => {
    setShowDropdown(showDropdown === workspaceId ? null : workspaceId);
  };

  return (
    <div className="border-t border-gray mt-4">
      <div className="flex justify-between items-center px-4 py-2 group hover:bg-blue-50 cursor-pointer">
        <div
          className=" flex-grow flex items-center"
          onClick={toggleWorkspaceMenu}
        >
          <MdWorkOutline className="w-5 h-5 mr-2" />
          <span className="text-sm">My workspace</span>
        </div>

        <div className="relative flex items-center ">
          {/* Add workspace link */}
          <button
            // to="/app/workspace"
            // onClick={handleLinkClick}
            onClick={() => toggleDropdown(workspaces.team_space_id)}
            className="hover:bg-blue-100 py-1 px-2 group-hover:block lg:hidden"
          >
            <GoPlus className="w-6 h-6" />
          </button>{' '}
          {showDropdown === workspaces.team_space_id && (
            <ul
              ref={dropdownRef}
              className="absolute z-50 right-1 top-10 w-40 bg-white border rounded-lg shadow-lg"
            >
              <li
                onClick={openWorkspaceModal}
                className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-50 cursor-pointer"
              >
                <span className="">Create workspace</span>
              </li>
            </ul>
          )}
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
                  className={`w-5 h-5 mr-2 ${
                    isWorkspaceActive(workspace) ? 'text-primary' : ''
                  }`}
                />
                <span className="text-sm">
                  {workspace.team_space_name.length > 15
                    ? `${workspace.team_space_name.slice(0, 15)}...`
                    : workspace.team_space_name}
                </span>
              </Link>
            ))
          ) : (
            <div className="flex items-center text-sm max-w-56 text-center px-4 py-2 italic">
              <span>No workspace available, create a workspace</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyWorkspaceList;
