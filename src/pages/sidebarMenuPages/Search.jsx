import { useState } from 'react';
import SearchModal from '../../components/SearchModal';

const Search = () => {
  const recentSearches = ['Upcoming', 'Read', 'Today']; // Replace with actual user search history
  const sidebarLinks = [
    { label: 'home', path: '/home' },
    { label: 'Inbox', path: '/inbox' },
    { label: 'Today', path: 'today' },
    { label: 'Upcoming', path: 'upcoming' },
    { label: 'Filters & Labels', path: '/filters-labels' },
  ]; // Replace with actual sidebar links

  return (
    <div className="w-full h-screen bg-slate-50 flex justify-center items-center">
      <SearchModal
        recentSearches={recentSearches}
        sidebarLinks={sidebarLinks}
      />
    </div>
  );
};

export default Search;
