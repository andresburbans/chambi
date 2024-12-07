import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainButton from '../components/MainButton';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import MapView from '../components/MapView';
import ResultsList from '../components/ResultsList';
import '../css/Home.css';

const Home = () => {
    const [view, setView] = useState(null);

    const handleServiceClick = () => setView('services');
    const handleSpecialistClick = () => setView('specialists');
    const handleToggleView = () => setView(view === 'services' ? 'specialists' : 'services');

    return (
        <div className="home">
            <Header />
            <div className="intro-box">
                <p className="intro-text">Encuentra la persona ideal para resolver tus necesidades, rápido y cerca de ti.</p>
                {view === null ? (
                    <div className="button-container">
                        <MainButton label="Servicios" onClick={handleServiceClick} />
                        <MainButton label="Especialistas" onClick={handleSpecialistClick} />
                    </div>
                ) : (
                    <>
                        <SearchBar onToggleView={handleToggleView} />
                        <Filters type={view} />
                        <div className="main-content">
                            <div className="results-container">
                                <ResultsList type={view} />
                            </div>
                            <div className="map-container">
                                <MapView />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Home;