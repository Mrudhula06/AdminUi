import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by name, email or role"
      value={searchTerm}
      onChange={onSearch}
      className="search-bar"
    />
  );
};

export default SearchBar;