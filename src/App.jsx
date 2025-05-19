import './App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import ListaUsuarios from './components/ListaUsuarios.jsx';
import MapView from './components/OpenLayersMapView';
import Menu from './Menu'; 
import perfil from './assets/Perfil.png';
import { useEffect } from 'react';
import { fetchPOIs } from './services/poiService.js';


// Si quieres usar Leaflet en lugar de OpenLayers, descomenta las siguientes líneas
// import MapView from './components/LeafletMapView.jsx';
// import 'leaflet/dist/leaflet.css'

function App() {
  const navigate = useNavigate();
  const [pois, setPois] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchPOIs();
      setPois(data);
    }
    fetchData();
  }, []);

  const goToLogin = () => {
    navigate('/login');
  };

  const goToVistaLugar = () => {
    navigate('/lugar');
  };

  const goToSugerencias = () => {
    navigate('/sugerencias');
  };

  const goToFavoritos = () => {
    navigate('/favoritos');
  };

  const goToVisitados = () => {
    navigate('/visitados');
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="home-container">

      {/* Header */}
      <div className="header">
        <span className="menu-icon" onClick={() => setIsMenuOpen(true)}>☰</span>
        <h2 className="city">- MZA -</h2>
        <img
          src={perfil}
          alt="Perfil"
          className="profile-icon"
          onClick={goToLogin}
        />
      </div>

      {/* Barra de navegación */}
      {/* <nav className="nav-bar">
        <button>Mapa</button>
        <button disabled>Inicio</button>
        <button disabled>Filtros</button>
        <button disabled>Perfil</button>
        <button disabled>Feedback</button>
        <button disabled>Itinerarios</button>
        <button disabled>Notificaciones</button>
      </nav> */}

      {/* Mapa */}
      <div className="map-container">
        <MapView pois={pois} />
      </div>

      {/* Botón de búsqueda */}
      <button className="search-button" onClick={() => alert('Buscar')}>
        🔍
      </button>

      {/* Botón de lugar */}
      <button className="search-button" onClick={goToVistaLugar}>
        Lugar
      </button>

      {/* Botón Sugerencias */}
      {/* <button className="search-button" onClick={goToSugerencias}>
        SUG
      </button>

      {/* Botón de favoritos */}
      {/* <button className="search-button" onClick={goToFavoritos}>
        FAV
      </button> */}

      {/* Botón de visitados */}
      {/* <button className="search-button" onClick={goToVisitados}>
        VIS
      </button> */}

      {/* ✅ Menú lateral si está abierto */}
      {isMenuOpen && <Menu closeMenu={() => setIsMenuOpen(false)} />}

      {/* Footer opcional */}
      <footer></footer>
    </div>
  );
}

export default App;
