import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, updateDoc, getDoc, onSnapshot, setDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import '../css/RegistroExperto.css';

const RegistroExpertos = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        tipoDocumento: '',
        numeroDocumento: '',
        email: state?.email || '',
        field: '',
        specialty: '',
        professionalLicense: '',
        phoneNumber: '',
        coordinates: { latitude: null, longitude: null },
        nearestLocation: null,
        createdAt: null,
        documentType: ''
    });

    const [fields, setFields] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const fieldsSnapshot = await getDocs(collection(db, "categories"));
                setFields(fieldsSnapshot.docs.map((doc) => doc.data()));

                const locationsSnapshot = await getDocs(collection(db, "locations"));
                setLocations(locationsSnapshot.docs.map(doc => doc.data()));

            } catch (error) {
                console.error("Error al obtener los campos:", error);
            }
        };

        fetchFields();

        const user = auth.currentUser;

        if (user) {
            const userRef = doc(db, "users", user.uid);

            const unsubscribe = onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        nombre: userData.firstName || '',
                        apellido: userData.lastName || '',
                        email: userData.email || state?.email || '', // Prioriza email de Firestore, luego del state
                        tipoDocumento: userData.documentType || '',
                        numeroDocumento: userData.documentNumber || '',
                        field: userData.field || '',
                        specialty: userData.specialty || '',
                        professionalLicense: userData.professionalLicense || '',
                        phoneNumber: userData.phoneNumber || '',
                        coordinates: userData.coordinates || { latitude: null, longitude: null },
                        nearestLocation: userData.nearestLocation || null,
                        createdAt: userData.createdAt || null
                    }));
                }
                setLoading(false);
            });

            return () => unsubscribe();
        } else {
            setLoading(false);
        }

    }, [navigate, state?.email]); // Agrega state?.email a las dependencias



    useEffect(() => {

        const fetchSpecialties = async () => {
            try {
                if (formData.field) {
                    const selectedField = fields.find((fieldItem) => fieldItem.name === formData.field);
                    if (selectedField) {
                        setSpecialties(selectedField.subcategories);
                    } else {
                        console.error("Campo no encontrado en la lista de campos:", formData.field);
                        setSpecialties([]); // O maneja el error de otra manera
                    }
                } else {
                    setSpecialties([]);
                }
            } catch (error) {
                console.error("Error al obtener las especialidades:", error);
            }
        };

        fetchSpecialties();
    }, [formData.field, fields]);



    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const obtenerUbicacion = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setFormData({ ...formData, coordinates: { latitude, longitude } });

                    // Calcular la distancia a cada ubicación y encontrar la más cercana
                    const nearest = locations.reduce((prev, curr) => {
                        const prevDist = calcularDistancia(latitude, longitude, prev.latitude, prev.longitude);
                        const currDist = calcularDistancia(latitude, longitude, curr.latitude, curr.longitude);
                        return prevDist < currDist ? prev : curr;
                    });

                    setFormData({ ...formData, nearestLocation: nearest.name });

                },
                (error) => {
                    console.error("Error al obtener la ubicación:", error);
                }
            );
        } else {
            console.error("Geolocalización no soportada por el navegador.");
        }
    };

    const calcularDistancia = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.phoneNumber.length !== 10) {
            alert("El número de teléfono debe tener 10 dígitos.");
            return;
        }

        if (!formData.coordinates.latitude || !formData.coordinates.longitude) {
            alert("Debes obtener tu ubicación antes de registrarte.");
            return;
        }

        const user = auth.currentUser;
        const timestamp = serverTimestamp();

        if (user) {
            try {
                const userRef = doc(db, "users", user.uid);

                await updateDoc(userRef, {
                    ...formData,
                    createdAt: timestamp,
                });

                console.log('Datos del experto actualizados:', formData);
                alert('Registro de experto completado!');
                navigate("/");
            } catch (error) {
                console.error("Error al actualizar datos del experto:", error);
                alert("Error al actualizar el registro");
            }
        } else {
            try {
                const newUserRef = doc(collection(db, "users"));

                await setDoc(newUserRef, {
                    ...formData,
                    role: "experto",
                    type: "experto",
                    createdAt: timestamp,
                });

                alert("Registro completado. Por favor, inicia sesión.");
                navigate("/login");
            } catch (error) {
                console.error("Error al crear el nuevo usuario (experto):", error);
                alert("Error al crear el nuevo usuario.");
            }
        }
    };

    if (loading) {
        return <div className="registro-experto-container">Cargando...</div>;
    }

    return (
        <div className="registro-experto-container">
            <div className="registro-experto-card">
                <h1>Completa tu registro como experto</h1>
                <form onSubmit={handleSubmit} className="registro-experto-form">

                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="apellido">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="tipoDocumento">Tipo de Documento</label>
                    <select
                        id="tipoDocumento"
                        name="tipoDocumento"
                        value={formData.tipoDocumento}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona...</option>
                        <option value="C.C">Cédula de Ciudadanía</option>
                        <option value="C.E">Cédula de Extranjería</option>
                        <option value="NIT">NIT</option>
                        <option value="Otro">Otro</option>
                    </select>

                    <label htmlFor="numeroDocumento">Número de Documento</label>
                    <input
                        type="text"
                        id="numeroDocumento"
                        name="numeroDocumento"
                        value={formData.numeroDocumento}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="field">Campo</label>
                    <select id="field" name="field" value={formData.field} onChange={handleChange} required>
                        <option value="">Selecciona un campo</option>
                        {fields.map((fieldItem) => (
                            <option key={fieldItem.name} value={fieldItem.name}>
                                {fieldItem.name}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="specialty">Especialidad</label>
                    <select id="specialty" name="specialty" value={formData.specialty} onChange={handleChange} required>
                        <option value="">Selecciona una especialidad</option>
                        {specialties.map((specialtyItem) => (
                            <option key={specialtyItem.id} value={specialtyItem.name}>
                                {specialtyItem.name}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="professionalLicense">Número de Tarjeta Profesional</label>
                    <input
                        type="text"
                        id="professionalLicense"
                        name="professionalLicense"
                        value={formData.professionalLicense}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="phoneNumber">Número de Teléfono</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        required
                        placeholder="10 dígitos"
                    />

                    <button type="button" onClick={obtenerUbicacion}>Obtener Ubicación</button>

                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
};

export default RegistroExpertos;