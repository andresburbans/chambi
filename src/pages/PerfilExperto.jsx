import React from 'react';
import '../css/PerfilExperto.css';
import { useNavigate } from 'react-router-dom';

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
        nearestLocation: "CN02"
    };

    const navigate = useNavigate();

    const handleAddServicio = () => {
        navigate('/add-servicio');
    };

    const handleAddEspecialidad = () => {
        navigate('/add-especialidad');
    };

    return (
        <div className="perfil-experto-container">
            <div className="perfil-experto-card">
                <h1>Perfil del Experto</h1>
                <div className="perfil-experto-info">
                    <p><strong>Nombre:</strong> {expertData.firstName} {expertData.lastName}</p>
                    <p><strong>Correo:</strong> {expertData.email}</p>
                    <p><strong>Tipo de Documento:</strong> {expertData.documentType}</p>
                    <p><strong>Número de Documento:</strong> {expertData.documentNumber}</p>
                    <p><strong>Teléfono:</strong> {expertData.phoneNumber}</p>
                    <p><strong>Campo:</strong> {expertData.field}</p>
                    <p><strong>Especialidad:</strong> {expertData.specialty}</p>
                    <p><strong>Matrícula Profesional:</strong> {expertData.professionalLicense || "No verificado"}</p>
                    <p><strong>Ubicación Aproximada:</strong> {expertData.coordinates.latitude}, {expertData.coordinates.longitude}</p>
                    <p><strong>Comuna Cercana:</strong> {expertData.nearestLocation}</p>
                </div>
                <div className="perfil-experto-actions">
                    <button onClick={handleAddServicio}>Agregar un Servicio</button>
                    <button onClick={handleAddEspecialidad}>Agregar una Especialidad</button>
                </div>
            </div>
        </div>
    );
};

export default PerfilExperto;
