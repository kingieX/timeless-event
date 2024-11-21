import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Utility function to check if the token is expired
const isTokenExpired = () => {
  const expirationTime = Cookies.get('access_token_expiration');
  const currentTime = new Date().getTime();
  return !expirationTime || currentTime > expirationTime;
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // If the token is expired, redirect to login page
    if (isTokenExpired()) {
      Cookies.remove('access_token');
      Cookies.remove('access_token_expiration');
      navigate('/');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AuthProvider;
