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
    'text-gray-600 px-3 py-2 hover:text-gray-800 hover: hover:rounded-sm hover:bg-blue-100';

  // Dynamic links data
  const links = [
    { to: '/features', text: 'Features' },
    { to: '/resources', text: 'Resources' },
    { to: '/pricing', text: 'Pricing' },
    { to: '/upgrade', text: 'Upgrade to Premium' },
  ];

  const buttons = [
    {
      to: '/login',
      text: 'Login',
      className: `${menuStyle} px-4 py-2`,
    },
    {
      to: '/signup',
      text: 'Sign Up',
      className:
        'border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-black',
    },
  ];

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
          {links.map(link => (
            <li key={link.to}>
              <Link to={link.to} className={menuStyle}>
                {link.text}
              </Link>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div
          className={`lg:flex space-x-4 ${menuOpen ? 'block' : 'hidden'} lg:block hidden`}
        >
          {buttons.map(button => (
            <Link key={button.to} to={button.to}>
              <button className={button.className}>{button.text}</button>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden">
          <ul className="flex flex-col border-t space-y-4 px-4 py-4">
            {links.map(link => (
              <li key={link.to}>
                <Link to={link.to} className={`${menuStyle}`}>
                  {link.text}
                </Link>
              </li>
            ))}
            {buttons.map(button => (
              <Link
                key={button.to}
                to={button.to}
                className={`${button.className} text-center`}
              >
                <button>{button.text}</button>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
