import './App.css';
import { useNavigate } from 'react-router-dom'; // Importamos React Router

import ListaUsuarios from './components/ListaUsuarios.jsx';
import MapView from './components/OpenLayersMapView';
import mockPOIs from './data/mockPOIs';
import perfil from './assets/Perfil.png';

// Si quieres usar Leaflet en lugar de OpenLayers, descomenta las siguientes líneas
// import MapView from './components/LeafletMapView.jsx';
// import 'leaflet/dist/leaflet.css'

function App() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      {/* Ribbon prototipo */}
      <div className="ribbon" role="status" aria-live="polite">
        PROTOTYPE BUILD
      </div>

      {/* Header */}
      <div className="header">
        <span className="menu-icon">☰</span>
        <h2 className="city">- MZA -</h2>
          <img
            src={perfil}
            alt="Perfil"
            className="profile-icon"
            onClick={goToLogin}
          />
      </div>

      {/* Barra de navegación */}
      <nav className="nav-bar">
        <button>Mapa</button>
        <button disabled>Inicio</button>
        <button disabled>Filtros</button>
        <button disabled>Perfil</button>
        <button disabled>Feedback</button>
        <button disabled>Itinerarios</button>
        <button disabled>Notificaciones</button>
      </nav>

      {/* Mapa */}
      <div className="map-container">
        <MapView pois={mockPOIs} />
      </div>

      {/* Botón de búsqueda */}
      <button className="search-button" onClick={() => alert('Buscar')}>
        🔍
      </button>

      {/* Footer opcional */}
      <footer></footer>

    </div>
  );
}

export default App;
