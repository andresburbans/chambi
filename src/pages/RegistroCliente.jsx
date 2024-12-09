import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, updateDoc, getDoc, onSnapshot, setDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import '../css/RegistroCliente.css';

const RegistroClientes = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        tipoDocumento: '',
        numeroDocumento: '',
        email: state?.email || '',
        phoneNumber: '',
        coordinates: { latitude: null, longitude: null },
        nearestLocation: null,
        createdAt: null
    });
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const locationsSnapshot = await getDocs(collection(db, "locations"));
                setLocations(locationsSnapshot.docs.map(doc => doc.data()));
            } catch (error) {
                console.error("Error al obtener los campos:", error);
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
                        nombre: userData.firstName || '',
                        apellido: userData.lastName || '',
                        email: userData.email || state?.email || '',
                        tipoDocumento: userData.documentType || '',
                        numeroDocumento: userData.documentNumber || '',
                        phoneNumber: userData.phoneNumber || '',
                        coordinates: userData.coordinates || { latitude: null, longitude: null },
                        nearestLocation: userData.nearestLocation || null,
                        createdAt: userData.createdAt || null
                    });
                }
                setLoading(false);
            });

            return () => unsubscribe();
        } else {
            setLoading(false);
        }
    }, [navigate, state?.email]);

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

                    const nearest = locations.reduce((prev, curr) => {
                        const prevDist = calcularDistancia(latitude, longitude, prev.latitude, prev.longitude)
                        const currDist = calcularDistancia(latitude, longitude, curr.latitude, curr.longitude)
                        return prevDist < currDist ? prev : curr;
                    })
                    setFormData({ ...formData, nearestLocation: nearest.name });

                },
                (error) => {
                    console.error("Error al obtener la ubicación:", error);

                }
            );

        } else {
            console.error("Geolocalización no soportada por el navegador.");

        }
    }
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
                    createdAt: timestamp
                });

                console.log('Datos del cliente actualizados:', formData);
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
                <h1>Completa tu registro</h1>
                <form onSubmit={handleSubmit} className="registro-cliente-form">
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

                    <label htmlFor="email">Correo Electrónico</label>
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

                    <button type="button" onClick={obtenerUbicacion}>Obtener Ubicación</button>

                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
};

export default RegistroClientes;