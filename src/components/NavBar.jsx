import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '/image/logo.svg';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuStyle =
    'text-gray-600 hover:text-gray-800 hover:text-primary hover:underline-offset-4 hover:border-b-2';

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo and Name */}
        <Link className="flex items-center" to="/">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 lg:text-xl text-sm lg:font-bold text-gray-800">
            Timeless Planner
          </span>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menu */}
        <ul
          className={`lg:flex space-x-6 ${menuOpen ? 'block' : 'hidden'} lg:block hidden`}
        >
          <li>
            <Link to="/features" className={menuStyle}>
              Features
            </Link>
          </li>
          <li>
            <Link to="/resources" className={menuStyle}>
              Resources
            </Link>
          </li>
          <li>
            <Link to="/pricing" className={menuStyle}>
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/upgrade" className={menuStyle}>
              Upgrade to Premium
            </Link>
          </li>
        </ul>

        {/* Buttons */}
        <div
          className={`lg:flex space-x-4 ${menuOpen ? 'block' : 'hidden'} lg:block hidden`}
        >
          <Link to="/login">
            <button className={`${menuStyle} px-4 py-2`}>Login</button>
          </Link>
          <Link to="/signup">
            <button className="border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-white">
              Sign Up
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden">
          <ul className="flex flex-col border-t space-y-4 px-4 py-4">
            <li>
              <Link to="/features" className={menuStyle}>
                Features
              </Link>
            </li>
            <li>
              <Link to="/resources" className={menuStyle}>
                Resources
              </Link>
            </li>
            <li>
              <Link to="/pricing" className={menuStyle}>
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/upgrade" className={menuStyle}>
                Upgrade to Premium
              </Link>
            </li>
            <Link to="/login" className={`${menuStyle} px-4 py-2 text-center`}>
              <button>Login</button>
            </Link>
            <Link
              to="/signup"
              className="border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-white text-center"
            >
              <button>Sign Up</button>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
