import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const withAuth = WrappedComponent => {
  const AuthHOC = props => {
    const navigate = useNavigate();

    useEffect(() => {
      const accessToken = Cookies.get('access_token');

      // Check if the token exists and is valid (you can customize this check)
      if (!accessToken) {
        navigate('/login'); // Redirect to the login page if the token is expired or missing
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
