/* eslint-disable react/prop-types */
// import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaRegMessage } from 'react-icons/fa6';
import { CiCalendar } from 'react-icons/ci';
import { BsCalendar2 } from 'react-icons/bs';
import { PiDotsThreeOutlineThin, PiDotsSixVerticalLight } from 'react-icons/pi';
import { IoCheckmark } from 'react-icons/io5';

const TaskCard = ({ task }) => {
  return (
    <div className="w-full flex flex-col justify-between items-start py-4 px-4 pr-8 border-b border-b-gray group relative">
      {/* first line */}
      <div className="flex -ml-8">
        <div>
          <PiDotsSixVerticalLight className="w-8 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex justify-center items-center w-5 h-5 rounded-full border">
            {/* <span className={`w-4 h-4 rounded-full ${task.statusColor}`}></span> */}
            <IoCheckmark className="w-4 h-4 cursor-pointer opacity-0 hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex justify-center items-center">
            {/* Task Title */}
            <h3 className="text-sm">{task.title}</h3>
          </div>
          {/* Hover Icons */}
          <div className="hidden lg:flex justify-center items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-0">
            <AiOutlineEdit className="text-slate-700 cursor-pointer w-6 h-6" />
            <FaRegMessage className="text-slate-700 cursor-pointer w-4 h-4" />
            <CiCalendar className="text-slate-700 cursor-pointer w-6 h-6" />
            <PiDotsThreeOutlineThin className="text-slate-700 cursor-pointer w-6 h-6" />
          </div>
        </div>
      </div>

      {/* second line */}
      <div className="mx-7 mt-1">
        <p className="text-xs text-slate-500">{task.description}</p>
      </div>

      {/* thrird line */}
      <div className="w-full flex justify-between mt-2 mx-7">
        <div className="flex items-center text-xs text-primary">
          <BsCalendar2 className="mr-1" />
          <span>{task.dueDate}</span>
        </div>
        <div className="text-xs text-slate-500">{task.location}</div>
      </div>
    </div>
  );
};

export default TaskCard;

// import { AiOutlineEdit } from 'react-icons/ai';
// import { FaRegMessage } from 'react-icons/fa6';
// import { CiCalendar } from 'react-icons/ci';
// import { BsCalendar2 } from 'react-icons/bs';
// import { PiDotsThreeOutlineThin, PiDotsSixVerticalLight } from 'react-icons/pi';
// import { IoCheckmark } from 'react-icons/io5';
// import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

// const TaskCard = ({ task, onMoveUp, onMoveDown, isFirst, isLast }) => {
//   return (
//     <div className="w-full flex flex-col justify-between items-start py-4 px-4 pr-8 border-b border-b-gray group relative">
//       {/* first line */}
//       <div className="flex -ml-8">
//         <div>
//           <PiDotsSixVerticalLight className="w-8 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
//         </div>
//         <div className="flex items-center space-x-2">
//           <div className="flex justify-center items-center w-5 h-5 rounded-full border">
//             <IoCheckmark className="w-4 h-4 cursor-pointer opacity-0 hover:opacity-100 transition-opacity" />
//           </div>
//           <div className="flex justify-center items-center">
//             <h3 className="text-sm">{task.title}</h3>
//           </div>
//           {/* Hover Icons */}
//           <div className="hidden lg:flex justify-center items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-0">
//             <AiOutlineEdit className="text-slate-700 cursor-pointer w-6 h-6" />
//             <FaRegMessage className="text-slate-700 cursor-pointer w-4 h-4" />
//             <CiCalendar className="text-slate-700 cursor-pointer w-6 h-6" />
//             <PiDotsThreeOutlineThin className="text-slate-700 cursor-pointer w-6 h-6" />
//           </div>
//         </div>
//       </div>

//       {/* Move Buttons */}
//       <div className="absolute right-0 top-4 flex space-x-1">
//         {!isFirst && (
//           <button onClick={onMoveUp}>
//             <FiArrowUp className="text-slate-700 cursor-pointer w-4 h-4" />
//           </button>
//         )}
//         {!isLast && (
//           <button onClick={onMoveDown}>
//             <FiArrowDown className="text-slate-700 cursor-pointer w-4 h-4" />
//           </button>
//         )}
//       </div>

//       {/* second line */}
//       <div className="mx-7 mt-1">
//         <p className="text-xs text-slate-500">{task.description}</p>
//       </div>

//       {/* third line */}
//       <div className="w-full flex justify-between mt-2 mx-7">
//         <div className="flex items-center text-xs text-primary">
//           <BsCalendar2 className="mr-1" />
//           <span>{task.dueDate}</span>
//         </div>
//         <div className="text-xs text-slate-500">{task.location}</div>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;
