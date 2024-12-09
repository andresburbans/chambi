import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header-perfil.css';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <header className="header-container">
            <div className="header-left">
                <Link to="/">Chambi</Link>
            </div>
            <div className="header-right">
                <div className="user-profile" onClick={toggleMenu}>
                    Perfil de Usuario
                </div>
                {showMenu && (
                    <div className="dropdown-menu">
                        <Link to="/perfil-cliente">Perfil Cliente</Link>
                        <Link to="/perfil-experto">Perfil Experto</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
