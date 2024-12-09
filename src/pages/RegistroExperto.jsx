import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, updateDoc, onSnapshot, setDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import '../css/RegistroExperto.css';

const RegistroExpertos = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        documentType: '',
        documentNumber: '',
        email: state?.email || '',
        field: '',
        specialty: '',
        professionalLicense: '',
        phoneNumber: '',
        coordinates: { latitude: null, longitude: null },
        nearestLocation: null,
        type: 'experto'
    });

    const [categories, setCategories] = useState([]);
    const [specialties, setSpecialtiesState] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locationError, setLocationError] = useState(null);
    const [locationRequested, setLocationRequested] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Se asume que la colección que contiene el campo y las subcategorías es "specialties"
                const specialtiesSnapshot = await getDocs(collection(db, "specialties"));
                const specialtiesData = specialtiesSnapshot.docs.map(doc => doc.data());
                setCategories(specialtiesData);

                const locationsSnapshot = await getDocs(collection(db, "locations"));
                const locData = locationsSnapshot.docs.map((doc) => doc.data());
                setLocations(locData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
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
                        field: userData.field || '',
                        specialty: userData.specialty || '',
                        professionalLicense: userData.professionalLicense || '',
                        phoneNumber: userData.phoneNumber || '',
                        coordinates: userData.coordinates || { latitude: null, longitude: null },
                        nearestLocation: userData.nearestLocation || null,
                        type: userData.type || 'experto',
                    });
                }
            });

            return () => unsubscribe();
        }
    }, [navigate, state?.email, locations]);

    useEffect(() => {
        if (formData.field) {
            const selectedCategory = categories.find(cat => cat.field === formData.field);
            if (selectedCategory) {
                setSpecialtiesState(selectedCategory.subcategories);
            } else {
                setSpecialtiesState([]);
            }
        } else {
            setSpecialtiesState([]);
        }
    }, [formData.field, categories]);

    useEffect(() => {
        // Una vez que haya cargado todo (loading = false) y no se haya solicitado ubicación, mostrar el alert y solicitar ubicación
        if (!loading && !locationRequested) {
            alert("Chambi necesita conocer tu ubicación para funcionar correctamente :D");
            obtenerUbicacion();
            setLocationRequested(true);
        }
    }, [loading, locationRequested]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "professionalLicense") {
            const valueUpper = value.toUpperCase();
            if (valueUpper.length > 10) {
                alert("La matrícula profesional debe tener máximo 10 caracteres.");
                return;
            }
            setFormData({ ...formData, [name]: valueUpper });
        } else {
            setFormData({ ...formData, [name]: value });
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
        return R * c;
    };

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

    const handleSubmit = async () => {
        // Validaciones
        if (!formData.coordinates.latitude || !formData.coordinates.longitude) {
            alert("Debes permitir la ubicación antes de registrarte.");
            return;
        }

        if (formData.phoneNumber.length !== 10) {
            alert("El número de teléfono debe tener 10 dígitos.");
            return;
        }

        const professionalLicense = formData.professionalLicense.toUpperCase();
        if (professionalLicense.length < 6) {
            alert("La matrícula profesional debe tener al menos 6 caracteres.");
            return;
        } else if (professionalLicense.length > 10) {
            alert("La matrícula profesional debe tener máximo 10 caracteres.");
            return;
        }

        const user = auth.currentUser;
        const timestamp = serverTimestamp();

        try {
            if (user) {
                const userRef = doc(db, "users", user.uid);
                await updateDoc(userRef, {
                    ...formData,
                    professionalLicense: professionalLicense,
                    createdAt: timestamp,
                });
                alert('Registro de experto completado!');
            } else {
                const newUserRef = doc(collection(db, "users"));
                await setDoc(newUserRef, {
                    ...formData,
                    role: "experto",
                    createdAt: timestamp,
                    professionalLicense: professionalLicense,
                });
                alert("Registro completado. Por favor, inicia sesión.");
            }
            navigate("/");
        } catch (error) {
            console.error("Error al registrar:", error);
            alert("Error al registrar. Inténtalo de nuevo.");
        }
    };

    if (loading) {
        return <div className="registro-experto-container">Cargando...</div>;
    }

    return (
        <div className="registro-experto-container">
            <div className="registro-experto-card">
                {locationError && <div className="error-message">{locationError}</div>}

                <h1>Completa tu registro como experto</h1>
                <form className="registro-experto-form" onSubmit={(e) => e.preventDefault()}>
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

                    <label htmlFor="email">Correo electrónico</label>
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

                    <label htmlFor="field">Campo</label>
                    <select
                        id="field"
                        name="field"
                        value={formData.field}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un campo</option>
                        {categories.map((category) => (
                            <option key={category.field} value={category.field}>
                                {category.field}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="specialty">Especialidad</label>
                    <select
                        id="specialty"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        required
                    >
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

                    <button
                        type="button"
                        className="green-button"
                        onClick={handleSubmit}
                    >
                        Registrarme
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistroExpertos;
