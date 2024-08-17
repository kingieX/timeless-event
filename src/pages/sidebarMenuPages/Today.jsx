// import { useState, useEffect, useRef } from 'react';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import { IoCheckmarkCircleOutline } from 'react-icons/io5';

// import DateTimePicker from '../../components/DateTimePicker';
// import TaskCard from '../../components/TaskCard';

// const Today = () => {
//   const [showTasks, setShowTasks] = useState(true);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const datePickerRef = useRef(null);

//   // eslint-disable-next-line no-unused-vars
//   const [tasks, setTasks] = useState([
//     {
//       id: 1,
//       title: 'Browse the Todoist Inspiration Hub',
//       description: 'For productivity advice and to sign up for our newsletter',
//       dueDate: 'Jul 26',
//       statusColor: 'bg-gray-400',
//       location: 'Inbox',
//     },
//     {
//       id: 2,
//       title: 'Join existing team projects',
//       description: '',
//       dueDate: 'Jul 27',
//       statusColor: 'bg-red-500',
//       location: 'Inbox / Welcome to Heliscom',
//     },
//     // Add more tasks as needed
//   ]);

//   const toggleTasks = () => setShowTasks(!showTasks);
//   const toggleDatePicker = () => setShowDatePicker(!showDatePicker);

//   // Handle click outside logic
//   useEffect(() => {
//     const handleClickOutside = event => {
//       if (
//         datePickerRef.current &&
//         !datePickerRef.current.contains(event.target)
//       ) {
//         setShowDatePicker(false);
//       }
//     };

//     if (showDatePicker) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showDatePicker]);

//   return (
//     <div className="w-full h-screen lg:p-10 py-6 lg:px-8 px-4">
//       {/* Header Section */}
//       <div className="flex">
//         <div className="flex flex-col lg:gap-2">
//           <h1 className="lg:text-2xl text-xl font-bold flex items-center">
//             Today
//           </h1>
//           <div className="flex justify-start items-center space-x-2">
//             <IoCheckmarkCircleOutline className="text-slate-500" />
//             <p className="text-slate-600">7 tasks</p>
//           </div>
//         </div>
//       </div>

//       {/* Overdue Section */}
//       <div className="mt-4">
//         <div className="flex items-center justify-between border-b border-b-gray">
//           <div
//             className="flex items-center cursor-pointer"
//             onClick={toggleTasks}
//           >
//             {showTasks ? (
//               <FaChevronUp className="mr-2 text-slate-600 w-3" />
//             ) : (
//               <FaChevronDown className="mr-2 text-slate-600 w-3" />
//             )}
//             <span className="lg:text-sm text-sm font-semibold">Overdue</span>
//           </div>
//           <button
//             onClick={toggleDatePicker}
//             className="text-primary px-2 py-2 text-sm font-semibold hover:bg-blue-100"
//           >
//             Reschedule tasks
//           </button>
//         </div>

//         {showDatePicker && (
//           <div className="mt-4 relative" ref={datePickerRef}>
//             <DateTimePicker
//               selectedDate={selectedDate}
//               setSelectedDate={setSelectedDate}
//             />
//           </div>
//         )}

//         {showTasks && (
//           <div className="mt-">
//             {tasks.map(task => (
//               <TaskCard key={task.id} task={task} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Today;

import { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

import DateTimePicker from '../../components/DateTimePicker';
import TaskCard from '../../components/TaskCard';

const Today = () => {
  const [showTasks, setShowTasks] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const datePickerRef = useRef(null);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Browse the Todoist Inspiration Hub',
      description: 'For productivity advice and to sign up for our newsletter',
      dueDate: 'Jul 26',
      statusColor: 'bg-gray-400',
      location: 'Inbox',
    },
    {
      id: 2,
      title: 'Join existing team projects',
      description: '',
      dueDate: 'Jul 27',
      statusColor: 'bg-red-500',
      location: 'Inbox / Welcome to Heliscom',
    },
    {
      id: 3,
      title: 'Create a new project',
      description: '',
      dueDate: 'Jul 28',
      statusColor: 'bg-blue-500',
      location: 'Inbox / Welcome to Heliscom',
    },
    {
      id: 4,
      title: 'Set reminders for tasks',
      description: '',
      dueDate: 'Jul 29',
      statusColor: 'bg-green-500',
      location: 'Inbox / Welcome to Heliscom',
    },
    // Add more tasks as needed
  ]);

  const toggleTasks = () => setShowTasks(!showTasks);
  const toggleDatePicker = () => setShowDatePicker(!showDatePicker);

  // Handle click outside logic
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };

    if (showDatePicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker]);

  // Function to move a task up in the list
  const moveTaskUp = index => {
    if (index > 0) {
      const newTasks = [...tasks];
      const temp = newTasks[index];
      newTasks[index] = newTasks[index - 1];
      newTasks[index - 1] = temp;
      setTasks(newTasks);
    }
  };

  // Function to move a task down in the list
  const moveTaskDown = index => {
    if (index < tasks.length - 1) {
      const newTasks = [...tasks];
      const temp = newTasks[index];
      newTasks[index] = newTasks[index + 1];
      newTasks[index + 1] = temp;
      setTasks(newTasks);
    }
  };

  return (
    <div className="w-full h-screen lg:p-10 py-6 lg:px-8 px-4">
      {/* Header Section */}
      <div className="flex">
        <div className="flex flex-col lg:gap-2">
          <h1 className="lg:text-2xl text-xl font-bold flex items-center">
            Today
          </h1>
          <div className="flex justify-start items-center space-x-2">
            <IoCheckmarkCircleOutline className="text-slate-500" />
            <p className="text-slate-600">7 tasks</p>
          </div>
        </div>
      </div>

      {/* Overdue Section */}
      <div className="mt-4">
        <div className="flex items-center justify-between border-b border-b-gray">
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleTasks}
          >
            {showTasks ? (
              <FaChevronUp className="mr-2 text-slate-600 w-3" />
            ) : (
              <FaChevronDown className="mr-2 text-slate-600 w-3" />
            )}
            <span className="lg:text-sm text-sm font-semibold">Overdue</span>
          </div>
          <button
            onClick={toggleDatePicker}
            className="text-primary px-2 py-2 text-sm font-semibold hover:bg-blue-100"
          >
            Reschedule tasks
          </button>
        </div>

        {showDatePicker && (
          <div className="mt-4 relative" ref={datePickerRef}>
            <DateTimePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        )}

        {showTasks && (
          <div className="mt-">
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                onMoveUp={() => moveTaskUp(index)}
                onMoveDown={() => moveTaskDown(index)}
                isFirst={index === 0}
                isLast={index === tasks.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Today;
