import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Login from './Login.jsx';
import Registrar from './Registrar';
import VistaLugar from './VistaLugar.jsx';
import ListaFavoritos from './ListaFavoritos.jsx';
import ListaLugarVisitado from './ListaLugarVisitado.jsx';
import Sugerencias from './Sugerencias.jsx';
import AgregarSitio from './AgregarSitio.jsx';
import PlacePage from './PlacePage.jsx';
import VistaBusqueda from './VistaBusqueda.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/registrar', element: <Registrar /> },
  { path: '/lugar', element: <VistaLugar /> },
  { path: '/sugerencias', element: <Sugerencias /> },
  { path: '/favoritos', element: <ListaFavoritos /> },
  { path: '/visitados', element: <ListaLugarVisitado /> },
  { path: '/agregar', element: <AgregarSitio /> },
  { path: '/place/:placeId', element: <PlacePage /> },
  { path: '/busqueda', element: <VistaBusqueda /> },
]);

export default router;
