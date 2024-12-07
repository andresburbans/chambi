import React from 'react';
import '../css/MainButton.css';

const MainButton = ({ label, onClick }) => (
    <button className="main-button" onClick={onClick}>
        {label}
    </button>
);

export default MainButton;
