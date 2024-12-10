import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/Header.css';
import '../css/Footer.css';
import '../css/About.css'; // Asegúrate de que este CSS exista y tenga el nuevo estilo.

const About = () => {
    return (
        <div className="about-page">
            <Header />
            <main className="about-container">
                <section className="about-section">
                    <h1>Conecta Clientes y Expertos Cercanos</h1>
                    <p>
                        <strong>Chambi</strong> es una plataforma de información geográfica que une a los habitantes de Cali, Colombia, con expertos en servicios profesionales a domicilio. A través de geolocalización precisa y una experiencia centrada en la confianza, <strong>Chambi</strong> simplifica la búsqueda de profesionales, fomenta la formalización laboral y agiliza el contacto entre clientes y expertos.
                    </p>
                    <p>
                        Inspirada en plataformas internacionales como TaskRabbit y Thumbtack, <strong>Chambi</strong> ofrece transparencia, seguridad y una interfaz intuitiva que optimiza la oferta y la demanda de servicios locales.
                        <p> Puedes acceder atraves del siguiente vinculo: Hosting URL: https://chambi-pro.web.app

                            <p>Actualmente la base de datos solo esta poblada para ejemplos con la comuna 1 y para la categoria de servicios, serivicos de "reparacion y mantenimiento" y "Reparacion de electrodomesticos"</p>
                        </p>
                    </p>
                </section>

                <section className="about-section">
                    <h2>El Problema</h2>
                    <p>
                        Actualmente, encontrar expertos confiables en Cali es un desafío. La información dispersa en canales informales genera desconfianza, demora y complicaciones. <strong>Chambi</strong> resuelve este problema centralizando la información y priorizando la eficiencia, la precisión y la credibilidad.
                    </p>
                </section>

                <section className="about-section">
                    <h2>Características Destacadas</h2>
                    <ul>
                        <li><strong>Geolocalización Precisa:</strong> Muestra expertos cercanos según la ubicación del cliente.</li>
                        <li><strong>Perfiles Verificados:</strong> Habilidades, certificaciones, tarifas y valoraciones en un solo lugar.</li>
                        <li><strong>Búsqueda Personalizada:</strong> Filtros por tipo de servicio, disponibilidad y rango de precios.</li>
                        <li><strong>Interfaz Intuitiva:</strong> Mapas dinámicos y listas ordenadas por cercanía.</li>
                        <li><strong>Base de Datos Escalable:</strong> Integración con Firebase para seguridad y flexibilidad.</li>
                        <li><strong>Seguridad y Privacidad:</strong> Autenticación y protección de datos personales.</li>
                    </ul>
                </section>

                <section className="about-section">
                    <h2>Estado del Proyecto</h2>
                    <p>
                        Aún sin un despliegue público, <strong>Chambi</strong> ya está completamente integrado con Firebase Hosting, listo para una puesta en marcha rápida y confiable. Su arquitectura modular permite añadir funciones futuras, como pagos en línea, soporte multiidioma y análisis avanzados, manteniendo siempre la experiencia del usuario en el centro.
                    </p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default About;
