import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { LuFolderGit } from 'react-icons/lu';
import { FiMoreVertical } from 'react-icons/fi';
import UpdateAccessModal from '../project/_components/UpdateAccessModal';
import EditProjectModal from '../project/_components/EditProjectModal';

const FolderDetailPage = () => {
  const { folderId } = useParams();
  const [folder, setFolder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null); // Track which dropdown is open
  const dropdownRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [projectToUpdate, setProjectToUpdate] = useState(null);
  const [editProject, setEditProject] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const accessToken = Cookies.get('access_token');

  // Fetch folder details
  useEffect(() => {
    const fetchFolderDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/folder/${folderId}/retrieve-folder-by-id`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setFolder(response.data);
        setProjects(response.data.projects);
        // console.log('Fetched folder details:', response.data);
      } catch (error) {
        setError('Error fetching folder details, reload page.');
        console.error('Error fetching folder details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFolderDetails();
  }, [folderId]);

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

  const toggleDropdown = projectId => {
    setShowDropdown(showDropdown === projectId ? null : projectId);
  };

  // logic to handle Update project access
  const handleUpdateAccess = projectId => {
    setProjectToUpdate(projectId);
  };

  // logic to handle Edit project
  const handleEditProject = project => {
    setEditProject(project);
  };

  // logic to handle Delete project
  const handleDeleteProject = async projectId => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_BASE_URL}/project/delete/${projectId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('Project deleted successfully');
        window.location.reload(); // Trigger project data refresh
      } catch (err) {
        console.error('Error deleting Project:', err);
        setError('Failed to delete Project.');
      }
    }
  };

  if (loading) return <p className="px-8">Loading...</p>;
  if (error) return <p className="text-red-500 px-8">{error}</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        {/* navigation */}
        <div className="flex space-x-1 lg:text-sm text-xs">
          <Link
            to={`/app/workspace/${folder.team_space_id}`}
            className="text-slate-700 hover:underline cursor-pointer"
          >
            {folder.team_space.team_space_name}
          </Link>
          <span className="text-slate-700"> /</span>
          <p className=" font-bold">{folder.folder_name}</p>
        </div>
        {/* team options */}
        <div className="flex gap-4 justify-end px-4">
          {/* invite member */}
          <div
            // onClick={openTeamModal}
            className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer"
          >
            <LuFolderGit className="w-5 h-5" />
            <p className="text-sm font-semibold lg:block hidden">
              Create Project
            </p>
          </div>
          {/* settings */}
          {/* <div
            onClick={() => toggleMenu(folder.folder_id)}
            className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer"
          >
            <CiSettings className="w-5 h-5" />
            <p className="text-sm font-semibold lg:block hidden">settings</p>
          </div>
          {isTeamOptionsMenuOpen === folder.folder_id && (
            <Settings
              ref={menuRef} // Use the single ref for the team options dropdown
              isOpen={isTeamOptionsMenuOpen}
              teamId={folder.folder_id}
              teamName={folder.team_name}
              team={team}
            />
          )} */}
        </div>
      </div>

      <div className="lg:py-4 py-1 px-4 lg:px-24">
        {folder ? (
          <>
            <div className="flex flex-col space-y-2">
              {/* Title */}
              <h1 className="lg:text-4xl text-2xl font-bold">
                Folder: {folder.folder_name}
              </h1>

              {/* Subtitles */}
              <div className="flex flex-col lg:flex-row lg:items-center items-start lg:gap-2 text-sm text-slate-700">
                {/* <p>
                  <span className="font-semibold">Created by: </span>
                  {folder.creator_id}{' '}
                </p> */}
                <p>
                  <span className="font-semibold">Created on: </span>
                  {new Date(folder.created_at).toLocaleString('en-US', {
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
                  {new Date(folder.updated_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </p>
              </div>

              {/* Shared Users */}
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">
                  Shared Users ({folder.shared_users.length})
                </h2>
                <ul>
                  {folder.shared_users.map(user => (
                    <li
                      key={user.user_id}
                      className="flex items-center space-x-2"
                    >
                      <span>{user.fullname}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects */}
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">
                  Projects ({folder.projects.length})
                </h2>
                {folder.projects.length > 0 ? (
                  <ul className="py-2 mb-12 grid lg:grid-cols-2 grid-cols-1 gap-4">
                    {folder.projects.map(project => (
                      <li
                        key={project.project_id}
                        className="relative w-full flex items-center space-x-2"
                      >
                        <Link
                          to={`/app/workspace/${folder.team_space_id}/folders/${folder.folder_id}/projects/${project.project_id}`}
                          className="w-full flex justify-between items-center border rounded-lg p-4 hover:bg-blue-50"
                        >
                          <div className="flex flex-col">
                            <div className="flex gap-2 items-center">
                              <LuFolderGit className="w-6 h-6 text-primary" />
                              <h1 className="lg:text-xl text-lg font-semibold">
                                {project.project_name}
                              </h1>
                            </div>
                            <span className="text-sm text-slate-500">
                              ({project.access})
                            </span>
                          </div>
                        </Link>
                        <button
                          className="absolute z-40 right-4 top-7"
                          onClick={() => toggleDropdown(project.project_id)}
                        >
                          <FiMoreVertical className="w-5 h-5 cursor-pointer" />
                        </button>
                        {showDropdown === project.project_id && (
                          <ul
                            ref={dropdownRef}
                            className="absolute z-50 right-4 top-10 w-40 bg-white border rounded-lg shadow-lg"
                          >
                            <li
                              onClick={() =>
                                handleUpdateAccess(project.project_id)
                              } // Pass folder ID here
                              className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                            >
                              Update project access
                            </li>

                            <li
                              onClick={() => handleAddUsers(project.project_id)} // Pass folder ID here
                              className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                            >
                              Share with members
                            </li>

                            <li
                              onClick={() => handleEditProject(project)}
                              className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                            >
                              Edit Project
                            </li>

                            <li
                              onClick={() =>
                                handleDeleteProject(project.project_id)
                              }
                              className="flex w-full items-center space-x-2 p-2 text-red-500 text-sm hover:bg-blue-100 cursor-pointer"
                            >
                              Delete Project
                            </li>
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No projects found in this folder.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>No folder data found.</p>
        )}

        {/* Render the UpdateAccessModal if projectToUpdate is set */}
        {projectToUpdate && (
          <UpdateAccessModal
            projectId={projectToUpdate} // Pass the project
            onClose={() => setProjectToUpdate(null)} // Close modal on close
          />
        )}

        {/* Render the EditProjectModal if editProject is set */}
        {editProject && (
          <EditProjectModal
            project={editProject}
            onClose={() => setEditProject(null)} // Close modal on close
          />
        )}
      </div>
    </>
  );
};

export default FolderDetailPage;
