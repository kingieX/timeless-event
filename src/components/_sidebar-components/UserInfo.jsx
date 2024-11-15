import { CgProfile } from 'react-icons/cg';
import { IoMdArrowDropdown } from 'react-icons/io';
import UserMenuModal from '../SidebarModal';
import Cookies from 'js-cookie';

const UserInfo = ({ userData, isUserMenuModalOpen, toggleUserMenuModal }) => {
  const maxLength = 10;
  const fullname = Cookies.get('fullname');

  return (
    <div className="flex items-center hover:bg-blue-50">
      {userData.profileImage ? (
        <img
          src={userData.profileImage}
          alt={fullname}
          className="w-9 h-9 rounded-full"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold">
          <CgProfile className="w-6 h-6 text-black" />
        </div>
      )}

      <div
        onClick={toggleUserMenuModal}
        className="flex ml-3 relative cursor-pointer"
      >
        <h4 className="font-semibold">
          {fullname?.length > maxLength
            ? `${fullname.slice(0, maxLength)}...`
            : fullname}
          {/* {fullname.slice(0, 8)}... */}
        </h4>
        <button
          className="text-gray-500 flex items-center"
          onClick={toggleUserMenuModal}
        >
          <IoMdArrowDropdown className="cursor-pointer w-6 h-6" />
        </button>

        {isUserMenuModalOpen && (
          <UserMenuModal toggleModal={toggleUserMenuModal} />
        )}
      </div>
    </div>
  );
};

export default UserInfo;
