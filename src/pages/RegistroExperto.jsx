import React, { useState } from 'react';
import '../css/RegistroExperto.css';


const RegistroExpertos = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        tipoDocumento: '',
        numeroDocumento: '',
        especialidades: '',
        serviciosOfrecidos: '',
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
        console.log('Datos del experto:', formData);
        alert('Registro de experto enviado');
    };

    return (
        <div className="registro-expertos-container">
            <h1>Regístrate como Experto</h1>
            <form onSubmit={handleSubmit} className="registro-expertos-form">
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
                    Especialidades
                    <input
                        type="text"
                        name="especialidades"
                        value={formData.especialidades}
                        onChange={handleChange}
                        placeholder="Ej: Plomería, Electricidad"
                    />
                </label>
                <label>
                    Servicios que Ofreces
                    <input
                        type="text"
                        name="serviciosOfrecidos"
                        value={formData.serviciosOfrecidos}
                        onChange={handleChange}
                        placeholder="Ej: Reparación de grifos, Instalación eléctrica"
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
                <button type="submit" className="registro-expertos-submit">
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default RegistroExpertos;
