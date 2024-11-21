import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CiSettings } from 'react-icons/ci';
import EventSettings from './_components/EventSettings';

const EventDetailPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [ids, setIds] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const menuRef = useRef(null);
  const [isEventSettingsMenuOpen, setIsEventSettingsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/event/get-event-id?event_id=${eventId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }

        const data = await response.json();
        setEvent(data);
        console.log('Event details:', data);

        // Fetch project IDs using the project_id from the event data
        await fetchIds(data.project_id);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchIds = async projectId => {
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
          throw new Error('Failed to fetch project IDs');
        }

        const data = await response.json();
        setIds(data);
        console.log('Ids details:', data);
      } catch (error) {
        console.error('Error fetching ids:', error);
      }
    };

    fetchEventDetails();
  }, [eventId, accessToken, API_BASE_URL]);

  // ** settings dropdown **//
  // Toggle menu visibility
  const toggleMenu = eventId => {
    if (isEventSettingsMenuOpen === eventId) {
      setIsEventSettingsMenuOpen(null); // Close if already open
    } else {
      setIsEventSettingsMenuOpen(eventId); // Open the clicked menu
    }
  };

  // Close modal or dropdown if a click happens outside the menu or dropdown
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsEventSettingsMenuOpen(false); // Close the modal
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="w-full py-1 px-2 border border-gray my-4 border-l-4 border-l-red-500">
        <p className="text-red-500 text-center text-sm">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative px-4 flex justify-between items-center mb-8">
        {/* Navigation */}
        <div className=" flex space-x-1 lg:text-sm text-xs">
          {ids && (
            <>
              <Link
                to={`/app/workspace/${ids.team_space_id}`}
                className="text-slate-700 hover:underline cursor-pointer"
              >
                Workspace
              </Link>
              <span className="text-slate-700"> / </span>
              <Link
                to={`/app/workspace/${ids.team_space_id}/folders/${ids.folder_id}`}
                className="text-slate-700 hover:underline cursor-pointer"
              >
                Folder
              </Link>
              <span className="text-slate-700"> / </span>
              <Link
                to={`/app/workspace/${ids.team_space_id}/folders/${ids.folder_id}/projects/${event.project_id}`}
                className="text-slate-700 hover:underline cursor-pointer"
              >
                Project
              </Link>
              <span className="text-slate-700"> / </span>
            </>
          )}
          <p className="font-bold">{event.title}</p>
        </div>

        <div className="flex gap-4 justify-end px-4">
          <div
            onClick={() => toggleMenu(event.event_id)}
            className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer"
          >
            <CiSettings className="w-5 h-5" />
            <p className="text-sm font-semibold lg:block hidden">Settings</p>
          </div>
          {isEventSettingsMenuOpen === event.event_id && (
            <EventSettings
              ref={menuRef} // Use the single ref for the team options dropdown
              isOpen={isEventSettingsMenuOpen}
              eventId={event.task_id}
              eventName={event.title}
              event={event}
            />
          )}
        </div>
      </div>

      {/* Event details */}
      <div className="lg:py-4 py-1 px-4 lg:px-16">
        {event ? (
          <>
            <div className="flex flex-col space-y-2">
              {/* Title */}
              <h1 className="lg:text-4xl text-2xl font-bold">{event.title}</h1>

              {/* Subtitles */}
              <div className="text-sm text-slate-700">
                <div className="flex flex-col lg:flex-row lg:items-center items-start lg:gap-2 ">
                  <p>
                    <strong>Event Date:</strong>{' '}
                    {new Date(event.event_date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p>
                    <strong>Event Time:</strong>{' '}
                    {new Date(event.event_time).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center items-start lg:gap-2 ">
                  <p>
                    <strong>Is Virtual:</strong>{' '}
                    {event.is_virtual ? 'Yes' : 'No'}
                  </p>
                  <p>
                    <span className="font-semibold">Created on: </span>
                    {new Date(event.created_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p>
                    <span className="font-semibold">Updated on: </span>
                    {new Date(event.updated_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              {/* Description */}
              <p className="mb-4 text-sm text-slate-700 font-semibold">
                Description:{' '}
                <span className="font-normal">{event.description}</span>
              </p>
            </div>
          </>
        ) : (
          <p className="text-center">No event found with the given ID.</p>
        )}
      </div>
    </>
  );
};

export default EventDetailPage;
