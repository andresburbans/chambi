import React from 'react';
import '../css/Header.css'; // Ajusta la ruta para apuntar a la carpeta css

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <p>Conecta, revuelve, trabaja</p>
                <h1 style={{ cursor: 'pointer' }}>Chambi</h1>
            </div>
            <div className="header-right">
                <a href="/about" target="_blank" rel="noopener noreferrer" className="about">Nosotros</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="offer-services">Ofrece tus servicios</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="log-in">Iniciar sesión</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="join">Unirse</a>
            </div>
        </header>
    );
};

export default Header;