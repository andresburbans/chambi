import Header from '../components/Header';
import Footer from '../components/Footer';
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../css/SearchServices.css";

const SearchServices = () => {
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);       // Para servicios (type: "specific")
    const [specialtiesData, setSpecialtiesData] = useState([]); // Para especialistas (type: "expert")
    const [subcategories, setSubcategories] = useState([]);
    const [services, setServices] = useState([]);

    const [selectedComuna, setSelectedComuna] = useState("");
    const [selectedType, setSelectedType] = useState("service"); // "service" o "specialty"
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [priceRange, setPriceRange] = useState("all");
    const [customPrice, setCustomPrice] = useState(0);
    const [showCustomPriceInput, setShowCustomPriceInput] = useState(false);
    const [rating, setRating] = useState("all");

    const [results, setResults] = useState([]);
    const [selectedService, setSelectedService] = useState(null);

    const [userCoordinates, setUserCoordinates] = useState({ latitude: null, longitude: null });
    const [locationRequested, setLocationRequested] = useState(false);
    const [locationError, setLocationError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locationsSnapshot = await getDocs(collection(db, "locations"));
                const categoriesSnapshot = await getDocs(collection(db, "categories"));
                const specialtiesSnapshot = await getDocs(collection(db, "specialties"));
                const servicesSnapshot = await getDocs(collection(db, "services"));

                setLocations(locationsSnapshot.docs.map((doc) => doc.data()));
                const catData = categoriesSnapshot.docs.map((doc) => doc.data());
                setCategories(catData);

                const specData = specialtiesSnapshot.docs.map((doc) => doc.data());
                setSpecialtiesData(specData);

                const svcData = servicesSnapshot.docs.map((doc) => doc.data());
                // Asignar valores por defecto
                const processedServices = svcData.map(svc => ({
                    ...svc,
                    price: svc.price?.value ? svc.price : { value: 0.0, currency: "COP" },
                    rating: svc.rating || 1.0,
                    coordinates: svc.coordinates || { latitude: 0, longitude: 0 },
                    documentNumber: svc.documentNumber || "00000000",
                    professionalLicense: svc.professionalLicense || null,
                    phoneNumber: svc.phoneNumber || "3000000000",
                    description: svc.description || "Sin descripción",
                    name: svc.name || "Servicio/Especialidad sin nombre"
                }));
                setServices(processedServices);
            } catch (error) {
                console.error("Error al obtener datos de Firestore:", error);
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

    const handleTypeChange = (value) => {
        setSelectedType(value);
        setSelectedCategory("");
        setSelectedSubcategory("");
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);

        if (selectedType === "service") {
            const selectedCat = categories.find(cat => cat.name === value);
            setSubcategories(selectedCat ? selectedCat.subcategories : []);
        } else {
            const selectedField = specialtiesData.find(field => field.field === value);
            setSubcategories(selectedField ? selectedField.subcategories : []);
        }
    };

    const getPrice = () => {
        if (showCustomPriceInput) {
            return customPrice;
        } else {
            return priceRange;
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

    const handleSearch = () => {
        const priceToCompare = getPrice();

        let filtered = [...services];

        // Filtrar por comuna
        if (selectedComuna) {
            filtered = filtered.filter(svc => svc.nearestLocation === selectedComuna);
        }

        // Filtrar por tipo
        if (selectedType === "service") {
            filtered = filtered.filter(svc => svc.type === "specific");
        } else {
            filtered = filtered.filter(svc => svc.type === "expert");
        }

        // Filtrar por categoría/campo
        if (selectedType === "service" && selectedCategory) {
            filtered = filtered.filter(svc => svc.categoryId === selectedCategory);
        } else if (selectedType === "specialty" && selectedCategory) {
            filtered = filtered.filter(svc => svc.field === selectedCategory);
        }

        // Filtrar por subcategoría/especialidad
        if (selectedType === "service" && selectedSubcategory) {
            filtered = filtered.filter(svc => svc.subcategoryId === selectedSubcategory);
        } else if (selectedType === "specialty" && selectedSubcategory) {
            filtered = filtered.filter(svc => svc.specialty === selectedSubcategory);
        }

        // Filtrar por precio
        if (priceRange !== "all") {
            if (showCustomPriceInput) {
                filtered = filtered.filter(svc => svc.price.value === parseFloat(priceToCompare));
            } else {
                const priceVal = parseInt(priceToCompare);
                if (priceVal === 100000) {
                    filtered = filtered.filter(svc => svc.price.value <= 100000);
                } else if (priceVal === 300000) {
                    filtered = filtered.filter(svc => svc.price.value >= 100000 && svc.price.value <= 300000);
                } else if (priceVal === 300001) {
                    filtered = filtered.filter(svc => svc.price.value > 300000);
                }
            }
        }

        // Filtrar por rating
        if (rating !== "all") {
            const ratingVal = parseFloat(rating);
            filtered = filtered.filter(svc => svc.rating >= ratingVal);
        }

        // Ordenar por distancia
        if (userCoordinates.latitude && userCoordinates.longitude) {
            filtered = filtered.map(svc => {
                const dist = calcularDistancia(userCoordinates.latitude, userCoordinates.longitude, svc.coordinates.latitude, svc.coordinates.longitude);
                return { ...svc, distance: dist };
            });
            filtered.sort((a, b) => a.distance - b.distance);
        }

        setResults(filtered);
        setSelectedService(null);
    };

    // Función para obtener el nombre de la subcategoría a partir del ID
    const getSubcategoryName = (service) => {
        // Si es un servicio (type: "specific"), buscar en categories
        if (service.type === "specific") {
            const cat = categories.find(c => c.name === service.categoryId);
            if (cat && cat.subcategories) {
                const sub = cat.subcategories.find(s => s.id === service.subcategoryId);
                return sub ? sub.name : service.subcategoryId;
            }
            return service.subcategoryId;
        } else {
            // Es un especialista (type: "expert"), buscar en specialties
            // Asumiendo que service.specialty o service.subcategoryId es un ID similar
            // Si ya tienes el ID en subcategoryId, úsalo. Si guardas el nombre directamente en specialty, adáptalo.
            // Aquí asumo que specialty guarda un ID (ej: "1.1") y necesitamos el nombre.
            const fieldData = specialtiesData.find(f => f.field === service.field);
            if (fieldData && fieldData.subcategories) {
                const sub = fieldData.subcategories.find(s => s.id === service.specialty);
                return sub ? sub.name : service.specialty;
            }
            return service.specialty;
        }
    };

    const renderResults = () => {
        if (results.length === 0) {
            return (
                <div className="card no-results">
                    <h3>Lo siento, aún no hay servicios registrados</h3>
                    <p>Prueba con otros filtros :'c</p>
                </div>
            );
        }

        return results.map((result) => {
            let title = result.name;
            let price = result.price.value;
            let ratingVal = result.rating;
            let desc = result.description.slice(0, 100) + "...";
            const distanceText = (result.distance !== undefined)
                ? `Distancia: a menos de ${Math.round(result.distance * 10) / 10} km del que consulta`
                : "";

            return (
                <div
                    className="card"
                    key={result.id || result.name + Math.random()}
                    onClick={() => setSelectedService(result)}
                >
                    <h3>{title}</h3>
                    <p>Precio: ${price}</p>
                    <p>Calificación: {ratingVal.toFixed(1)} ⭐</p>
                    <p>{desc}</p>
                    {distanceText && <p>{distanceText}</p>}
                </div>
            );
        });
    };

    const renderDetails = () => {
        if (!selectedService) return null;

        const svc = selectedService;
        const docDigits = svc.documentNumber.slice(0, 4);
        const licenseDigits = svc.professionalLicense ? svc.professionalLicense.slice(0, 4) : "No verificado";
        const whatsappLink = `https://wa.me/57${svc.phoneNumber}`;
        const fullDesc = svc.description;
        const mapsLink = `https://www.google.com/maps/dir/?api=1&destination=${svc.coordinates.latitude},${svc.coordinates.longitude}`;

        // Obtener el nombre de la subcategoría/especialidad
        let subcategoryName = "";
        if (svc.type === "specific") {
            subcategoryName = getSubcategoryName(svc);
        } else {
            // para expertos
            subcategoryName = getSubcategoryName(svc);
        }

        return (
            <div className="details">
                <h2>{svc.name}</h2>
                <p><strong>Precio:</strong> ${svc.price.value}</p>
                <p><strong>Calificación:</strong> {svc.rating.toFixed(1)} ⭐</p>
                <p><strong>Descripción:</strong> {fullDesc}</p>
                <p><strong>Contacto:</strong> <a href={whatsappLink} target="_blank" rel="noopener noreferrer">{svc.phoneNumber}</a></p>
                <p><strong>Documento (4 dígitos):</strong> {docDigits}</p>
                <p><strong>Matrícula Profesional (4 dígitos):</strong> {licenseDigits}</p>

                {svc.type === "specific" ? (
                    <>
                        <p><strong>Categoría:</strong> {svc.categoryId}</p>
                        <p><strong>Subcategoría:</strong> {subcategoryName}</p>
                    </>
                ) : (
                    <>
                        <p><strong>Campo:</strong> {svc.field}</p>
                        <p><strong>Especialidad:</strong> {subcategoryName}</p>
                    </>
                )}

                <p><strong>Ubicación Aproximada:</strong> {svc.nearestLocation}</p>
                <p><strong>Como llegar:</strong> <a href={mapsLink} target="_blank" rel="noopener noreferrer">Navega aquí</a></p>
            </div>
        );
    };

    return (
        <div className="home">
            <Header />
            <div className="search-services">
                {locationError && <div className="error-message">{locationError}</div>}

                <div className="filters">
                    <select onChange={(e) => setSelectedComuna(e.target.value)}>
                        <option value="">Selecciona una comuna</option>
                        {locations.map((loc, index) => (
                            <option key={index} value={loc.name}>
                                {loc.name}
                            </option>
                        ))}
                    </select>

                    <select onChange={(e) => handleTypeChange(e.target.value)}>
                        <option value="service">Buscar un servicio</option>
                        <option value="specialty">Buscar un especialista</option>
                    </select>

                    {selectedType === "service" ? (
                        <>
                            <select onChange={(e) => handleCategoryChange(e.target.value)}>
                                <option value="">Selecciona una categoría</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {/* Aquí seguimos usando el ID en el filtrado, pero en la presentación se buscará el nombre. */}
                            <select onChange={(e) => setSelectedSubcategory(e.target.value)}>
                                <option value="">Selecciona una subcategoría</option>
                                {subcategories.map((sub, index) => (
                                    // Mantenemos el id como value, para no alterar la lógica de filtros
                                    <option key={index} value={sub.id}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                        </>
                    ) : (
                        <>
                            <select onChange={(e) => handleCategoryChange(e.target.value)}>
                                <option value="">Selecciona un campo</option>
                                {specialtiesData.map((field, index) => (
                                    <option key={index} value={field.field}>
                                        {field.field}
                                    </option>
                                ))}
                            </select>
                            <select onChange={(e) => setSelectedSubcategory(e.target.value)}>
                                <option value="">Selecciona una especialidad</option>
                                {subcategories.map((sub, index) => (
                                    <option key={index} value={sub.id}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

                    <select onChange={(e) => {
                        const selectedValue = e.target.value;
                        setPriceRange(selectedValue);
                        setShowCustomPriceInput(selectedValue === " ");
                        if (selectedValue === " ") {
                            setCustomPrice(0);
                        }
                    }}>
                        <option value="all">Cualquier precio</option>
                        <option value="100000">Menos de $100,000</option>
                        <option value="300000">$100,000 - $300,000</option>
                        <option value="300001">Más de $300,000</option>
                        <option value=" ">Dar un valor específico</option>
                    </select>

                    {showCustomPriceInput && (
                        <input
                            type="number"
                            min="50000"
                            value={customPrice}
                            onChange={(e) => setCustomPrice(Number(e.target.value))}
                            placeholder="Ingresa el valor exacto"
                        />
                    )}

                    <select onChange={(e) => setRating(e.target.value)}>
                        <option value="all">Cualquier calificación</option>
                        <option value="1">1 estrella</option>
                        <option value="2">2 estrellas</option>
                        <option value="3">3 estrellas</option>
                        <option value="4">4 estrellas</option>
                        <option value="5">5 estrellas</option>
                    </select>

                    <button onClick={handleSearch}>Buscar</button>
                </div>

                <div className="content">
                    <div className="results">
                        {renderResults()}
                    </div>
                    {renderDetails()}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchServices;
