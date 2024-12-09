import React from 'react';
import Header from '../components/Header-perfil';
import Footer from '../components/Footer';
import '../css/PerfilExperto.css';

const PerfilExperto = () => {
    // Datos de ejemplo del experto (puedes reemplazar con datos reales)
    const expertData = {
        firstName: "Ana",
        lastName: "Gómez",
        email: "anagomez@example.com",
        documentType: "C.C",
        documentNumber: "987654321",
        phoneNumber: "3167891234",
        field: "Ingeniería y Construcción",
        specialty: "Ingeniería Civil",
        professionalLicense: "ABC1234",
        coordinates: { latitude: 3.4526, longitude: -76.5419 },
        nearestLocation: "CN02",
        avatar: "https://via.placeholder.com/150" // Imagen de avatar de ejemplo
    };

    const handleAddServicio = () => {
        // Navegar a agregar servicio
        window.location.href = '/add-servicio';
    };

    const handleAddEspecialidad = () => {
        // Navegar a agregar especialidad
        window.location.href = '/add-especialidad';
    };

    return (
        <div className="paerifeela-expertao-containera">
            <Header />
            <main className="paerifeela-expertao-hero">
                <div className="paerifeela-expertao-profile-card">
                    <div className="paerifeela-expertao-profile-top">
                        <img
                            className="paerifeela-expertao-avatar"
                            src={expertData.avatar}
                            alt={`${expertData.firstName} ${expertData.lastName}`}
                        />
                        <h1 className="paerifeela-expertao-name">{expertData.firstName} {expertData.lastName}</h1>
                        <p className="paerifeela-expertao-field">{expertData.field} - {expertData.specialty}</p>
                    </div>
                    <div className="paerifeela-expertao-profile-info">
                        <div className="paerifeela-expertao-info-item">
                            <strong>Correo:</strong> {expertData.email}
                        </div>
                        <div className="paerifeela-expertao-info-item">
                            <strong>Tipo Documento:</strong> {expertData.documentType}
                        </div>
                        <div className="paerifeela-expertao-info-item">
                            <strong>Documento:</strong> {expertData.documentNumber}
                        </div>
                        <div className="paerifeela-expertao-info-item">
                            <strong>Teléfono:</strong> {expertData.phoneNumber}
                        </div>
                        <div className="paerifeela-expertao-info-item">
                            <strong>Matrícula Prof.:</strong> {expertData.professionalLicense || "No verificado"}
                        </div>
                        <div className="paerifeela-expertao-info-item">
                            <strong>Ubicación Aproximada:</strong> {expertData.coordinates.latitude}, {expertData.coordinates.longitude}
                        </div>
                        <div className="paerifeela-expertao-info-item">
                            <strong>Comuna Cercana:</strong> {expertData.nearestLocation}
                        </div>
                    </div>
                    <div className="paerifeela-expertao-actions">
                        <button onClick={handleAddServicio}>Agregar un Servicio</button>
                        <button onClick={handleAddEspecialidad}>Agregar una Especialidad</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PerfilExperto;
