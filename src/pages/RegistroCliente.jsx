import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, updateDoc, onSnapshot, setDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

import '../css/RegistroCliente.css';

const RegistroClientes = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        documentType: '',
        documentNumber: '',
        email: state?.email || '',
        phoneNumber: '',
        coordinates: { latitude: null, longitude: null },
        nearestLocation: null,
        createdAt: null,
        type: 'cliente'
    });

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locationError, setLocationError] = useState(null);
    const [locationRequested, setLocationRequested] = useState(false);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const locationsSnapshot = await getDocs(collection(db, "locations"));
                const locData = locationsSnapshot.docs.map(doc => doc.data());
                setLocations(locData);
            } catch (error) {
                console.error("Error al obtener las ubicaciones:", error);
            }
        };

        fetchLocations();

        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, "users", user.uid);

            const unsubscribe = onSnapshot(userRef, (docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setFormData({
                        firstName: userData.firstName || '',
                        lastName: userData.lastName || '',
                        email: userData.email || state?.email || '',
                        documentType: userData.documentType || '',
                        documentNumber: userData.documentNumber || '',
                        phoneNumber: userData.phoneNumber || '',
                        coordinates: userData.coordinates || { latitude: null, longitude: null },
                        nearestLocation: userData.nearestLocation || null,
                        createdAt: userData.createdAt || null,
                        type: userData.type || 'cliente'
                    });
                }
                setLoading(false);
            });

            return () => unsubscribe();
        } else {
            setLoading(false);
        }
    }, [navigate, state?.email]);

    useEffect(() => {
        const obtenerUbicacion = () => {
            setLocationError(null);
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;

                        let nearestName = null;
                        if (locations.length > 0) {
                            const nearest = locations.reduce((prev, curr) => {
                                const prevDist = calcularDistancia(latitude, longitude, prev.latitude, prev.longitude);
                                const currDist = calcularDistancia(latitude, longitude, curr.latitude, curr.longitude);
                                return prevDist < currDist ? prev : curr;
                            });
                            nearestName = nearest.name;
                        }

                        setFormData((prevData) => ({
                            ...prevData,
                            coordinates: { latitude, longitude },
                            nearestLocation: nearestName
                        }));
                    },
                    (error) => {
                        console.error("Error al obtener la ubicación:", error);
                        setLocationError("No se pudo obtener tu ubicación. Asegúrate de que los servicios de ubicación estén habilitados.");
                    }
                );
            } else {
                console.error("Geolocalización no soportada por el navegador.");
                setLocationError("Tu navegador no soporta la geolocalización.");
            }
        };

        // Una vez que se haya cargado todo (loading = false) y no se haya solicitado ubicación
        if (!loading && !locationRequested) {
            alert("Chambi necesita conocer tu ubicación para funcionar correctamente :D");
            obtenerUbicacion();
            setLocationRequested(true);
        }
    }, [loading, locationRequested, locations]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function calcularDistancia(lat1, lon1, lat2, lon2) {
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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.phoneNumber && formData.phoneNumber.length !== 10) {
            alert("El número de teléfono debe tener 10 dígitos.");
            return;
        }

        if (!formData.coordinates.latitude || !formData.coordinates.longitude) {
            alert("Debes permitir la ubicación antes de registrarte.");
            return;
        }

        const user = auth.currentUser;
        const timestamp = serverTimestamp();

        if (user) {
            try {
                const userRef = doc(db, "users", user.uid);
                await updateDoc(userRef, {
                    ...formData,
                    createdAt: timestamp
                });

                alert('Registro de cliente completado!');
                navigate("/");
            } catch (error) {
                console.error("Error al actualizar datos del cliente:", error);
                alert("Error al actualizar el registro");
            }
        } else {
            try {
                const newUserRef = doc(collection(db, "users"));
                await setDoc(newUserRef, { ...formData, role: "cliente", type: "cliente", createdAt: timestamp });
                alert("Registro completado. Por favor, inicia sesión.");
                navigate("/login");
            } catch (error) {
                console.error("Error al crear el nuevo usuario:", error);
                alert("Error al crear el nuevo usuario.");
            }
        }
    };

    if (loading) {
        return <div className="registro-cliente-container">Cargando...</div>;
    }

    return (
        <div className="registro-cliente-container">
            <div className="registro-cliente-card">
                {locationError && <div className="error-message">{locationError}</div>}

                <h1>Completa tu registro</h1>
                <form onSubmit={handleSubmit} className="registro-cliente-form">
                    <label htmlFor="firstName">Nombre</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="lastName">Apellido</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="documentType">Tipo de Documento</label>
                    <select
                        id="documentType"
                        name="documentType"
                        value={formData.documentType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona...</option>
                        <option value="C.C">Cédula de Ciudadanía</option>
                        <option value="C.E">Cédula de Extranjería</option>
                        <option value="NIT">NIT</option>
                        <option value="Otro">Otro</option>
                    </select>

                    <label htmlFor="documentNumber">Número de Documento</label>
                    <input
                        type="text"
                        id="documentNumber"
                        name="documentNumber"
                        value={formData.documentNumber}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="phoneNumber">Número de Teléfono (10 dígitos)</label>
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

                    <button type="submit">Registrarme</button>
                </form>
            </div>
        </div>
    );
};

export default RegistroClientes;