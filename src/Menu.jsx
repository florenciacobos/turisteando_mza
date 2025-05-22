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
      <div className="menu-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="back-arrow-menu"
          viewBox="0 0 16 16"
          onClick={() => goTo('/')}
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
          />
        </svg>
      </div>

      {/* Contenedor del menú */}
      <ul className="menu-list">
        <li onClick={() => goTo('/sugerencias')}><span>📍</span> Lugares sugeridos</li>
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
