import React from 'react';
import Header from '../components/Header-perfil';
import Footer from '../components/Footer';
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
        <div>
            <Header />
            <div className="paerifleel-clientee-containera">

                <div className="paerifleel-clientee-caard">
                    <h1 className="paerifleel-clientee-title">Perfil del Cliente</h1>
                    <div className="paerifleel-clientee-infoo">
                        <p><strong>Nombre:</strong> {userData.firstName} {userData.lastName}</p>
                        <p><strong>Correo:</strong> {userData.email}</p>
                        <p><strong>Tipo Documento:</strong> {userData.documentType}</p>
                        <p><strong>Número Documento:</strong> {userData.documentNumber}</p>
                        <p><strong>Teléfono:</strong> {userData.phoneNumber}</p>
                        <p><strong>Ubicación Aproximada:</strong> {userData.coordinates.latitude}, {userData.coordinates.longitude}</p>
                        <p><strong>Comuna Cercana:</strong> {userData.nearestLocation}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PerfilCliente;
