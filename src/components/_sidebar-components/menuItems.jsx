import { IoAddCircleOutline, IoSearchOutline } from 'react-icons/io5';
import { HiOutlineInboxIn } from 'react-icons/hi';
import { TbMessage, TbMessages, TbMessage2Pin } from 'react-icons/tb';
import { PiCalendarStarDuotone } from 'react-icons/pi';
import { BsCalendar4Event } from 'react-icons/bs';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { FaRegCalendarCheck } from 'react-icons/fa6';
import { GoProjectRoadmap } from 'react-icons/go';

const menuItems = [
  {
    name: 'Add event',
    icon: IoAddCircleOutline,
    link: '/app/add-event',
  },
  {
    name: 'Add task',
    icon: IoAddCircleOutline,
    link: '/app/add-task',
  },
  {
    name: 'Search',
    icon: IoSearchOutline,
    link: '/app/search',
  },
  // {
  //   name: 'Inbox',
  //   icon: HiOutlineInboxIn,
  //   link: '#',
  //   subMenu: [
  //     {
  //       name: 'User messages',
  //       icon: TbMessage,
  //       link: '/app/inbox/user-messages',
  //     },
  //     {
  //       name: 'Team messages',
  //       icon: TbMessages,
  //       link: '/app/inbox/team-messages',
  //     },
  //     {
  //       name: 'Vendor messages',
  //       icon: TbMessage2Pin,
  //       link: '/app/inbox/vendor-messages',
  //     },
  //     {
  //       name: 'RSVP tracking',
  //       icon: PiCalendarStarDuotone,
  //       link: '/app/inbox/rsvp-tracking',
  //     },
  //   ],
  // },
  {
    name: 'Today',
    icon: BsCalendar4Event,
    link: '/app/today',
  },
  {
    name: 'Upcoming',
    icon: MdOutlineCalendarMonth,
    link: '/app/upcoming',
  },
  {
    name: 'Completed',
    icon: FaRegCalendarCheck,
    link: '/app/completed',
  },
  {
    name: 'Personal Projects',
    icon: GoProjectRoadmap,
    link: '/app/personal-projects',
  },
];

export default menuItems;
