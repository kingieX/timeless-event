import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const EditEventModal = ({ event, onClose }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [eventDate, setEventDate] = useState(event?.event_date || '');
  const [eventTime, setEventTime] = useState(event?.event_time || '');
  const [location, setLocation] = useState(event?.location || '');
  const [isVirtual, setIsVirtual] = useState(event?.is_virtual || false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDescription(event.description || '');
      setEventDate(event.event_date || '');
      setEventTime(event.event_time || '');
      setLocation(event.location || '');
      setIsVirtual(event.is_virtual || false);
    }
  }, [event]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const requestBody = {
      title,
      description,
      event_date: eventDate,
      event_time: eventTime,
      location,
      is_virtual: isVirtual,
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/event/${event.event_id}/update-event`,
        {
          method: 'PUT', // Assuming the update is done with PUT
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        setSuccess('Event updated successfully!');
        setTimeout(() => {
          onClose();
          window.location.reload(); // Refresh the event data
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 w-full m-8 overflow-y-auto h-[80vh] border border-gray max-w-xl rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Event</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
              disabled={isLoading}
            />
          </div>

          <div className="w-full gap-4 flex">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Event Date</label>
              <input
                type="date"
                value={eventDate ? eventDate.split('T')[0] : ''}
                onChange={e => setEventDate(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                required
                disabled={isLoading}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Event Time</label>
              <input
                type="time"
                value={eventTime ? eventTime.split('T')[1].slice(0, 5) : ''}
                onChange={e => setEventTime(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={isVirtual}
              onChange={e => setIsVirtual(e.target.checked)}
              className="mr-2"
            />
            <label className="text-gray-700">Is this event virtual?</label>
          </div>

          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={onClose}
              className="border mr-2 border-red-400 text-red-400 font-semibold py-2 px-4 hover:bg-red-400 hover:text-white transition duration-300"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Event'}
            </button>
          </div>

          {/* Display Success or Error Messages */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
