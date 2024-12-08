import React, { useState } from 'react';
import '../css/RegistroCliente.css';

const RegistroClientes = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        tipoDocumento: '',
        numeroDocumento: '',
        fotoPerfil: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, fotoPerfil: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del cliente:', formData);
        alert('Registro de cliente enviado');
    };

    return (
        <div className="registro-clientes-container">
            <h1>Regístrate como Cliente</h1>
            <form onSubmit={handleSubmit} className="registro-clientes-form">
                <label>
                    Nombre
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Ingresa tu nombre"
                    />
                </label>
                <label>
                    Apellido
                    <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                        placeholder="Ingresa tu apellido"
                    />
                </label>
                <label>
                    Correo Electrónico
                    <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                        placeholder="Ingresa tu correo electrónico"
                    />
                </label>
                <label>
                    Tipo de Documento
                    <select
                        name="tipoDocumento"
                        value={formData.tipoDocumento}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona...</option>
                        <option value="C.C">Cédula de Ciudadanía</option>
                        <option value="T.I">Tarjeta de Identidad</option>
                        <option value="P.P">Pasaporte</option>
                    </select>
                </label>
                <label>
                    Número de Documento
                    <input
                        type="text"
                        name="numeroDocumento"
                        value={formData.numeroDocumento}
                        onChange={handleChange}
                        required
                        placeholder="Ingresa tu número de documento"
                    />
                </label>
                <label>
                    Foto de Perfil
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </label>
                <button type="submit" className="registro-clientes-submit">
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default RegistroClientes;
