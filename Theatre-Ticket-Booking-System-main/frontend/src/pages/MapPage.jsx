import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { useLocationContext } from '../context/LocationContext';
import { theatresByCity, cityCoordinates } from '../data/theatreData';

// Fix for default marker icon in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map re-centering when selectedCity changes
const MapController = ({ center }) => {
    const map = useMap();

    useEffect(() => {
        if (center) {
            map.flyTo([center.lat, center.lng], 12, { duration: 1.5 });
        }
    }, [center, map]);

    return null;
};

const MapPage = () => {
    const navigate = useNavigate();
    const { selectedCity } = useLocationContext();

    const activeCoords = cityCoordinates[selectedCity] || cityCoordinates["Chennai"];
    const activeTheatres = theatresByCity[selectedCity] || [];

    const handleBookTheatre = (theatre) => {
        const firstMovie = theatre.availableMovies?.[0] || { title: "Movie Show", time: theatre.shows?.[0] || "10:00 AM" };
        navigate('/seat-layout', {
            state: {
                theatre: { name: theatre.name, address: theatre.address },
                movie: { title: firstMovie.title, time: firstMovie.time }
            }
        });
    };

    return (
        <div className="pt-24 px-6 md:px-16 lg:px-36 pb-10 bg-black min-h-screen text-white">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">Nearby Theatres in <span className="text-red-500">{selectedCity}</span></h1>
                <p className="text-gray-400 text-sm">Interactive map showing theatres and available shows</p>
            </div>

            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-800 h-[70vh] w-full z-0 relative">
                <MapContainer
                    center={[activeCoords.lat, activeCoords.lng]}
                    zoom={12}
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; Google Maps'
                        url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                    />

                    <MapController center={activeCoords} />

                    {activeTheatres.map((theatre) => (
                        <Marker
                            key={theatre.id}
                            position={[theatre.lat, theatre.lng]}
                        >
                            <Popup>
                                <div className="text-black p-1 min-w-[180px]">
                                    <h3 className="font-bold text-sm text-gray-900">{theatre.name}</h3>
                                    <p className="text-xs text-gray-600 mb-1">{theatre.address}</p>
                                    <span className="text-[10px] bg-yellow-100 text-yellow-800 font-bold px-1.5 py-0.5 rounded">
                                        ★ {theatre.rating}
                                    </span>
                                    <div className="border-t mt-2 pt-1">
                                        <p className="font-semibold text-[10px] text-gray-700 mb-1">Available Shows:</p>
                                        <ul className="text-[10px] list-disc pl-3 text-gray-600 space-y-0.5">
                                            {theatre.shows?.map((show, idx) => (
                                                <li key={idx}>{show}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button
                                        className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-1.5 rounded transition cursor-pointer"
                                        onClick={() => handleBookTheatre(theatre)}
                                    >
                                        Book Tickets
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapPage;
