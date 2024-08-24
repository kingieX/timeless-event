import { useState } from 'react';
import { FaListCheck } from 'react-icons/fa6';

import NotificationImage from '/image/notification.svg';

const Notification = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      image: '/path-to-image.jpg', // replace with your image path
      text: 'You joined the Heliscom team',
      time: '4 weeks ago',
      unread: false, // Mark as unread
    },
    {
      id: 2,
      image: '/another-image.jpg', // replace with your image path
      text: 'You completed a task',
      time: '2 weeks ago',
      unread: false, // Mark as read
    },
    // Add more notification objects here
  ];

  // Toggle filter between 'all' and 'unread'
  const toggleFilter = () => {
    setActiveFilter(prevFilter => (prevFilter === 'all' ? 'unread' : 'all'));
  };

  // Filter notifications based on the active filter
  const filteredNotifications =
    activeFilter === 'all'
      ? notifications
      : notifications.filter(notification => notification.unread);

  return (
    <div className="flex flex-col h-screen bg-white lg:px-8 px-0">
      {/* Header */}
      <div className="bg-white shadow-sm p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <div className="flex justify-center items-center space-x-2">
          <FaListCheck className="text-slate-500" />
          <button className="text-slate-500 lg:block hidden">
            Mark all as read
          </button>
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="flex justify-start px-6 py-4">
        <div
          className="relative bg-slate-100 px-1 rounded-full cursor-pointer flex items-center py-1 "
          onClick={toggleFilter}
        >
          {/* Toggle slider */}
          <div
            className={`absolute top-1 bottom-1 left-1 transition-transform ${
              activeFilter === 'all'
                ? 'transform translate-x-0'
                : 'transform translate-x-full'
            }`}
          />
          {/* Toggle options */}
          <span
            className={`px-4 text-center text-sm font-semibold z-10 transition ${
              activeFilter === 'all'
                ? 'text-black py-1 bg-white rounded-full shadow'
                : 'text-gray-400'
            }`}
          >
            All
          </span>
          <span
            className={`px-2 text-center text-sm font-semibold z-10 transition ${
              activeFilter === 'unread'
                ? 'text-black bg-white py-1 rounded-full shadow'
                : 'text-gray-400'
            }`}
          >
            Unread
          </span>
        </div>
      </div>

      {/* Notification List */}
      <div className="flex-grow overflow-y-auto lg:px-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className="flex items-center space-x-4 p-4 border-t border-gray rounded-md hover:bg-slate-100"
            >
              {/* Notification Image */}
              <img
                src={notification.image}
                alt="Profile"
                className="w-12 h-12 rounded-full bg-primary"
              />
              {/* Notification Text */}
              <div className="flex-grow">
                <p>{notification.text}</p>
                <p className="text-slate-500 text-sm">{notification.time}</p>
              </div>
              {/* Unread Indicator */}
              {notification.unread && (
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center gap-4 py-8">
            <img
              src={NotificationImage}
              alt="notification"
              className="lg:w-1/4 w-1/2"
            />
            <p className="text-center text-slate-500">
              No notifications available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
