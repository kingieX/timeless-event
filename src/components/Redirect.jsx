import React from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
  const navigate = useNavigate();

  // Redirect to the dashboard after 3 seconds
  setTimeout(() => {
    navigate('/login');
  }, 3000);

  //   return <div>Redirecting...</div>;
};

export default Redirect;
