import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { LuFolderGit } from 'react-icons/lu';

const FolderDetailPage = () => {
  const { folderId } = useParams();
  const [folder, setFolder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log('Fetched folder details:', response.data);
      } catch (error) {
        setError('Error fetching folder details, reload page.');
        console.error('Error fetching folder details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFolderDetails();
  }, [folderId]);

  if (loading) return <p className="px-8">Loading...</p>;
  if (error) return <p className="text-red-500 px-8">{error}</p>;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        {/* navigation */}
        <div>
          <Link
            to={`/app/workspace/${folder.team_space_id}`}
            className="text-slate-700 hover:underline cursor-pointer"
          >
            {folder.team_space.team_space_name}
          </Link>
          <span className="text-slate-700"> /</span>
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
            onClick={() => toggleMenu(team.team_id)}
            className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer"
          >
            <CiSettings className="w-5 h-5" />
            <p className="text-sm font-semibold lg:block hidden">settings</p>
          </div> */}
          {/* {isTeamOptionsMenuOpen === team.team_id && (
            <Settings
              ref={menuRef} // Use the single ref for the team options dropdown
              isOpen={isTeamOptionsMenuOpen}
              teamId={team.team_id}
              teamName={team.team_name}
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
                <ul>
                  {folder.projects.map(project => (
                    <li
                      key={project.project_id}
                      className="flex items-center space-x-2"
                    >
                      <Link
                        to={`/app/workspace/${folder.team_space_id}/projects/${project.project_id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {project.project_name}
                      </Link>
                      <span className="text-sm text-slate-500">
                        ({project.access})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <p>No folder data found.</p>
        )}
      </div>
    </>
  );
};

export default FolderDetailPage;
