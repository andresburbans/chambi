import React, { useState } from 'react';
import '../css/Header.css';

const Header = () => {
    const [showPerfilMenu, setShowPerfilMenu] = useState(false);

    const togglePerfilMenu = () => {
        setShowPerfilMenu(!showPerfilMenu);
    };

    return (
        <header className="header-container">
            <div className="header-left">
                <a href="/">Chambi</a>
            </div>
            <div className="header-center">
                <a href="/">Inicio</a>
                <a href="/search">Buscar Servicios</a>
            </div>
            <div className="header-right">
                <div className="perfil-container" onClick={togglePerfilMenu}>
                    Perfil
                    {showPerfilMenu && (
                        <div className="perfil-dropdown">
                            <a href="/perfil-cliente">Perfil de Usuario</a>
                            <a href="/perfil-experto">Perfil de Experto</a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
