import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BiTask } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
import FetchTask from './_components/FetchTask';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  //   Route to fetch Project details
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/project/projects/${projectId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch project details');
        }

        const data = await response.json();
        setProject(data);
        console.log('Project details:', data);
      } catch (error) {
        console.error('Error fetching project details:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId, accessToken, API_BASE_URL]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        {/* navigation */}
        <div className="flex space-x-1">
          <Link
            to={`/app/workspace/${project.team_space_id}`}
            className="text-slate-700 hover:underline cursor-pointer"
          >
            {/* {folder.team_space.team_space_name} */}
            workspace
          </Link>
          <span className="text-slate-700"> / </span>
          <Link
            to={`/app/workspace/${project.team_space_id}/folders/${project.folder_id}`}
            className="text-slate-700 hover:underline cursor-pointer"
          >
            {/* {folder.team_space.team_space_name} */}
            folder
          </Link>
          <span className="text-slate-700"> / </span>
          <p className=" font-bold">{project.project_name}</p>
        </div>
        {/* team options */}
        <div className="flex gap-4 justify-end px-4">
          {/* invite member */}
          <div
            // onClick={openProjectModal}
            className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer"
          >
            <BiTask className="w-5 h-5" />
            <p className="text-sm font-semibold lg:block hidden">Create Task</p>
          </div>
          {/* settings */}
          <div
            // onClick={() => toggleMenu(team.team_id)}
            className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer"
          >
            <CiSettings className="w-5 h-5" />
            <p className="text-sm font-semibold lg:block hidden">settings</p>
          </div>
          {/* {isTeamOptionsMenuOpen === project.project_id && (
            <Settings
              ref={menuRef} // Use the single ref for the team options dropdown
              isOpen={isTeamOptionsMenuOpen}
              projectId={project.project_id}
              projectName={project.project_name}
              project={project}
            />
          )} */}
        </div>
      </div>

      {/* project details */}
      <div className="lg:py-4 py-1 px-4 lg:px-24">
        {project ? (
          <>
            <div className="flex flex-col space-y-2">
              {/* Title */}
              <h1 className="lg:text-4xl text-2xl font-bold">
                {project.project_name}
              </h1>

              {/* subtitles */}
              <div className="text-sm text-slate-700">
                <div className="flex flex-col lg:flex-row lg:items-center items-start lg:gap-2 ">
                  <p className="flex space-x-1 items-center">
                    <strong>Color:</strong>{' '}
                    <span
                      className={`inline-block w-4 h-4 rounded-full`}
                      style={{ backgroundColor: project.color }}
                    ></span>{' '}
                    {/* {project.color} */}
                  </p>
                  <p>
                    <strong>Access level:</strong> {project.access}
                  </p>
                  <p>
                    <span className="font-semibold">Created on: </span>
                    {new Date(project.created_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p>
                    <span className="font-semibold">Updated on: </span>
                    {new Date(project.updated_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              {/* description */}
              <p className="mb-4 text-sm text-slate-700 font-semibold">
                Description:{' '}
                <span className="font-normal">{project.description}</span>
              </p>
            </div>
          </>
        ) : (
          <p>No project found with the given ID.</p>
        )}
      </div>

      {/* tasks */}
      <div className="p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="lg:text-lg font-semibold">Tasks</h2>
        <FetchTask projectId={projectId} />
      </div>
    </>
  );
};

export default ProjectDetailPage;
