import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { LuFolderGit } from 'react-icons/lu';
import { CiSettings } from 'react-icons/ci';
import TeamOptionsMenu from '../../_components/TeamOptionsMenu';
import Settings from './_components/Settings';

function TeamDetailPage() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [membersDetail, setMembersDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log('Fetched team details:', response.data);
      } catch (error) {
        setError('Error fetching team details, reload page.');
        console.error('Error fetching team details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamDetails();
  }, [teamId]);

  // Fetch member details
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
  //       console.log('Fetched member details:', responses);
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

  if (loading) return <p className="px-8">Loading...</p>;
  if (error) return <p className="text-red-500 px-8">{error}</p>;

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
              <div className="flex lg:flex-row flex-col lg:items-center items-start lg:gap-2 text-sm text-slate-700">
                <p>
                  <span className="font-semibold">Industry: </span>
                  {team.work_industry}
                </p>
                <p className="lg:block hidden"> • </p>
                <p>
                  <span className="font-semibold">Organization Size: </span>
                  {team.organization_size}
                </p>
                <p className="lg:block hidden"> • </p>
                <p>
                  <span className="font-semibold">Work Type: </span>
                  {team.user_work_type}
                </p>
                <p className="lg:block hidden"> • </p>
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
                {/* <div className="flex gap-2">
                  {membersDetail.map(member => (
                    <div
                      key={member.user_id}
                      className="flex items-center space-x-2"
                    >
                      <p>{member.user_name}</p>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </>
        ) : (
          <p>No Team data found.</p>
        )}
      </div>
    </>
  );
}

export default TeamDetailPage;
