import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import ErrorToast from './components/ErrorToast';

const PlacePage = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        // Query includes ST_Y and ST_X to get lat/lng directly
        const { data, error } = await supabase
          .from('poi_with_coords')
          .select('*')
          .eq('external_id', placeId)
          .single();

        if (error) throw error;
        
        if (!data) {
          setError('Lugar no encontrado');
          setTimeout(() => navigate('/'), 2000);
          return;
        }

        setPlace(data);
      } catch (err) {
        console.error('Error fetching place:', err);
        setError('Error cargando el lugar');
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [placeId, navigate]);

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="p-5 bg-[#fdf8f3] min-h-screen font-sans">
        <p className="text-center text-gray-500">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorToast message={error} />;
  }

  if (!place) return null;

  return (
    <div className="p-5 bg-[#fdf8f3] min-h-screen font-sans">
      <div className="flex items-center mb-6">
        <button 
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Volver atrás"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-800 ml-2">{place.name}</h1>
      </div>

      <div className="bg-gray-100 rounded-xl w-full h-64 mb-6 flex items-center justify-center">
        SIN IMAGEN DISPONIBLE (POR AHORA)
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Descripción</h2>
          <p className="text-gray-600">{place.description || 'Sin descripción disponible'}</p>
        </div>

        <div className="bg-white rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Ubicación</h2>
          <p className="text-gray-600">
            {place.lat ? (
              <>Latitud: {place.lat.toFixed(6)}, Longitud: {place.lng.toFixed(6)}</>
            ) : (
              'Ubicación no disponible'
            )}
          </p>
        </div>

        {place.kinds?.length > 0 && (
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-2">Categorías</h2>
            <div className="flex flex-wrap gap-2">
              {place.kinds.map((kind, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {kind}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacePage;
