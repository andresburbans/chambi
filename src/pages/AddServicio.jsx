import React, { useState, useEffect } from 'react';
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/AddServicio.css';

const AddServicio = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [price, setPrice] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [professionalLicense, setProfessionalLicense] = useState("");
    const [description, setDescription] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");

    const [userCoordinates, setUserCoordinates] = useState({ latitude: null, longitude: null });
    const [locations, setLocations] = useState([]);
    const [nearestLocation, setNearestLocation] = useState(null);
    const [locationRequested, setLocationRequested] = useState(false);
    const [locationError, setLocationError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesSnapshot = await getDocs(collection(db, "categories"));
                const catData = categoriesSnapshot.docs.map((doc) => doc.data());
                setCategories(catData);

                const locSnapshot = await getDocs(collection(db, "locations"));
                const locData = locSnapshot.docs.map(doc => doc.data());
                setLocations(locData);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!locationRequested) {
            alert("Chambi necesita conocer tu ubicación para funcionar correctamente :D");
            obtenerUbicacion();
            setLocationRequested(true);
        }
    }, [locationRequested]);

    const obtenerUbicacion = () => {
        setLocationError(null);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserCoordinates({ latitude, longitude });
                    const nearest = calcularNearest(latitude, longitude, locations);
                    setNearestLocation(nearest ? nearest.id : null);
                },
                (error) => {
                    console.error("Error al obtener la ubicación:", error);
                    setLocationError("No se pudo obtener tu ubicación. Asegúrate de que los servicios estén habilitados.");
                }
            );
        } else {
            console.error("Geolocalización no soportada por el navegador.");
            setLocationError("Tu navegador no soporta la geolocalización.");
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

    const calcularNearest = (lat, lon, locs) => {
        if (!locs || locs.length === 0) return null;
        let nearest = locs[0];
        let minDist = calcularDistancia(lat, lon, nearest.latitude, nearest.longitude);
        for (let i = 1; i < locs.length; i++) {
            const dist = calcularDistancia(lat, lon, locs[i].latitude, locs[i].longitude);
            if (dist < minDist) {
                minDist = dist;
                nearest = locs[i];
            }
        }
        return nearest;
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        const selectedCat = categories.find(cat => cat.name === value);
        setSubcategories(selectedCat ? selectedCat.subcategories : []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCategory || !selectedSubcategory) {
            alert("Debes seleccionar categoría y subcategoría.");
            return;
        }

        const finalDescription = description.trim() !== "" ? description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, risus quis venenatis pharetra, lorem quam volutpat diam, a condimentum ante velit eu justo. Fusce vitae purus aliquet, tincidunt ligula at, auctor nulla. Vivamus dictum, sapien in varius efficitur, ex eros facilisis elit, a ullamcorper est nibh at sem.";

        const finalName = selectedSubcategory; // El nombre del servicio será la subcategoría.
        const finalPrice = parseFloat(price) || 0.0;

        if (!userCoordinates.latitude || !userCoordinates.longitude) {
            alert("No se ha obtenido la ubicación.");
            return;
        }

        const newService = {
            name: finalName,
            type: "specific",
            categoryId: selectedCategory,
            subcategoryId: selectedSubcategory,
            description: finalDescription,
            price: { value: finalPrice, currency: "COP" },
            rating: 1.0,
            phoneNumber: phoneNumber || "3000000000",
            documentNumber: "00000000",
            professionalLicense: professionalLicense || null,
            coordinates: { latitude: userCoordinates.latitude, longitude: userCoordinates.longitude },
            nearestLocation: nearestLocation || "CN01",
            photoUrl: photoUrl || null,
        };

        try {
            await addDoc(collection(db, "services"), newService);
            alert("Servicio agregado con éxito!");
        } catch (error) {
            console.error("Error al agregar servicio:", error);
            alert("Hubo un error al agregar el servicio.");
        }
    };

    return (
        <>
            <Header />
            <div className="add-servicio-container">
                {locationError && <div className="error-message">{locationError}</div>}
                <div className="add-servicio-card">
                    <h1>Agregar un Servicio</h1>
                    <form onSubmit={handleSubmit} className="add-servicio-form">
                        <label>Categoría</label>
                        <select onChange={(e) => handleCategoryChange(e.target.value)}>
                            <option value="">Selecciona una categoría</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        <label>Subcategoría</label>
                        <select onChange={(e) => setSelectedSubcategory(e.target.value)}>
                            <option value="">Selecciona una subcategoría</option>
                            {subcategories.map((sub, index) => (
                                <option key={index} value={sub.id}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>

                        <label>Precio (COP)</label>
                        <input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Ej: 100000" />

                        <label>Teléfono de Contacto</label>
                        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="3000000000" />

                        <label>Matrícula Profesional (opcional)</label>
                        <input type="text" value={professionalLicense} onChange={(e) => setProfessionalLicense(e.target.value)} placeholder="ABC1234" />

                        <label>Descripción (opcional)</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Si no se coloca, se pone un lorem ipsum por defecto..."></textarea>

                        <label>Foto (opcional, URL)</label>
                        <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="http://..." />

                        <button type="submit">Agregar Servicio</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddServicio;
