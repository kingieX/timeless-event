/* eslint-disable react/prop-types */
import { useState, forwardRef, useEffect } from 'react';
import Cookies from 'js-cookie';
// import SetReminderModal from './SetReminderModal'; // Import your modal for setting reminders
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditEventModal from './EditEventModal';
import EventReminderModal from './EventReminderModal';

const EventSettings = forwardRef(({ event }, ref) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [ids, setIds] = useState(null);
  const [reminder, setReminder] = useState(null);
  const [editEvent, setEditEvent] = useState(null);

  const access_token = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const GetIds = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/project/projects/${event.project_id}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        const data = response.data;
        setIds({
          teamSpaceId: data.team_space_id,
          projectId: data.project_id,
          folderId: data.folder_id,
        });
      } catch (error) {
        console.error('Error fetching Ids:', error);
      }
    };
    if (event) {
      GetIds();
    }
  }, [event, access_token, API_BASE_URL]);

  const handleSetReminder = eventId => {
    setReminder(eventId); // You can pass event details if necessary
  };

  //   logice to handle Edit event
  const handleEditEvent = event => {
    setEditEvent(event);
  };

  const handleDeleteEvent = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`${API_BASE_URL}/event/${event.event_id}/delete`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        console.log('Event deleted successfully');
        navigate(
          `/app/workspace/${ids.teamSpaceId}/folders/${ids.folderId}/projects/${ids.projectId}`
        );
        window.location.reload(); // Refresh to get updated data
      } catch (err) {
        console.error('Error deleting event:', err);
      }
    }
  };

  return (
    <div ref={ref} className="relative">
      <ul className="absolute z-50 right-4 top-10 w-40 bg-white border border-gray rounded-lg shadow-lg">
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
          Edit Event
        </li>

        <li
          onClick={() => handleDeleteEvent(event.event_id)}
          className="flex w-full items-center space-x-2 p-2 text-red-500 text-sm hover:bg-blue-100 cursor-pointer"
        >
          Delete Event
        </li>
      </ul>

      {/* Render the SetReminderModal if reminder is set */}
      {reminder && (
        <EventReminderModal
          eventId={reminder}
          onClose={() => setReminder(null)} // Close modal on close
        />
      )}

      {/* Render the EditEventModal if editEvent is set */}
      {editEvent && (
        <EditEventModal
          event={editEvent}
          onClose={() => setEditEvent(null)} // Close modal on close
        />
      )}
    </div>
  );
});

export default EventSettings;
