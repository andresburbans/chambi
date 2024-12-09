import React from 'react';
import '../css/PerfilCliente.css'; // Asegúrate de que la ruta sea correcta

const PerfilCliente = () => {
    // Ejemplo de datos, luego puedes reemplazarlos con datos reales del usuario
    const userData = {
        firstName: "Juan",
        lastName: "Pérez",
        email: "juanperez@example.com",
        documentType: "C.C",
        documentNumber: "123456789",
        phoneNumber: "3123456789",
        coordinates: { latitude: 3.4516, longitude: -76.5319 },
        nearestLocation: "CN01"
    };

    return (
        <div className="perfil-cliente-container">
            <div className="perfil-cliente-card">
                <h1>Perfil del Cliente</h1>
                <div className="perfil-cliente-info">
                    <p><strong>Nombre:</strong> {userData.firstName} {userData.lastName}</p>
                    <p><strong>Correo:</strong> {userData.email}</p>
                    <p><strong>Tipo de Documento:</strong> {userData.documentType}</p>
                    <p><strong>Número de Documento:</strong> {userData.documentNumber}</p>
                    <p><strong>Teléfono:</strong> {userData.phoneNumber}</p>
                    <p><strong>Ubicación Aproximada:</strong> {userData.coordinates.latitude}, {userData.coordinates.longitude}</p>
                    <p><strong>Comuna Cercana:</strong> {userData.nearestLocation}</p>
                </div>
            </div>
        </div>
    );
};

export default PerfilCliente;
