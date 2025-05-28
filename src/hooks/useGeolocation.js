import { useState, useEffect } from 'react';

export const useGeolocation = (options = {}) => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [isTracking, setIsTracking] = useState(false);
    const [watchId, setWatchId] = useState(null);

    const startTracking = () => {
        if (!navigator.geolocation) {
            setError('Geolocalización no soportada');
            return;
        }

        setIsTracking(true);
        const id = navigator.geolocation.watchPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy
                });
                setError(null);
            },
            (err) => {
                setError(err.message);
                setIsTracking(false);
            },
            {
                enableHighAccuracy: false,
                ...options
            }
        );
        setWatchId(id);
    };

    const stopTracking = () => {
        if (watchId) {
            navigator.geolocation.clearWatch(watchId);
            setWatchId(null);
        }
        setIsTracking(false);
    };

    useEffect(() => {
        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, [watchId]);

    return {
        location,
        error,
        isTracking,
        startTracking,
        stopTracking
    };
};
