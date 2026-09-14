import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Ticket, X } from 'lucide-react';
import { useLocationContext } from '../context/LocationContext';
import { theatresByCity } from '../data/theatreData';

const Theaters = () => {
    const navigate = useNavigate();
    const { selectedCity } = useLocationContext();
    const [selectedTheatre, setSelectedTheatre] = useState(null);

    const theatres = theatresByCity[selectedCity] || [];

    const handleMovieSelect = (movie) => {
        // Navigate to SeatLayout with state
        navigate('/seat-layout', { state: { theatre: selectedTheatre, movie: movie } });
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-16 lg:px-36 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-gray-800 pb-4">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Theatres in {selectedCity}</h1>
                    <p className="text-gray-400">Select a theatre to view available shows</p>
                </div>
                <div className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-xl text-sm text-gray-300 flex items-center gap-2 self-start md:self-auto">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span>Showing {theatres.length} theatres in <strong className="text-white">{selectedCity}</strong></span>
                </div>
            </div>

            {theatres.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {theatres.map((theatre) => (
                        <div
                            key={theatre.id}
                            onClick={() => setSelectedTheatre(theatre)}
                            className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all cursor-pointer group hover:scale-[1.02] duration-300"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={theatre.image}
                                    alt={theatre.name}
                                    className="w-full h-full object-cover group-hover:opacity-80 transition"
                                />
                                <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded-md font-bold flex items-center gap-1 text-sm">
                                    <Star className="w-3 h-3 fill-black" /> {theatre.rating}
                                </div>
                            </div>

                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition">{theatre.name}</h2>
                                <div className="flex items-center text-gray-400 mb-4 text-sm">
                                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                                    {theatre.address}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {theatre.features.map((feature, idx) => (
                                        <span key={idx} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition cursor-pointer">
                                    <Ticket className="w-5 h-5" />
                                    View Shows
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-900/50 rounded-2xl border border-gray-800">
                    <MapPin className="w-12 h-12 text-gray-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-300">No theatres listed in {selectedCity}</h3>
                    <p className="text-gray-500 text-sm mt-1">Try selecting another city from the location dropdown in the top bar.</p>
                </div>
            )}

            {/* Movie Selection Modal */}
            {selectedTheatre && (
                <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-gray-900 border border-gray-700 w-full max-w-lg rounded-2xl p-6 relative animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedTheatre(null); }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h2 className="text-2xl font-bold mb-1">{selectedTheatre.name}</h2>
                        <p className="text-gray-400 text-sm mb-6">{selectedTheatre.address}</p>

                        <h3 className="font-semibold mb-4 text-blue-400 uppercase text-xs tracking-wider">Now Showing</h3>

                        <div className="space-y-3">
                            {selectedTheatre.availableMovies.map((movie, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleMovieSelect(movie)}
                                    className="bg-gray-800 hover:bg-gray-700 p-4 rounded-xl flex justify-between items-center cursor-pointer transition border border-transparent hover:border-gray-600"
                                >
                                    <div>
                                        <h4 className="font-bold text-lg">{movie.title}</h4>
                                        <span className="text-xs text-gray-400">{movie.lang}</span>
                                    </div>
                                    <div className="bg-green-600/20 text-green-400 px-3 py-1 rounded-lg text-sm font-mono font-bold">
                                        {movie.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Theaters;
