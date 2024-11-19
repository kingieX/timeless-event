import React, { useState, useEffect } from 'react';
import ErrorImage from '/image/error.svg';

const NetworkErrorPage = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg text-center">
      {/* Network error icon */}
      <div className="flex justify-center mb-4">
        <img
          src={ErrorImage}
          alt="Under Construction"
          className="w-full  h-1/2 bouncing-image"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-semibold text-red-600 mb-4">
        Network Error
      </h1>

      {/* Message */}
      <p className="text-lg text-gray-700 mb-6">
        It seems like you have no or a poor network connection. Please check
        your internet and try again.
      </p>

      {/* Reload button */}
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-primary text-white font-medium rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Retry
      </button>
    </div>
  </div>
);

const NetworkStatus = ({ children }) => {
  const [isOffline, setIsOffline] = useState(false);
  const [connectionType, setConnectionType] = useState(null);

  // Function to update network status
  const updateNetworkStatus = () => {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (navigator.onLine === false) {
      setIsOffline(true);
    } else if (connection) {
      const effectiveType = connection.effectiveType;
      setConnectionType(effectiveType);

      // You can define your threshold for a bad connection
      if (effectiveType === '2g' || effectiveType === 'slow-2g') {
        setIsOffline(true); // Assuming 2g or slower is considered "poor"
      } else {
        setIsOffline(false);
      }
    }
  };

  useEffect(() => {
    // Check network status on load
    updateNetworkStatus();

    // Add event listeners for online and offline events
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    // If using the Network Information API, update on connection change
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    if (connection) {
      connection.addEventListener('change', updateNetworkStatus);
    }

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      if (connection) {
        connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);

  // If offline or poor connection, render the network error page
  if (isOffline) {
    return <NetworkErrorPage />;
  }

  // Otherwise, render the children (main content of the app)
  return <>{children}</>;
};

export default NetworkStatus;
