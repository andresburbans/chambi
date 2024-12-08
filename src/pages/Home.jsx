import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainButton from '../components/MainButton';
import '../css/Home.css';

const Home = () => {
    const [view, setView] = useState(null);

    const handleServiceClick = () => (window.location.href = '/signup?type=client');
    const handleSpecialistClick = () => (window.location.href = '/signup?type=expert');

    return (
        <div className="home">
            <Header />
            <div className="intro-box">
                <p className="intro-text">Encuentra la persona ideal para resolver tus necesidades, rápido y cerca de ti.</p>
                <div className="button-container">
                    <MainButton label="Servicios" onClick={handleServiceClick} />
                    <MainButton label="Especialistas" onClick={handleSpecialistClick} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
