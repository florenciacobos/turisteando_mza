import './App.css';

import ListaUsuarios from './components/ListaUsuarios.jsx';

import MapView from './components/OpenLayersMapView';
import mockPOIs from './data/mockPOIs';

// If you want to use Leaflet instead of OpenLayers, uncomment the following lines
// import MapView from './components/LeafletMapView.jsx';
// import 'leaflet/dist/leaflet.css'



function App() {
  return (
    <div className="App">
      <div className="ribbon" role="status" aria-live="polite">
        PROTOTYPE BUILD
      </div>
      <header>
        <h1>Turisteando Mendoza</h1>
      </header>
      <nav>
        <button>Mapa</button>
        <button disabled aria-disabled="true">Inicio</button>
        <button disabled aria-disabled="true">Filtros</button>
        <button disabled aria-disabled="true">Perfil</button>
        <button disabled aria-disabled="true">Feedback</button>
        <button disabled aria-disabled="true">Itinerarios</button>
        <button disabled aria-disabled="true">Notificaciones</button>
      </nav>
      <main>
        <MapView pois={mockPOIs} />
      </main>
      <footer>
        {/* Placeholder for footer */}
      </footer>
    </div>
  );
}

export default App;
