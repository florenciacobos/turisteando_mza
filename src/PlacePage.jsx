import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { supabase } from './lib/supabaseClient';
import ErrorToast from './components/ErrorToast';
import { subirComentario, obtenerComentariosPorLugar } from './lib/poiCommentService';
import './App.css';

const PlacePage = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [favoritos, setFavoritos] = useState(() => JSON.parse(localStorage.getItem('favoritos')) || []);
  const [visitados, setVisitados] = useState(() => JSON.parse(localStorage.getItem('visitados')) || []);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  
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

  useEffect(() => {
    if (!place) return;
    const cargarComentarios = async () => {
      const res = await obtenerComentariosPorLugar(place.id);
      if (res.success) {
        setComentarios(res.comentarios);
      } else {
        console.error(res.error);
      }
    };
    cargarComentarios();
  }, [place]);

  const handleBack = () => {
    navigate("/");
  };

  const esFavorito = place ? favoritos.includes(place.name) : false;
  const estaVisitado = place ? visitados.includes(place.name) : false;

  const toggleFavorito = (nombreLugar) => {
    setFavoritos((prev) => {
      const nuevos = prev.includes(nombreLugar)
        ? prev.filter((item) => item !== nombreLugar)
        : [...prev, nombreLugar];
      localStorage.setItem('favoritos', JSON.stringify(nuevos));
      return nuevos;
    });
  };

  const toggleVisitado = () => {
    if (!place) return;
    const nuevos = estaVisitado
      ? visitados.filter((item) => item !== place.name)
      : [...visitados, place.name];
    setVisitados(nuevos);
    localStorage.setItem('visitados', JSON.stringify(nuevos));
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const manejarEnvio = async () => {
    if (comentario.trim() === '' || !place) {
      alert('El comentario no puede estar vacío');
      return;
    }

    const id_usuario = 2; // TODO: obtener usuario autenticado

    const resultado = await subirComentario({
      id_usuario,
      poi_id: place.id,
      comentario,
    });

    if (!resultado.success) {
      console.error('Error al enviar comentario:', resultado.error);
      alert('Hubo un error al guardar el comentario');
      return;
    }

    setComentario('');
    setMostrarFormulario(false);

    // Recargar comentarios
    const res = await obtenerComentariosPorLugar(place.id);
    if (res.success) {
      setComentarios(res.comentarios);
    }
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

  const images = [
    { src: 'https://placehold.co/600x400?text=Imagen+1' },
    { src: 'https://placehold.co/600x400?text=Imagen+2' },
    { src: 'https://placehold.co/600x400?text=Imagen+3' },
  ];

  const listadoComentarios = comentarios.map((c, index) => (
    <div key={c.id ?? index} className="comentario">
      <Card variant="outlined" sx={{ mb: 1 }}>
        <CardContent>
          <Typography level="body1">{c.comment_text}</Typography>
          <Typography level="body3" sx={{ mt: 1, fontSize: '0.75rem', color: 'gray' }}>
            {new Date(c.created_at).toLocaleString()}
            {c.user_name && ` - ${c.user_name}`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  ));

  return (
    <div className="container-vista-lugar">
      <div className="header-vista-lugar">
        <svg onClick={handleBack} xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
        </svg>

        <svg onClick={() => toggleFavorito(place.name)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={esFavorito ? '#5d2120' : 'none'} stroke="#5d2120" className="bi bi-heart" viewBox="0 0 20 20" style={{ cursor: 'pointer' }}>
          {esFavorito ? (
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
          ) : (
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748z" />
          )}
        </svg>
      </div>

      <h2>{place.name}</h2>
      <Box sx={{
        display: 'flex',
        gap: 1,
        py: 2,
        overflow: 'auto',
        width: '90vw',
        scrollSnapType: 'x mandatory',
        '& > *': { scrollSnapAlign: 'center' },
        '::-webkit-scrollbar': { display: 'none' },
      }}>
        {images.map((item, index) => (
          <Card key={index} orientation="horizontal" size="m" variant="outlined">
            <AspectRatio ratio="1.5" sx={{ minWidth: 300 }}>
              <img src={item.src} alt="Imagen lugar" className="img-lugar" />
            </AspectRatio>
          </Card>
        ))}
      </Box>

      <div className="container-tag">
        {place.kinds?.slice(0, 3).map((kind, index) => (
          <span key={index} className="tag">{kind}</span>
        ))}
      </div>

      <div className="container-input">
        <input type="checkbox" checked={estaVisitado} onChange={toggleVisitado} />
        <span> Marcar como visitado </span>
      </div>

      <div className="container-direccion">
        {/* TODO: Crear un Address schema table en supabase para almacenar las direcciones textuales de cada POI */}
        <h6>Dirección</h6>
        <p>{'❌ Dirección no disponible'}</p>
      </div>

      <div className="container-coordenadas">
        <h6>Coordenadas</h6>
        <p>
          {place.lat ? `Latitud: ${place.lat.toFixed(6)}, Longitud: ${place.lng.toFixed(6)}` : 'Coordenadas no disponible'}
        </p>
      </div>

      <div className="container-descripcion">
        <h6>Descripción</h6>
        <p>{place.description || 'Sin descripción disponible'}</p>
      </div>

      <div className="container-comentarios">
        <button className="btn_dejar_comentario" onClick={toggleFormulario}>
          {mostrarFormulario ? 'Cancelar comentario' : 'Dejá tu comentario'}
        </button>

        {mostrarFormulario && (
          <div className="formulario-comentario">
            <textarea
              className="textArea-comentario"
              rows="3"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Escribí tu comentario..."
            />
            <button className="btn_enviar_comentario" onClick={manejarEnvio}>Enviar</button>
          </div>
        )}

        <div className="lista-comentarios">
          <h4>Comentarios:</h4>
          {comentarios.length === 0 && <p>Este lugar aún no tiene comentarios.</p>}
          {listadoComentarios}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
