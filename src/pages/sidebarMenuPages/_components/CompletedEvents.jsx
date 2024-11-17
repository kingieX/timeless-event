// import React from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { PiDotsSixVerticalLight, PiDotsThreeOutlineThin } from 'react-icons/pi';
import { AiOutlineEdit } from 'react-icons/ai';
import { CiCalendar } from 'react-icons/ci';
import { BsCalendar2 } from 'react-icons/bs';

import Logo from '/image/completed.svg';
import { Link } from 'react-router-dom';
import EventReminderModal from '../workspace/event/_components/EventReminderModal';
import EditEventModal from '../workspace/event/_components/EditEventModal';

const CompletedEvents = () => {
  const [showCompletedEvents, setShowCompletedEvents] = useState(true);
  const [events, setEvents] = useState([]); // Renamed to `tasks` for clarity
  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const [showDropdown, setShowDropdown] = useState(null); // Track which dropdown is open
  const dropdownRef = useRef(null);
  const [reminder, setReminder] = useState(null);
  const [editEvent, setEditEvent] = useState(null);

  const toggleTasks = () => setShowCompletedEvents(!showCompletedEvents);

  // Fetch all tasks
  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/event/events/past`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch completed events');
        }

        const data = await response.json();
        setEvents(data); // Set the fetched tasks
        console.log('All Events:', data);
      } catch (error) {
        console.error('Error fetching completed events:', error);
      }
    };

    fetchAllEvents();
  }, [accessToken, API_BASE_URL]);

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

  return (
    <>
      <div className=" py-4 px-4">
        <div
          className="flex flex-row items-center gap-2 cursor-pointer mb-4"
          onClick={toggleTasks}
        >
          <h1 className="lg:text-xl text-sm flex items-center">
            Completed Events
          </h1>
          {showCompletedEvents ? (
            <FaChevronUp className="mr-2 text-slate-600 w-3" />
          ) : (
            <FaChevronDown className="mr-2 text-slate-600 w-3" />
          )}
        </div>

        {showCompletedEvents && (
          <div>
            {/* Task List */}
            {events && events.length > 0 ? (
              events.map(event => {
                return (
                  <div
                    key={event.id}
                    className="w-full flex flex-col justify-between items-start py-2 px-4 pr-8 border-b border-t border-t-gray border-b-gray group relative"
                  >
                    {/* First line */}
                    <div className="flex -ml-8">
                      <div>
                        <PiDotsSixVerticalLight className="w-8 h-6 opacity-0 lg:group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex justify-center items-center mx-2">
                          {/* Task Title */}
                          <Link
                            to={`/app/workspace/${event.event_id}/folders/${event.event_id}/projects/${event.project_id}/events/${event.event_id}`}
                          >
                            <h3 className="text-sm hover:underline">
                              {event.title}
                            </h3>
                          </Link>
                        </div>
                        {/* Hover Icons */}
                        <div className="flex justify-center items-center space-x-2 lg:opacity-0 group-hover:opacity-100 transition-opacity absolute lg:top-4 top-2 right-4">
                          {/* <AiOutlineEdit
                            onClick={() => handleEditTask(event)}
                            className="text-slate-700 cursor-pointer lg:w-6 lg:h-6 w-5 h-5 hover:text-slate-500"
                          />
                          <CiCalendar
                            onClick={() => handleSetReminder(event.task_id)} // Pass folder ID here
                            className="text-slate-700 cursor-pointer lg:w-6 lg:h-6 w-5 h-5 hover:text-slate-500"
                          /> */}
                          {/* <FaRegMessage className="text-slate-700 cursor-pointer w-4 h-4" /> */}
                          <PiDotsThreeOutlineThin
                            onClick={() => toggleDropdown(event.event_id)}
                            className="text-slate-700 cursor-pointer lg:w-6 lg:h-6 w-5 h-5 hover:text-slate-500"
                          />
                          {showDropdown === event.event_id && (
                            <ul
                              ref={dropdownRef}
                              className="absolute z-50 right-4 top-10 w-40 bg-white border rounded-lg shadow-lg"
                            >
                              {/* Add your dropdown options here */}
                              <li
                                onClick={() =>
                                  handleSetReminder(event.event_id)
                                }
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
                                onClick={() =>
                                  handleDeleteEvent(event.event_id)
                                }
                                className="flex w-full items-center space-x-2 p-2 text-red-500 text-sm hover:bg-blue-100 cursor-pointer"
                              >
                                Delete event
                              </li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Second line */}
                    <div className="mx-2 mt-1">
                      <p className="text-xs text-slate-500">
                        {event.description}
                      </p>
                    </div>

                    {/* Third line */}
                    <div className="w-full flex justify-between mt-2 mx-2">
                      <div className="flex items-center justify-start gap-1 text-xs text-primary">
                        <BsCalendar2 className="" />
                        <span className="font-semibold">Event time: </span>
                        <span>
                          {new Date(event.event_date).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                        <span>
                          {new Date(event.event_time).toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                          })}
                        </span>
                      </div>
                      {/* Location Display */}
                      <div className="text-xs text-slate-500 hidden lg:block">
                        <span className="font-semibold">Location: </span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full flex flex-col justify-center items-center py-8">
                <img
                  src={Logo}
                  alt="empty project"
                  className="lg:w-1/4 w-1/2 mb-4"
                />
                <h2 className="lg:text-2xl text-xl font-bold flex items-center">
                  No completed tasks available
                </h2>
                <p className="lg:text-lg text-center text-sm text-gray-600">
                  Complete tasks to view them here
                </p>
              </div>
            )}
          </div>
        )}
      </div>

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
    </>
  );
};

export default CompletedEvents;
