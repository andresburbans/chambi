import React from 'react';
import '../css/ResultsList.css';

const ResultsList = ({ type }) => (
    <div className="results-list">
        {type === 'services' ? (
            <>
                <div className="result-card">Service 1</div>
                <div className="result-card">Service 2</div>
                <div className="result-card">Service 3</div>
            </>
        ) : (
            <>
                <div className="result-card">Specialist 1</div>
                <div className="result-card">Specialist 2</div>
                <div className="result-card">Specialist 3</div>
            </>
        )}
    </div>
);

export default ResultsList;