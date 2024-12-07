import React from 'react';
import '../css/About.css'; // Ajusta la ruta para apuntar a la carpeta css
import Footer from '../components/Footer';

const About = () => {
    return (
        <div className="about">
            <header className="header">
                <h1>Acerca de Chambi</h1>
            </header>
            <main className="main">
                <p>Chambi es una plataforma que conecta a clientes con expertos en diversos servicios.</p>
                <p>Se creó para facilitar la búsqueda de servicios profesionales de manera rápida y confiable.</p>
            </main>
            <Footer />
        </div>
    );
};

export default About;