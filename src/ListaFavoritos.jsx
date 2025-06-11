import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sugerencias from "./data/lugares";

const ListaFavoritos = () => {
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState([]);

  // Obtener lugares favoritos desde localStorage y filtrar los datos
  const obtenerFavoritos = () => {
    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
    const lugaresFavoritos = sugerencias.filter((lugar) =>
      favoritosGuardados.includes(lugar.nombre)
    );
    setFavoritos(lugaresFavoritos);
  };

  useEffect(() => {
    obtenerFavoritos();
  }, []);

  // Eliminar un lugar de favoritos
  const eliminarFavorito = (nombreLugar) => {
    const nuevosFavoritos = (JSON.parse(localStorage.getItem("favoritos")) || []).filter(
      (nombre) => nombre !== nombreLugar
    );
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
    obtenerFavoritos();
  };

  const handleBack = () => {
    navigate("/");
  };

  const goToVistaLugar = () => {
    navigate("/lugar");
  };

  return (
    <div className="p-5 bg-[#fdf8f3] min-h-screen font-sans">
      <div className="header-vista-lugar header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
          onClick={handleBack}
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
          />
        </svg>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-center text-[#3b3b3b]">
        LUGARES FAVORITOS
      </h2>

      {favoritos.length === 0 ? (
        <p className="text-center text-gray-500">
          Todavía no marcaste ningún lugar como favorito.
        </p>
      ) : (
        <div className="space-y-6">
          {favoritos.map((lugar) => (
            <div
              key={lugar.id}
              className="bg-white rounded-3xl p-4 flex shadow-md lugar-card space-x-4 items-center"
            >
              <img
                src={lugar.imagen}
                alt={lugar.nombre}
                className="rounded-xl w-80 h-80 object-cover"
                onClick={goToVistaLugar}
              />

              <div className="flex flex-col flex-1 space-y-1">
                <div className="card-contenido">
                  <h3 className="text-lg font-semibold text-[#3b3b3b]">{lugar.nombre}</h3>

                  <p className="text-sm text-[#3b3b3b]">{lugar.categoria}</p>

                  <div className="bg-[#f7f4f1] rounded-xl p-2 mt-2 text-sm">
                    <p className="text-gray-500 font-semibold">Dirección</p>
                    <p className="text-[#3b3b3b]">{lugar.direccion}</p>
                  </div>
                  <div className="bg-[#f7f4f1] rounded-xl p-2 mt-2 text-sm">
                    <p className="text-gray-500 font-semibold">Descripción</p>
                    <p className="text-[#3b3b3b]">{lugar.descripcion}</p>
                  </div>
                  <div className="bg-[#f7f4f1] rounded-xl p-2 mt-2 text-sm">
                    <p className="text-gray-500 font-semibold">Distancia</p>
                    <p className="text-[#3b3b3b]">{lugar.distancia} km</p>
                  </div>
                </div>
                <div className="flex mt-2 space-x-2">
                  <button
                    onClick={() => eliminarFavorito(lugar.nombre)}
                    className="btn-vista-favoritos"
                  >
                    Eliminar de favoritos
                  </button>
                  <button
                    onClick={() => navigate("/sugerencias")}
                    className="btn-vista-favoritos"
                  >
                    Agregar más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaFavoritos;
