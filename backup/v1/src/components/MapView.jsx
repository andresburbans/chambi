import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/MapView.css';

const MapView = () => {
    useEffect(() => {
        // Placeholder for any additional map setup if needed
    }, []);

    return (
        <div className="map-view">
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A sample popup. You can customize this.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapView;