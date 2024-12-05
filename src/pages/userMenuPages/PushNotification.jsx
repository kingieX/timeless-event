import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// Helper function to fetch the VAPID public key
const fetchVapidPublicKey = async accessToken => {
  try {
    const response = await fetch(`${API_BASE_URL}/subscribe/vapid-public-key`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data.public_key;
  } catch (error) {
    console.error('Error fetching VAPID public key:', error);
    return null;
  }
};

// Helper function to register a service worker
const registerServiceWorker = async vapidPublicKey => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const swReg =
        await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered:', swReg);
      await subscribeUser(swReg, vapidPublicKey);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  } else {
    console.warn('Service Worker or PushManager not supported.');
  }
};

// Helper function to subscribe the user to push notifications
const subscribeUser = async (swRegistration, vapidPublicKey) => {
  const applicationServerKey = urlB64ToUint8Array(vapidPublicKey);
  try {
    const subscription = await swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    });
    console.log('User subscribed:', subscription);
    // Send subscription to the server
    await updateSubscriptionOnServer(subscription);
  } catch (error) {
    console.error('User subscription failed:', error);
  }
};

// Helper function to convert Base64 URL to Uint8Array
const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

// Helper function to update subscription on the server
const updateSubscriptionOnServer = async subscription => {
  const endpoint = subscription.endpoint;
  const p256dh_key = arrayBufferToBase64(subscription.getKey('p256dh'));
  const auth_key = arrayBufferToBase64(subscription.getKey('auth'));

  const subscriptionData = {
    endpoint,
    p256dh_key,
    auth_key,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/subscribe/pushnotification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriptionData),
    });
    if (!response.ok)
      throw new Error('Failed to update subscription on the server');
    const data = await response.json();
    console.log('Subscription updated:', data);
  } catch (error) {
    console.error('Error updating subscription on the server:', error);
  }
};

// Helper function to convert ArrayBuffer to Base64
const arrayBufferToBase64 = buffer => {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
};

const PushNotificationPage = ({ onClose }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get('access_token');

    const initializePushNotifications = async () => {
      setLoading(true);
      const vapidPublicKey = await fetchVapidPublicKey(accessToken);

      if (vapidPublicKey) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            console.log('Notification permission granted');
            registerServiceWorker(vapidPublicKey);
            setIsSubscribed(true);
          } else {
            alert('Notification permission denied.');
          }
        });
      } else {
        alert('Failed to fetch VAPID public key.');
      }
      setLoading(false);
    };

    initializePushNotifications();
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
        {/* <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button> */}
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Push Notification Setup
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : isSubscribed ? (
          <div className="flex flex-col gap-4 justify-center items-center">
            <img
              src="/image/push_notifications.svg"
              alt="push notification"
              className="lg:w-full w-1/2"
            />
            <p className="lg:text-xl text-center text-green-600">
              You are successfully subscribed to push notifications!
            </p>
          </div>
        ) : (
          <p className="lg:text-xl text-center text-gray-600">
            Please allow push notifications to proceed.
          </p>
        )}

        <div className="mt-4 flex justify-center">
          {/* {isSubscribed && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={onClose}
            >
              Close
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default PushNotificationPage;
