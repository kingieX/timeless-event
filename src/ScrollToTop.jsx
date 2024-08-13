/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ offset = 0 }) => {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname); // To track previous pathname

  useEffect(() => {
    const handleScrollToElement = () => {
      const element = document.getElementById(hash?.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });

        if (prevPathname.current !== pathname) {
          // Only apply offset if navigating to a new path
          setTimeout(() => {
            window.scrollBy(0, -offset);
          }, 300); // Adjust the timeout as needed
        }
      }
    };

    if (hash) {
      handleScrollToElement();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update the previous pathname
    prevPathname.current = pathname;
  }, [pathname, hash, offset]);

  return null;
};

export default ScrollToTop;
