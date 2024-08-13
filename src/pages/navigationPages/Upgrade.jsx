// import React from 'react';
import NavBar from '../../components/NavBar';
import UnderConstruction from '../../components/UnderConstruction';

const Upgrade = () => {
  const text = 'Upgrade to Premium';
  return (
    <div>
      <div className="">
        <NavBar />
      </div>
      <UnderConstruction PageName={text} />
    </div>
  );
};

export default Upgrade;
