import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/SearchPage.css';
import '../css/DynamicSearchBar.css';

const SearchPage = ({ searchType }) => {
    return (
        <div className="search-page">
            <div className="search-bar-container">
                <input type="text" placeholder="Ciudad o Barrio..." className="search-bar" />
                <select className="filter">
                    <option value="">Categoría</option>
                    {/* Agrega las opciones según lo que necesites */}
                </select>
                {searchType === 'Servicios' && (
                    <>
                        <select className="filter">
                            <option value="">Servicio</option>
                            {/* Agrega las opciones */}
                        </select>
                        <select className="filter">
                            <option value="">Precio</option>
                            {/* Agrega las opciones */}
                        </select>
                        <select className="filter">
                            <option value="">Calificación</option>
                            {/* Agrega las opciones */}
                        </select>
                    </>
                )}
                {searchType === 'Especialistas' && (
                    <>
                        <select className="filter">
                            <option value="">Campo de Acción</option>
                            {/* Agrega las opciones */}
                        </select>
                        <select className="filter">
                            <option value="">Especialista</option>
                            {/* Agrega las opciones */}
                        </select>
                        <select className="filter">
                            <option value="">Calificación</option>
                            {/* Agrega las opciones */}
                        </select>
                    </>
                )}
            </div>
            <div className="main-content">
                <div className="results-container">
                    {/* Ejemplo de resultado de búsqueda */}
                    <div className="result-item">
                        <img src="imagen.jpg" alt="Resultado" />
                        <div>
                            <h3>Nombre del Servicio/Experto</h3>
                            <p>Descripción breve</p>
                            <p>Precio: $XXX</p>
                        </div>
                    </div>
                    {/* Puedes repetir para otros resultados */}
                </div>
                <div className="map-container">
                    <MapContainer center={[3.4516, -76.531985]} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {/* Ejemplo de marcador */}
                        <Marker position={[3.4516, -76.531985]}>
                            <Popup>Ejemplo de Ubicación</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;