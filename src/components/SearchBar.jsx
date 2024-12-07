import React from 'react';
import '../css/SearchBar.css';

const SearchBar = ({ onToggleView }) => (
    <div className="search-bar-container">
        <input type="text" className="search-bar" placeholder="Search..." />
        <button className="toggle-view-button" onClick={onToggleView}>Toggle View</button>
    </div>
);

export default SearchBar;
