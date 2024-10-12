import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';

const MenuItem = ({
  menu,
  index,
  isSubMenuOpen,
  toggleSubMenu,
  currentPath,
  handleLinkClick,
}) => {
  const isMenuActive = menu.subMenu
    ? menu.subMenu.some(subMenu => subMenu.link === currentPath)
    : menu.link === currentPath;

  return (
    <div>
      {menu.subMenu ? (
        <>
          <div
            className={`flex items-center px-4 py-2 hover:bg-blue-50 cursor-pointer ${isMenuActive ? 'bg-blue-100' : ''}`}
            onClick={() => toggleSubMenu(index)}
          >
            <menu.icon
              className={`w-6 h-6 mr-2 ${isMenuActive ? 'text-primary' : ''}`}
            />
            <span>{menu.name}</span>
            <span className="ml-auto">
              {isSubMenuOpen ? (
                <IoMdArrowDropup className="w-6 h-6 text-slate-800" />
              ) : (
                <IoMdArrowDropdown className="w-6 h-6 text-slate-800" />
              )}
            </span>
          </div>
          {isSubMenuOpen && (
            <div>
              {menu.subMenu.map((subMenu, subIndex) => (
                <Link
                  key={subIndex}
                  to={subMenu.link}
                  onClick={handleLinkClick}
                >
                  <div
                    className={`flex items-center pl-8 px-4 py-1 hover:bg-blue-50 cursor-pointer ${
                      currentPath === subMenu.link
                        ? 'bg-blue-100 text-primary border-l-4 border-l-primary'
                        : ''
                    }`}
                  >
                    <subMenu.icon
                      className={`w-6 h-6 mr-2 text-slate-800 ${currentPath === subMenu.link ? 'text-primary' : ''}`}
                    />
                    <span>{subMenu.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link to={menu.link} onClick={handleLinkClick}>
          <div
            className={`flex items-center px-4 py-2 hover:bg-blue-50 cursor-pointer ${
              currentPath === menu.link
                ? 'bg-blue-100 text-primary border-l-4 border-l-primary'
                : ''
            }`}
          >
            <menu.icon
              className={`w-6 h-6 mr-2 text-slate-800 ${currentPath === menu.link ? 'text-primary' : ''}`}
            />
            <span>{menu.name}</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default MenuItem;
