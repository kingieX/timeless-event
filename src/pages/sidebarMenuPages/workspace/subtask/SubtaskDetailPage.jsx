import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Cookies from 'js-cookie';
import { CiSettings } from 'react-icons/ci';
import SubtaskSettings from './_components/SubtaskSettings';
import { IoMdAlarm } from 'react-icons/io';
import ViewSubtaskReminderModal from './_components/ViewSubtaskReminderModal';

const SubtaskDetailPage = () => {
  const { subTaskId } = useParams(); // Extract subTaskId from URL
  const navigate = useNavigate(); // Get the navigate function to go back
  const [subtask, setSubtask] = useState(null); // To store subtask details
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const [isCopied, setIsCopied] = useState(false);

  const accessToken = Cookies.get('access_token');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const menuRef = useRef(null);
  const [isSubtaskSettingsMenuOpen, setIsSubtaskSettingsMenuOpen] =
    useState(false);

  const [viewReminder, setViewReminder] = useState(null);

  // Fetch subtask details using useEffect
  useEffect(() => {
    const fetchSubtaskDetails = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/subtask/get-subtask-by-id?sub_task_id=${subTaskId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch subtask details');
        }

        const data = await response.json();
        setSubtask(data); // Set the fetched subtask data
      } catch (error) {
        console.error('Error fetching subtask details:', error);
        setError(error.message); // Handle error if fetching fails
      } finally {
        setIsLoading(false); // Stop loading when data is fetched
      }
    };

    fetchSubtaskDetails();
  }, [subTaskId, accessToken, API_BASE_URL]); // Re-run if subTaskId changes

  // Function to handle the "Copy" button click
  const handleCopy = linkAddress => {
    navigator.clipboard
      .writeText(linkAddress)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  // Truncate the link to show only the first 30 characters
  const truncatedLink = linkAddress => {
    return linkAddress.length > 30
      ? linkAddress.slice(0, 30) + '...'
      : linkAddress;
  };

  // logic to handle subtask reminders
  const handleSubTaskReminder = subtaskId => {
    setViewReminder(subtaskId);
  };

  // ** settings dropdown **//
  // Toggle menu visibility
  const toggleMenu = subtaskId => {
    if (isSubtaskSettingsMenuOpen === subtaskId) {
      setIsSubtaskSettingsMenuOpen(null); // Close if already open
    } else {
      setIsSubtaskSettingsMenuOpen(subtaskId); // Open the clicked menu
    }
  };

  // Close modal or dropdown if a click happens outside the menu or dropdown
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsSubtaskSettingsMenuOpen(false); // Close the modal
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Display error message
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-end items-center mb-8">
        {/* View reminder */}
        <div
          onClick={() => handleSubTaskReminder(subtask.sub_task_id)}
          className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer"
        >
          <IoMdAlarm className="w-5 h-5" />
          <p className="text-sm font-semibold lg:block hidden">
            View Reminders
          </p>
        </div>
        {/* settings */}
        <div className="flex justify-end px-4 items-center">
          <div
            onClick={() => toggleMenu(subtask.sub_task_id)}
            className="flex items-center space-x-1 text-slate-700 hover:underline cursor-pointer"
          >
            <CiSettings className="w-5 h-5" />
            <p className="text-sm font-semibold lg:block hidden">Settings</p>
          </div>
          {isSubtaskSettingsMenuOpen === subtask.sub_task_id && (
            <SubtaskSettings
              ref={menuRef} // Use the single ref for the team options dropdown
              isOpen={isSubtaskSettingsMenuOpen}
              subtaskId={subtask.sub_task_id}
              subtaskName={subtask.description}
              subtask={subtask}
            />
          )}
        </div>
      </div>
      <div className="lg:px-16 px-4 py-1">
        <div className="flex space-x-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)} // This takes you to the previous page
            className="mb-4 px-2 bg-primary hover:bg-primary/50 rounded"
          >
            Back
          </button>

          <h1 className="text-3xl font-bold mb-4">Subtask Details</h1>
        </div>
        {subtask ? (
          <div className="space-y-4">
            {/* Description */}
            <div className="text-lg lg:text-3xl font-semibold">
              {subtask.description}
            </div>

            {/* other details */}
            <div className=" flex lg:flex-row flex-col gap-2 lg:text-lg text-sm text-">
              <p>
                <span className="font-semibold">Status: </span>
                {subtask.status}
              </p>
              {/* Share Link */}
              <p>
                <span className="font-semibold">Share Link: </span>
                {subtask.share_link}
              </p>
              <p>
                <span className="font-semibold">Frequency: </span>
                {subtask.frequency}
              </p>
            </div>

            <div className=" flex lg:flex-row flex-col gap-2 lg:text-lg text-sm text-">
              <p>
                <span className="font-semibold">Created: </span>
                {new Date(subtask.created_at).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </p>
              <p>
                <span className="font-semibold">Updated: </span>
                {new Date(subtask.updated_at).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
              </p>
            </div>

            <div className=" flex items-center space-x-2">
              {/* Display truncated link */}
              <input
                type="text"
                value={
                  subtask.link_address
                    ? truncatedLink(subtask.link_address)
                    : 'No link available'
                }
                readOnly
                className="border lg:text-lg text-sm border-gray-300 p-2 rounded bg-gray-100"
              />

              {/* Copy button */}
              <button
                onClick={() => handleCopy(subtask.link_address)}
                className="bg-primary lg:py-3 py-2 px-4 rounded hover:bg-primary/50"
              >
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        ) : (
          <p>No subtask found with the given ID.</p>
        )}
      </div>
      {/* Render the ViewSubtaskReminderModal if viewReminder is set */}
      {viewReminder && (
        <ViewSubtaskReminderModal
          subtaskId={viewReminder}
          onClose={() => setViewReminder(null)}
        />
      )}
    </div>
  );
};

export default SubtaskDetailPage;
