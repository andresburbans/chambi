// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para navegación interna
import '../css/Header.css'; // Asegúrate de que la ruta es correcta
import logo from '../pages/chambi-logo.png'; // Importa el logo de Chambi

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                {/* Logo y Nombre de Chambi enlazados al Home */}
                <Link to="/" className="chambi-link">
                    <img src={logo} alt="Chambi Logo" className="chambi-logo" />
                    <h1 className="chambi-title">Chambi</h1>
                </Link>
            </div>
            <div className="header-right">
                {/* Enlaces de navegación */}
                <Link to="/" className="nav-link inicio">Inicio</Link>
                <Link to="/nosotros" className="nav-link about">Nosotros</Link>
                <Link to="/search" className="nav-link buscar-servicios">Buscar servicios</Link>
                <Link to="/add-servicio" className="nav-link offer-services">Perfi de usuario</Link>
                <Link to="/signup" className="nav-link log-in">Iniciar sesión</Link>
                <Link to="/signup" className="nav-link unirse">Unirse</Link>
            </div>
        </header>
    );
};

export default Header;
