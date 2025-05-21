import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './Login.jsx';
import VistaLugar from './VistaLugar.jsx';
import ListaFavoritos from './ListaFavoritos.jsx';
import ListaLugarVisitado from './ListaLugarVisitado.jsx';
import Sugerencias from './Sugerencias.jsx';
import AgregarSitio from './AgregarSitio.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lugar" element={<VistaLugar />} />
        <Route path="/sugerencias" element={<Sugerencias />} />
        <Route path="/favoritos" element={<ListaFavoritos />} />
        <Route path="/visitados" element={<ListaLugarVisitado />} />
        <Route path="/agregar" element={<AgregarSitio />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
