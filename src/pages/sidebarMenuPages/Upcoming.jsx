import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, addDays, isToday, isTomorrow } from 'date-fns';

import Overdue from '../../components/Overdue';
import { FaChevronDown } from 'react-icons/fa';
import UpcomingTasks from './_components/UpcomingTasks';

const Upcoming = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dates, setDates] = useState([selectedDate]); // Start with the selected date
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  const handleDateChange = date => {
    setSelectedDate(date);
    setDates([date]); // Reset the dates when a new date is selected
    setIsDatePickerOpen(false); // Close date picker after selecting a date
  };

  // Function to load more dates (10 at a time)
  const loadMoreDates = () => {
    setLoading(true);
    const lastDate = dates[dates.length - 1];
    const newDates = Array.from({ length: 10 }, (_, i) =>
      addDays(lastDate, i + 1)
    );
    setDates(prevDates => [...prevDates, ...newDates]);
    setLoading(false);
  };

  // Intersection Observer callback to trigger loading more dates
  const observerCallback = entries => {
    if (entries[0].isIntersecting && !loading) {
      loadMoreDates();
    }
  };

  useEffect(() => {
    // Set up Intersection Observer
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [dates, loading]);

  // Function to format the date string based on comparison
  const formatDateLabel = date => {
    if (isToday(date)) {
      return 'Today';
    } else if (isTomorrow(date)) {
      return 'Tomorrow';
    } else if (date.getTime() > Date.now()) {
      return format(date, 'EEEE, MMMM dd yyyy'); // Show day of the week for future dates
    } else {
      return format(date, 'MMMM dd yyyy'); // Default format for other dates
    }
  };

  return (
    <div className="w-full lg:py-10 py-1 lg:px-8 px-4">
      {/* Header Section */}
      <div className="">
        <div className="flex flex-row items-center gap-2 cursor-pointer mb-4">
          <h1 className="lg:text-2xl text-xl font-bold flex items-center">
            Upcoming
          </h1>
        </div>
      </div>

      {/* dates */}
      {/* <div className="mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="flex justify-center items-center gap-2 font-semibold text-sm"
          >
            {format(selectedDate, 'MMMM, yyyy')}
            <FaChevronDown className="mr-2 text-slate-600 w-3" />
          </button>
        </div>
        {isDatePickerOpen && (
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
          />
        )}
      </div> */}

      {/* overdue */}
      <div className="mb-8">
        {/* <Overdue /> */}
        <UpcomingTasks />
      </div>

      <div>
        <div>
          {dates.map((date, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center border-b border-b-gray">
                <p>{formatDateLabel(date)}</p>
              </div>
              <div className="flex flex-col space-y-1 py-2 px-4">
                <Link
                  to="/app/add-task"
                  className="text-sm text-slate-600 hover:text-primary"
                >
                  + Add task
                </Link>
                <Link
                  to="/app/add-event"
                  className="text-sm text-slate-600 hover:text-primary"
                >
                  + Add event
                </Link>
              </div>
            </div>
          ))}
          {/* Loading spinner */}
          {loading && <p>Loading more dates...</p>}
          {/* Observer element */}
          <div ref={observerRef} className="h-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
