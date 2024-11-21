import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { LuFolderGit } from 'react-icons/lu';
import { CiSettings } from 'react-icons/ci';
import TeamOptionsMenu from '../../_components/TeamOptionsMenu';
import Settings from './_components/Settings';
import CreateProjectModal from '../../project/_components/CreateProjectModal';
import Logo from '/image/Members.svg';

function TeamDetailPage() {
  const { teamId } = useParams();
  // console.log(teamId);

  const [team, setTeam] = useState(null);
  const [membersDetail, setMembersDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [createProject, setCreateProject] = useState(null);

  const [isTeamOptionsMenuOpen, setIsTeamOptionsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Consolidated ref for both menu and dropdown

  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const accessToken = Cookies.get('access_token');

  // Fetch team details
  useEffect(() => {
    const fetchTeamDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/team/${teamId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTeam(response.data);
        setMembersDetail(response.data.members);
        console.log('Fetched team details:', response.data.members);
      } catch (error) {
        setError('Error fetching team details, reload page.');
        console.error('Error fetching team details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamDetails();
  }, [teamId]);

  // // Fetch member details
  // useEffect(() => {
  //   const fetchMembersDetails = async () => {
  //     if (!team) return; // Ensure team data is available

  //     setLoading(true);
  //     try {
  //       const memberRequests = team.members.map(member =>
  //         axios.get(`${API_BASE_URL}/user/${member.user_id}`, {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         })
  //       );

  //       const responses = await Promise.all(memberRequests);
  //       setMembersDetail(responses.map(response => response.data));
  //       console.log(
  //         'Fetched member details:',
  //         responses.map(response => response.data)
  //       );
  //     } catch (error) {
  //       setError('Error fetching member details, reload page.');
  //       console.error('Error fetching member details:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchMembersDetails();
  // }, [team]);

  // ** settings dropdown **//
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
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // logic to handle create project
  const handleCreateProject = teamId => {
    setCreateProject(teamId);
  };

  if (loading) return <p className="px-8">Loading...</p>;
  if (error)
    return (
      <div className="w-full py-2 px-2 border border-gray my-4 border-l-4 border-l-red-500">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        {/* navigation */}
        <div>
          <Link
            to={`/app/workspace/${team.team_space_id}`}
            className="text-slate-700 hover:underline cursor-pointer"
          >
            {team.team_space.team_space_name}
          </Link>
          <span className="text-slate-700"> /</span>
        </div>
        {/* team options */}
        <div className="flex gap-4 justify-end px-4">
          {/* Create Project */}
          {/* <div
            onClick={() => handleCreateProject(team.team_id)}
            className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer"
          >
            <LuFolderGit className="w-5 h-5" />
            <p className="text-sm font-semibold lg:block hidden">
              Create Project
            </p>
          </div> */}
          {/* settings */}
          <div
            onClick={() => toggleMenu(team.team_id)}
            className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer"
          >
            <CiSettings className="w-5 h-5" />
            <p className="text-sm font-semibold lg:block hidden">settings</p>
          </div>
          {isTeamOptionsMenuOpen === team.team_id && (
            <Settings
              ref={menuRef} // Use the single ref for the team options dropdown
              isOpen={isTeamOptionsMenuOpen}
              teamId={team.team_id}
              teamName={team.team_name}
              team={team}
            />
          )}
        </div>
      </div>

      {/* header */}
      <div className="lg:py-4 py-1 px-4 lg:px-24">
        {team ? (
          <>
            <div className="flex flex-col space-y-2">
              {/* title */}
              <div className="flex space-x-2 justify-start items-center">
                {/* <p className="py-0.5 px-2 font-semibold bg-primary rounded">
                  {team.team_name.slice(0, 1)}
                </p> */}
                <h1 className="lg:text-4xl text-2xl font-bold">
                  <span>Team: </span>
                  {team.team_name}
                </h1>
              </div>

              {/* sub titles */}
              <div className="flex flex-col items-start text-sm text-slate-700">
                <div className="flex space-x-2">
                  <p>
                    <span className="font-semibold">Industry: </span>
                    {team.work_industry}
                  </p>
                  <p className="lg:block hidden"> • </p>
                  <p>
                    <span className="font-semibold">Organization Size: </span>
                    {team.organization_size}
                  </p>
                </div>
                {/* <p className="lg:block hidden"> • </p> */}
                <p>
                  <span className="font-semibold">Work Type: </span>
                  {team.user_work_type}
                </p>
                {/* <p className="lg:block hidden"> • </p> */}
                <p>
                  <span className="font-semibold">Created on: </span>
                  {new Date(team.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </p>
                {/* <p className="lg:block hidden"> • </p> */}
                {/* <p>
                  <span className="font-semibold">Last updated: </span>
                  {new Date(team.updated_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </p> */}
              </div>
              {/* members */}
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">
                  Members ({team.members.length})
                </h2>
                {membersDetail.length > 0 ? (
                  <ul className="py-2 mb-12 grid lg:grid-cols-1 grid-cols-1">
                    {membersDetail.map((member, index) => (
                      <div
                        key={index}
                        className="relative w-full flex items-center space-x-2"
                      >
                        <div className="relative w-full flex justify-between items-center border-b border-gray p-2 hover:bg-blue-50">
                          <div className="flex flex-col gap-1">
                            {/* <p>{member.contacts}</p> */}
                            <h1 className="lg:text-lg text-xs font-">
                              <span className="font-semibold">Contact: </span>
                              {member.contacts}
                            </h1>
                            <div className="flex space-x-2 text-xs text-primar">
                              <p>
                                <span className="font-semibold">
                                  Invite Status:{' '}
                                </span>
                                {member.invite_status}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Invite type:{' '}
                                </span>
                                {member.invite_type}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ul>
                ) : (
                  <div className="w-full flex flex-col justify-center items-center py-8">
                    <img
                      src={Logo}
                      alt="empty project"
                      className="lg:w-1/4 w-1/2 mb-4"
                    />
                    <h2 className="lg:text-2xl text-xl font-bold flex items-center">
                      No members available
                    </h2>
                    <p className="lg:text-lg text-center text-sm text-gray-600">
                      Members are required to join and start working on
                      projects, add a member in settings.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full py-2 px-2 border border-gray my-4 border-l-4 border-l-red-500">
            <p className="text-red-500 text-center text-sm">
              No Team data found.
            </p>
          </div>
        )}

        {/* Render the CreateProjectModal if createProject is set */}
        {/* {createProject && (
          <CreateProjectModal
            teamId={createProject}
            onClose={() => setCreateProject(null)}
          />
        )} */}
      </div>
    </>
  );
}

export default TeamDetailPage;
