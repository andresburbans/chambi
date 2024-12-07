import React from 'react';

const DynamicSearchBar = ({ searchType }) => {
    return (
        <div className="search-bar-container">
            <input type="text" placeholder="Ciudad o Barrio..." className="search-bar" />
            {searchType === 'Servicios' && (
                <div className="filters">
                    <select className="filter">
                        <option value="">Categoría</option>
                        {/* Agrega las opciones */}
                    </select>
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
                </div>
            )}
            {searchType === 'Especialistas' && (
                <div className="filters">
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
                </div>
            )}
        </div>
    );
};

export default DynamicSearchBar;
