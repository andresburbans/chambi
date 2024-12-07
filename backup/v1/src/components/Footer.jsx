import React from 'react';
import '../css/Footer.css'; // Ajusta la ruta para apuntar a la carpeta css

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="social-icons">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <img src="https://img.icons8.com/fluency-systems-regular/48/instagram-new.png" alt="Instagram" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <img src="https://img.icons8.com/fluency-systems-regular/48/github.png" alt="GitHub" />
                    </a>
                    <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                        <img src="https://img.icons8.com/?size=100&id=6Fsj3rv2DCmG&format=png&color=000000" alt="X" />
                    </a>
                </div>
                <p>© 2024 Chambi. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;