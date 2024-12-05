import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const InstantReminder = () => {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState(''); // Icon file
  const [message, setMessage] = useState('');
  const [medium, setMedium] = useState('sms');
  const [mediaType, setMediaType] = useState('image');
  const [mediaUrl, setMediaUrl] = useState(''); // Media file URL
  const [contacts, setContacts] = useState(['']); // Array of individual contacts
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  // Handle file input for icon
  const handleIconChange = e => {
    const file = e.target.files[0];
    if (file) {
      setIcon(file);
    }
  };

  // Handle file input for media
  const handleMediaChange = e => {
    const file = e.target.files[0];
    if (file) {
      setMediaUrl(file);
    }
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Convert contacts array into a string
    const contactsString = contacts
      .filter(contact => contact.trim() !== '') // Remove empty contacts
      .join(','); // Only join with comma if there is more than one contact

    // If there's only one contact, send it directly
    const finalContacts = contactsString || contacts[0];
    console.log('finalContacts: ', finalContacts);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('message', message);
    formData.append('medium', medium);
    formData.append('contacts', finalContacts); // Send the final contacts (either one or comma-separated)

    // Conditionally append 'icon' field if medium is not 'sms' and an icon is selected
    if (medium !== 'sms' && icon) {
      formData.append('icon', icon); // Include icon file only if medium is not 'sms'
    }

    // Conditionally append 'media_type' and 'media_url' if medium is not 'sms' and media is selected
    if (medium !== 'sms' && mediaType && mediaUrl) {
      formData.append('media_type', mediaType);
      formData.append('media_url', mediaUrl);
    }

    // Log the data that is being sent before making the request
    console.log('FormData being sent:', {
      title,
      message,
      medium,
      contacts: finalContacts,
      icon: icon ? icon.name : null,
      media_type: mediaType,
      media_url: mediaUrl,
    });

    try {
      const response = await fetch(
        `${API_BASE_URL}/reminder/create-and-send-reminder`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setSuccess('Reminder set successfully!');
        setTimeout(() => {
          navigate('/app');
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create reminder');
      }
    } catch (error) {
      console.error('Error creating reminder:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new contact input field
  const addContactField = () => {
    setContacts([...contacts, '']);
  };

  // Handle change for individual contact input
  const handleContactChange = (index, value) => {
    const newContacts = [...contacts];
    newContacts[index] = value;
    setContacts(newContacts);
  };

  return (
    <div className="flex items-center justify-center mb-4">
      <div className="bg-white p-6 w-full max-w-xl rounded-lg shadow-lg">
        <h2 className="lg:text-2xl text-center text-xl font-bold mb-4">
          Send Instant Reminder
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

          {/* Medium (SMS, Email, WhatsApp) */}
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
            </select>
          </div>

          {/* Contacts - Dynamically add contact inputs */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              {medium === 'sms' && 'Phone Number'}
              {medium === 'email' && 'Email Address'}
              {medium === 'whatsapp' && 'Phone Number'}
            </label>
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={contact}
                  onChange={e => handleContactChange(index, e.target.value)}
                  placeholder={
                    medium === 'sms' ? 'Enter phone number' : 'Enter contact'
                  }
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                  disabled={isLoading}
                />
                {index === contacts.length - 1 && (
                  <button
                    type="button"
                    onClick={addContactField}
                    className="ml-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                    disabled={isLoading}
                  >
                    Add
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Conditionally render the Icon input */}
          {medium !== 'sms' && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Icon</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleIconChange}
                className="border border-gray-300 p-2 rounded w-full"
                disabled={isLoading}
              />
              {icon && (
                <p className="mt-2 text-gray-600">Icon selected: {icon.name}</p>
              )}
            </div>
          )}

          {/* Conditionally render Media Type and Media File inputs */}
          {medium !== 'sms' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Media Type</label>
                <select
                  value={mediaType}
                  onChange={e => setMediaType(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  disabled={isLoading}
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                  <option value="document">Document</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Media File</label>
                <input
                  type="file"
                  accept="image/*,video/*,audio/*,.pdf"
                  onChange={handleMediaChange}
                  className="border border-gray-300 p-2 rounded w-full"
                  disabled={isLoading}
                />
                {mediaUrl && (
                  <p className="mt-2 text-gray-600">
                    Media selected: {mediaUrl.name}
                  </p>
                )}
              </div>
            </>
          )}

          <div className="w-full flex mb-4">
            <button
              type="submit"
              className="w-full bg-primary text-black font-semibold py-2 px-4 hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Setting Reminder...' : 'Set Reminder'}
            </button>
          </div>

          {/* Display Success or Error Messages */}
          {error && (
            <div className="py-1 px-2 border border-gray my-4 border-l-4 border-l-red-500">
              <p className="text-red-500 text-center text-sm">{error}</p>
            </div>
          )}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default InstantReminder;
