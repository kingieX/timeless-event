import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { LuFolderGit } from 'react-icons/lu';
import { FiMoreVertical } from 'react-icons/fi';
import UpdateAccessModal from '../workspace/project/_components/UpdateAccessModal';
import EditProjectModal from '../workspace/project/_components/EditProjectModal';
import CreateProjectModal from '../workspace/project/_components/CreateProjectModal';

const PersonalProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null); // Track which dropdown is open
  const dropdownRef = useRef(null);
  const [projectToUpdate, setProjectToUpdate] = useState(null);
  const [editProject, setEditProject] = useState(null);
  const [createProject, setCreateProject] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const accessToken = Cookies.get('access_token');

  // Fetch user projects
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/project/user/projects/no-team-space`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setProjects(response.data);
        console.log('Fetched projects:', response.data);
      } catch (error) {
        setError('Error fetching projects, please reload the page.');
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Function to close dropdown when clicked outside
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

  // Handle project modals
  const handleCreateProject = () => {
    setCreateProject(true);
  };

  const handleUpdateAccess = projectId => {
    setProjectToUpdate(projectId);
  };

  const handleEditProject = project => {
    setEditProject(project);
  };

  const handleDeleteProject = async projectId => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_BASE_URL}/project/delete/${projectId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('Project deleted successfully');
        setProjects(
          projects.filter(project => project.project_id !== projectId)
        ); // Update project list
      } catch (err) {
        console.error('Error deleting project:', err);
        setError('Failed to delete project.');
      }
    }
  };

  if (loading) return <p className="px-8">Loading...</p>;
  if (error) return <p className="text-red-500 px-8">{error}</p>;

  return (
    <div className="lg:py-4 py-1 px-4 lg:px-24">
      <div className="flex justify-between items-center mb-8">
        {/* Create Project */}
        {/* <div
          onClick={handleCreateProject}
          className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer"
        >
          <LuFolderGit className="w-5 h-5" />
          <p className="text-sm font-semibold lg:block hidden">
            Create Project
          </p>
        </div> */}
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="lg:text-4xl text-2xl font-bold">Personal Projects</h1>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">
            Projects ({projects.length})
          </h2>
          {projects.length > 0 ? (
            <ul className="py-2 mb-12 grid lg:grid-cols-2 grid-cols-1 gap-4">
              {projects.map(project => (
                <li
                  key={project.project_id}
                  className="relative w-full flex items-center space-x-2"
                >
                  <Link
                    to={`/app/workspace/${project.team_space_id}/folders/${project.folder_id}/projects/${project.project_id}`}
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
                        onClick={() => handleUpdateAccess(project.project_id)}
                        className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                      >
                        Update project access
                      </li>

                      <li
                        onClick={() => handleEditProject(project)}
                        className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                      >
                        Edit Project
                      </li>

                      <li
                        onClick={() => handleDeleteProject(project.project_id)}
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
            <p>No projects found.</p>
          )}
        </div>
      </div>

      {/* Modals */}
      {createProject && (
        <CreateProjectModal
          onClose={() => setCreateProject(false)} // Close modal on close
        />
      )}

      {projectToUpdate && (
        <UpdateAccessModal
          projectId={projectToUpdate}
          onClose={() => setProjectToUpdate(null)}
        />
      )}

      {editProject && (
        <EditProjectModal
          project={editProject}
          onClose={() => setEditProject(null)}
        />
      )}
    </div>
  );
};

export default PersonalProjectsPage;
