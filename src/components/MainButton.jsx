// src/components/MainButton.jsx

import React from 'react';
import '../css/MainButton.css'; // Asegúrate de tener este archivo

const MainButton = ({ label, onClick }) => {
    return (
        <button className="main-button" onClick={onClick}>
            {label}
        </button>
    );
};

export default MainButton;
