import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // O podés meter los estilos directamente

function Menu({ closeMenu }) {
  const navigate = useNavigate();

  const goTo = (path) => {
    closeMenu();
    navigate(path);
  };

  return (
    <div className="sidebar">
      {/* Contenedor del botón */}
      <div className="menu-header">
        <button className="back-button" onClick={() => goTo('/')}>← Volver al inicio</button>
      </div>

      {/* Contenedor del menú */}
      <ul className="menu-list">
        <li className="active"><span>📍</span> Lugares sugeridos</li>
        <li onClick={() => goTo('/visitados')}><span>⏱️</span> Lugares visitados</li>
        <li onClick={() => goTo('/favoritos')}><span>❤️</span> Mis lugares favoritos</li>
        <li onClick={() => goTo('/agregar')}><span>➕</span> Agregar sitio</li>
        <hr />
        <li onClick={() => goTo('/config')}><span>⚙️</span> Configuraciones</li>
      </ul>
    </div>
  );
}

export default Menu;
