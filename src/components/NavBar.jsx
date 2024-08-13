import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '/image/logo.svg';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuStyle =
    'text-gray-600 text-center px-3 py-2 hover:text-gray-800 hover: hover:rounded-sm hover:bg-blue-100';

  const activeStyle = 'font-bold border-b-2 border-primary pb-1';

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
    <nav className="fixed z-20 w-full bg-white lg:shadow-md border-b border-gray lg:border-none">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo and Name */}
        <NavLink className="flex items-center" to="/">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="ml-2 lg:text-xl text-sm lg:font-bold text-gray-800">
            Timeless Planner
          </span>
        </NavLink>

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
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `${menuStyle} ${isActive ? activeStyle : ''}`
                }
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div
          className={`lg:flex space-x-4 ${menuOpen ? 'block' : 'hidden'} lg:block hidden`}
        >
          {buttons.map(button => (
            <NavLink key={button.to} to={button.to}>
              <button className={button.className}>{button.text}</button>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden">
          <ul className="flex flex-col border-t space-y-4 px-4 py-4">
            {links.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `${menuStyle} ${isActive ? activeStyle : ''}`
                  }
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
            {buttons.map(button => (
              <NavLink
                key={button.to}
                to={button.to}
                className={`${button.className} text-center`}
              >
                <button>{button.text}</button>
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
