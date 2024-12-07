import React from 'react';
import '../css/Filters.css';

const Filters = ({ type }) => (
    <div className="filters">
        {type === 'services' ? (
            <>
                <select className="filter">
                    <option>Categoriasy</option>
                    <option>Cleaning</option>
                    <option>Plumbing</option>
                    <option>Landscaping</option>
                    <option>Moving</option>
                </select>
                <select className="filter">
                    <option>Servicios</option>
                    <option>Cleaning</option>
                    <option>Plumbing</option>
                    <option>Landscaping</option>
                    <option>Moving</option>
                </select>
                <select className="filter">
                    <option>Price Range</option>
                    <option>Under $50</option>
                    <option>$50 - $100</option>
                    <option>Above $100</option>
                </select>
                <select className="filter">
                    <option>Rating (1-5 stars)</option>
                    <option>1 Star</option>
                    <option>2 Stars</option>
                    <option>3 Stars</option>
                    <option>4 Stars</option>
                    <option>5 Stars</option>
                </select>
            </>
        ) : (
            <>
                <select className="filter">
                    <option>Campos</option>
                    <option>Architecture</option>
                    <option>Construction</option>
                    <option>Day Laborers</option>
                    <option>Electricity</option>
                    <option>Electronics</option>
                    <option>Legal</option>
                </select>
                <select className="filter">
                    <option>Specialista</option>
                    <option>Architect</option>
                    <option>Civil Engineer</option>
                    <option>Surveyor</option>
                    <option>Electrician</option>
                    <option>Plumber</option>
                </select>
                <select className="filter">
                    <option>Calificaión (1-5 stars)</option>
                    <option>1 Star</option>
                    <option>2 Stars</option>
                    <option>3 Stars</option>
                    <option>4 Stars</option>
                    <option>5 Stars</option>
                </select>
            </>
        )}
    </div>
);

export default Filters;