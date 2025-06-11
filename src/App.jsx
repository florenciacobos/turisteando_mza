import './App.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import MapView from './components/OpenLayersMapView';
import Menu from './Menu'; 
import perfil from './assets/Perfil.png';
import { fetchPOIs } from './services/poiService.js';
import { useGeolocation } from './hooks/useGeolocation';
import ActionBar from './components/ActionBar';
import ActionButton from './components/ActionButton';
import ErrorToast from './components/ErrorToast';


function App() {
  const navigate = useNavigate();
  const [pois, setPois] = useState([]);
  const { location, error, isTracking, startTracking, stopTracking } = useGeolocation();

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

  const goToVistaBusqueda = () => {
    navigate('/busqueda');
  }

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

      {/* Mapa */}
      <div className="map-container">
        <MapView pois={pois} location={location} isTracking={isTracking} />
        <ActionButton
          onClick={isTracking ? stopTracking : startTracking}
          icon={isTracking ? '🔴' : '📍'}
          label={isTracking ? 'Detener seguimiento' : 'Mi ubicación'}
          className="location-button"
        />
      </div>
      <ActionButton className="btn-busqueda"
          onClick={goToVistaBusqueda}
          onPlaceClick={goToVistaLugar}
          icon="🔍"
          label="Buscar"
        />
      {/* <ActionBar className="btn-busqueda"
        onSearch={goToVistaBusqueda}
        onPlaceClick={goToVistaLugar}
      /> */}
      
      <ErrorToast message={error} />

      {/* ✅ Menú lateral si está abierto */}
      {isMenuOpen && <Menu closeMenu={() => setIsMenuOpen(false)} />}

      {/* Footer opcional */}
      <footer></footer>
    </div>
  );
}

export default App;
