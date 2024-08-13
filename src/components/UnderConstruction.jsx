/* eslint-disable react/prop-types */
import UnderConstructionImage from '/image/under-construction.svg';
const UnderConstruction = ({ PageName }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px); /* Adjust the value for higher or lower bounce */
            }
          }

          .bouncing-image {
            animation: bounce 2s infinite ease-in-out;
          }

          @keyframes ellipsis {
            0% {
              content: '';
            }
            33% {
              content: '.';
            }
            66% {
              content: '..';
            }
            100% {
              content: '...';
            }
          }

          .typing-text::after {
            content: '';
            animation: ellipsis 4s infinite steps(4, end);
          }
        `}
      </style>
      <div className="flex flex-col justify-center items-center lg:px-24 px-4 py-8 lg:mt-20 mt-28">
        <div className="flex justify-center">
          <img
            src={UnderConstructionImage}
            alt="Under Construction"
            className="w-1/2 h-1/2 bouncing-image"
          />
        </div>
        <h1 className="lg:text-4xl text-2xl text-center text-black mt-5 typing-text">
          {PageName} page under construction
        </h1>
      </div>
    </div>
  );
};

export default UnderConstruction;
