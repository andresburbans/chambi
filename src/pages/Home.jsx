// src/pages/Home.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para navegación interna
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainButton from '../components/MainButton';
import '../css/Home.css';

const Home = () => {
    const navigate = useNavigate();

    // Función para manejar el clic en "Buscar un servicio"
    const handleServiceClick = () => {
        navigate('/signup?type=client'); // Redirige a la página de registro como cliente
    };

    // Función para manejar el clic en "Soy un especialista"
    const handleSpecialistClick = () => {
        navigate('/signup?type=expert'); // Redirige a la página de registro como especialista
    };

    return (
        <div className="home">
            <Header />
            <div className="intro-box">
                <p className="intro-text">
                    Encuentra la persona ideal para resolver tus necesidades, rápido y cerca de ti.
                </p>
                <div className="button-container">
                    {/* Botón para buscar un servicio */}
                    <MainButton label="Buscar un servicio" onClick={handleServiceClick} />
                    {/* Botón para registrarse como especialista */}
                    <MainButton label="Soy un especialista" onClick={handleSpecialistClick} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
