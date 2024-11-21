import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import axios from 'axios';
import EditEventModal from '../../event/_components/EditEventModal';
import { Link } from 'react-router-dom';
import EventReminderModal from '../../event/_components/EventReminderModal';

const FetchEvent = ({ projectId, project }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const accessToken = Cookies.get('access_token');
  // console.log('Access token:', accessToken);
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const [showDropdown, setShowDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const [reminder, setReminder] = useState(null);
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/event/${projectId}/project-events`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch events, no events found');
        }

        const data = await response.json();
        setEvents(data);
        console.log('Events:', data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [projectId, accessToken, API_BASE_URL]);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = eventId => {
    setShowDropdown(showDropdown === eventId ? null : eventId);
  };

  // logic to handle reminder
  const handleSetReminder = eventId => {
    setReminder(eventId);
  };

  // logic to handle Edit EVent
  const handleEditEvent = event => {
    setEditEvent(event);
  };

  // logic to handle Delete Event
  const handleDeleteEvent = async eventId => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`${API_BASE_URL}/event/${eventId}/delete-event`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('Event deleted successfully');
        window.location.reload(); // Trigger project data refresh
      } catch (err) {
        console.error('Error deleting event:', err);
        setError('Failed to delete event.');
      }
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="w-full py-1 px-2 border border-gray my-4 border-l-4 border-l-red-500">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      {events.length > 0 ? (
        <ul className="py-2 lg:px-8 px-4 mb-12 grid lg:grid-cols-1 grid-cols-1">
          {events.map(event => (
            <li
              key={event.event_id}
              className="relative w-full flex items-center space-x-2"
            >
              <Link
                to={`/app/workspace/${project.team_space_id}/folders/${project.folder_id}/projects/${project.project_id}/events/${event.event_id}`}
                className="relative w-full flex justify-between items-center border-b border-gray p-2 hover:bg-blue-50"
              >
                <div className="flex flex-col gap-1">
                  <h1 className="lg:text-lg text-xs font-">{event.title}</h1>
                  <div className="flex space-x-1 text-xs text-primary">
                    {/* <p>
                      <span className="font-semibold">Location: </span>
                      {event.location}
                    </p> */}
                    <p>
                      <span className="font-semibold">Date: </span>
                      {new Date(event.event_date).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p>
                      <span className="font-semibold">Time: </span>
                      {new Date(event.event_time).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>
              </Link>
              <button
                className="absolute z-40 right-4 top-7"
                onClick={() => toggleDropdown(event.event_id)}
              >
                <FiMoreVertical className="w-5 h-5 cursor-pointer" />
              </button>
              {showDropdown === event.event_id && (
                <ul
                  ref={dropdownRef}
                  className="absolute z-50 right-4 top-10 w-40 bg-white border rounded-lg shadow-lg"
                >
                  {/* Add your dropdown options here */}
                  <li
                    onClick={() => handleSetReminder(event.event_id)}
                    className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    Set Reminder
                  </li>

                  <li
                    onClick={() => handleEditEvent(event)}
                    className="flex w-full items-center space-x-2 p-2 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    Edit event
                  </li>

                  <li
                    onClick={() => handleDeleteEvent(event.event_id)}
                    className="flex w-full items-center space-x-2 p-2 text-red-500 text-sm hover:bg-blue-100 cursor-pointer"
                  >
                    Delete event
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-8">No events found for this project.</p>
      )}

      {/* Render the EventReminderModal if reminder is set */}
      {reminder && (
        <EventReminderModal
          eventId={reminder}
          onClose={() => setReminder(null)}
        />
      )}

      {/* Render the EditEventModal if editEvent is set */}
      {editEvent && (
        <EditEventModal event={editEvent} onClose={() => setEditEvent(null)} />
      )}
    </div>
  );
};

export default FetchEvent;
