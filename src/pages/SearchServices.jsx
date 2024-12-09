import Header from '../components/Header';
import Footer from '../components/Footer';
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Asegúrate que la ruta es correcta
import "../css/SearchServices.css";

const SearchServices = () => {
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);

    const [selectedComuna, setSelectedComuna] = useState("");
    const [selectedType, setSelectedType] = useState("service");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [priceRange, setPriceRange] = useState("all");
    const [customPrice, setCustomPrice] = useState(0); // Valor inicial cambiado a 0
    const [rating, setRating] = useState("all");
    const [showCustomPriceInput, setShowCustomPriceInput] = useState(false); // Nuevo estado para controlar la visibilidad del input

    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const locationsSnapshot = await getDocs(collection(db, "locations"));
                const categoriesSnapshot = await getDocs(collection(db, "categories"));
                const servicesSnapshot = await getDocs(collection(db, "services"));

                setLocations(locationsSnapshot.docs.map((doc) => doc.data()));
                setCategories(categoriesSnapshot.docs.map((doc) => doc.data()));
                setServices(servicesSnapshot.docs.map((doc) => doc.data()));
            } catch (error) {
                console.error("Error al obtener datos de Firestore:", error);
            }
        };

        fetchData();
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        const selectedCategoryData = categories.find((cat) => cat.name === category);
        setSubcategories(selectedCategoryData ? selectedCategoryData.subcategories : []);
    };

    const getPrice = () => {
        if (showCustomPriceInput) {
            return customPrice;
        } else {
            return priceRange;
        }
    }

    const handleSearch = () => {
        // const priceToCompare = getPrice();

        const filteredResults = services.filter((service) => {
            const matchesComuna = service.comuna === selectedComuna || selectedComuna === "";
            const matchesType = selectedType === "service" ? service.type === "specific" : true;
            const matchesCategory = service.categoryId === selectedCategory;
            const matchesSubcategory = service.subcategoryId === selectedSubcategory || selectedSubcategory === "";
            const matchesPrice = priceRange === "all" || (showCustomPriceInput ? service.price.value === customPrice : service.price.value <= parseInt(priceRange)); // Se compara con igualdad estricta para el valor personalizado
            const matchesRating = rating === "all" || service.rating >= parseFloat(rating);

            return (
                matchesComuna &&
                matchesType &&
                matchesCategory &&
                matchesSubcategory &&
                matchesPrice &&
                matchesRating
            );
        });

        setResults(filteredResults);
    };

    return (
        <div className="home">
            <Header />
            <div className="search-services">
                <div className="filters">
                    <select onChange={(e) => setSelectedComuna(e.target.value)}>
                        <option value="">Selecciona una comuna</option>
                        {locations.map((loc, index) => (
                            <option key={index} value={loc.name}>
                                {loc.name}
                            </option>
                        ))}
                    </select>

                    <select onChange={(e) => setSelectedType(e.target.value)}>
                        <option value="service">Buscar un servicio</option>
                        <option value="specialty">Buscar una especialidad</option>
                    </select>

                    <select onChange={(e) => handleCategoryChange(e.target.value)}>
                        <option value="">Selecciona una categoría</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <select onChange={(e) => setSelectedSubcategory(e.target.value)}>
                        <option value="">Selecciona una subcategoría</option>
                        {subcategories.map((sub, index) => (
                            <option key={index} value={sub.id}>
                                {sub.name}
                            </option>
                        ))}
                    </select>

                    <select onChange={(e) => {
                        const selectedValue = e.target.value;
                        setPriceRange(selectedValue);
                        setShowCustomPriceInput(selectedValue === " "); // Muestra el input solo si se selecciona "Dar un valor"
                        if (selectedValue === " ") {
                            setCustomPrice(0); // Resetea el valor personalizado
                        }
                    }}>
                        <option value="all">Cualquier precio</option>
                        <option value="100000">Menos de $100,000</option>
                        <option value="300000"> $100,000 - $300,000</option>
                        <option value="300001">Más de $300,000</option>
                        <option value=" ">Dar un valor</option> {/* Opción para valor personalizado */}
                    </select>

                    {showCustomPriceInput && (
                        <input
                            type="number"
                            min="0" // Valor mínimo ajustado a 0
                            value={customPrice}
                            onChange={(e) => setCustomPrice(Number(e.target.value))}
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
                        {results.map((result) => (
                            <div
                                className="card"
                                key={result.id}
                                onClick={() => setSelectedService(result)}
                            >
                                <h3>{result.name}</h3>
                                <p>{result.description.slice(0, 100)}...</p>
                                <p>Precio: ${result.price.value}</p>
                            </div>
                        ))}
                    </div>

                    {selectedService && (
                        <div className="details">
                            <h2>{selectedService.name}</h2>
                            <p>{selectedService.description}</p>
                            <p>Precio: ${selectedService.price.value}</p>
                            <button>Aceptar Precio</button>
                            <button>Ofertar Precio</button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchServices;