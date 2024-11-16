import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PhoneInputForm from '../../components/PhoneInputForm';
import EmailInputForm from '../../components/EmailInputForm'; // Assuming you have this component

const AddGuest = () => {
  const [message, setMessage] = useState('');
  const [medium, setMedium] = useState('sms');
  const [contacts, setContacts] = useState('');
  const [reminderTimes, setReminderTimes] = useState([]);
  const [reminderTime, setReminderTime] = useState('');
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_BASE_URL = import.meta.env.VITE_BASE_URL; // Assuming this is set up in your environment

  // Add reminder time to the list
  const addReminderTime = () => {
    if (reminderTime) {
      setReminderTimes([
        ...reminderTimes,
        { reminder_time: reminderTime, triggered: false },
      ]);
      setReminderTime(''); // Reset reminder time input after adding
    }
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Ensure contacts are valid
    if (!contacts) {
      setError('Please enter at least one contact.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('message', message);
    formData.append('medium', medium);
    formData.append('contacts', contacts);
    formData.append('reminder_times', JSON.stringify(reminderTimes));
    formData.append('title', title);

    console.log('FormData: ', formData);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/reminder/create-reminder`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess('Reminder set successfully!');

        // Reset form fields after successful submission
        setMessage('');
        setMedium('sms');
        setContacts('');
        setReminderTimes([]);
        setReminderTime('');
        setTitle('');
      }
    } catch (error) {
      console.error('Error creating reminder:', error);
      setError('Failed to create reminder.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mb-8">
      <div className="bg-white px-6 lg:py-6 w-full max-w-xl  rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Add New Guest Reminder
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
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

          {/* Message */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
              disabled={isLoading}
            />
          </div>

          {/* Medium (SMS, Email, etc.) */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Medium</label>
            <select
              value={medium}
              onChange={e => setMedium(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              disabled={isLoading}
            >
              <option value="sms">SMS</option>
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="browser">Browser</option>
              <option value="mobile_app">Mobile App</option>
            </select>
          </div>

          {/* Conditionally Render Contacts Form Based on Medium */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contacts</label>

            {medium === 'sms' || medium === 'whatsapp' ? (
              <PhoneInputForm onContactsChange={setContacts} />
            ) : medium === 'email' ? (
              <EmailInputForm onContactsChange={setContacts} />
            ) : null}
          </div>

          {/* Reminder Times */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Reminder Times</label>
            <div className="flex items-center">
              <input
                type="datetime-local"
                value={reminderTime}
                onChange={e => setReminderTime(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={addReminderTime}
                className="ml-2 bg-green-500 text-white font-semibold py-2 px-4 rounded"
                disabled={isLoading || !reminderTime}
              >
                Add
              </button>
            </div>
            <ul className="mt-2">
              {reminderTimes.map((time, index) => (
                <li key={index} className="text-gray-600">
                  {new Date(time.reminder_time).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mb-4">
            {/* <button
              type="button"
              className="mr-2 border border-red-400 text-red-400 font-semibold py-2 px-4 rounded"
              disabled={isLoading}
            >
              Cancel
            </button> */}
            <button
              type="submit"
              className="w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Sending Reminder...' : 'Send Reminder'}
            </button>
          </div>

          {/* Success or Error Messages */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddGuest;
