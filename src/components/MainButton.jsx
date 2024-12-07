import React from 'react';

const MainButton = ({ onClick, text }) => {
    return (
        <button onClick={onClick} className="main-button">
            {text}
        </button>
    );
};

export default MainButton;
