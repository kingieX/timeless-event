// import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const navigate = useNavigate();

  const handleUpgradeTeamClick = () => {
    navigate('upgrade-team');
  };

  const handleSyncClick = () => {
    navigate('sync');
  };

  return (
    <div className="flex flex-col flex-grow justify-center items-center py-16">
      {/* Main Content */}
      <h2 className="lg:text-6xl text-4xl font-semibold lg:mb-12 mb-8 text-center">
        What’s New
      </h2>
      <div className="lg:w-1/4 flex lg:justify-between justify-center space-x-4">
        <button
          onClick={handleUpgradeTeamClick}
          className="border border-primary text-primary font-semibold py-2 px-4 hover:bg-primary hover:text-black transition duration-300"
        >
          Upgrade Team
        </button>
        <button
          onClick={handleSyncClick}
          className="border border-primary text-primary font-semibold py-2 px-4 hover:bg-primary hover:text-black transition duration-300"
        >
          Sync
        </button>
      </div>
    </div>
  );
};

export default MainContent;
