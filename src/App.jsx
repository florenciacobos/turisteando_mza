import './App.css';

function App() {
  return (
    <div className="App">
      {/* Ribbon Overlay - fixed and fully visible */}
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
        {/* MapView will go here */}
        <div className="map-placeholder">
          [Vista de mapa aquí]
        </div>
      </main>
      <footer>
        {/* Placeholder for footer */}
      </footer>
    </div>
  );
}

export default App;
