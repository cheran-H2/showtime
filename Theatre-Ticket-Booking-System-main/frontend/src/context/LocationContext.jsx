import React, { createContext, useContext, useState, useEffect } from 'react';
import { cityCoordinates } from '../data/theatreData';
import toast from 'react-hot-toast';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const availableCities = Object.keys(cityCoordinates);
    const [selectedCity, setSelectedCity] = useState(() => {
        return localStorage.getItem('user_city') || "Chennai";
    });
    const [isDetecting, setIsDetecting] = useState(false);

    useEffect(() => {
        localStorage.setItem('user_city', selectedCity);
    }, [selectedCity]);

    // Haversine formula to compute distance between two coordinates in km
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of Earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const detectLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
            return;
        }

        setIsDetecting(true);
        toast.loading("Detecting your location...", { id: 'geo-toast' });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                let closestCity = "Chennai";
                let minDistance = Infinity;

                Object.entries(cityCoordinates).forEach(([cityName, coords]) => {
                    const dist = getDistance(latitude, longitude, coords.lat, coords.lng);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestCity = cityName;
                    }
                });

                setSelectedCity(closestCity);
                setIsDetecting(false);
                toast.success(`Location set to ${closestCity} (${minDistance.toFixed(1)} km away)`, { id: 'geo-toast' });
            },
            (error) => {
                console.warn("Geolocation error:", error);
                setIsDetecting(false);
                toast.error("Unable to retrieve location. Defaulting to Chennai.", { id: 'geo-toast' });
            },
            { timeout: 10000 }
        );
    };

    return (
        <LocationContext.Provider
            value={{
                selectedCity,
                setSelectedCity,
                availableCities,
                cityCoordinates,
                detectLocation,
                isDetecting
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error("useLocationContext must be used within a LocationProvider");
    }
    return context;
};
