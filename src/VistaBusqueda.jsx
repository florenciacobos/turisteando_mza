import React, { useState } from "react";
import { buscarLugaresPorNombre } from "./busqueda_filtrado";
import { useNavigate } from "react-router-dom";
import ActionButton from './components/ActionButton';

const BusquedaLugares = () => {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();
  const handleBack = () => navigate("/");

  const handleSearch = async () => {
    if (query.trim() === "") return;
    const { success, data } = await buscarLugaresPorNombre(query);
    if (success) {
      setResultados(data);
    } else {
      console.error("Error al buscar lugares");
    }
  };

  const goToVistaLugar = () => {
    navigate("/lugar");
  };

  return (
    <div className="p-5 bg-[#fdf8f3] min-h-screen font-sans">
      <div className="header-vista-lugar header">
        <svg onClick={handleBack} xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold mb-4 text-center text-[#3b3b3b]">
        BÚSQUEDA DE LUGARES
      </h2>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Ingresa el nombre del lugar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-field"
        />
        <ActionButton
          onClick={handleSearch}
          icon="🔍"
          label="Buscar"
        />
      </div>

      {resultados.length === 0 ? (
        <p className="text-center text-gray-500">
          No se encontraron resultados para tu búsqueda.
        </p>
      ) : (
        <div className="space-y-6" onClick={goToVistaLugar}>
          {resultados.map((lugar) => (
            <div
              key={lugar.id}
              className="bg-white rounded-3xl p-4 flex shadow-md lugar-card space-x-4 items-center"
            >
              {/*<img
                src={lugar.imagen}
                alt={lugar.nombre}
                className="rounded-xl w-80 h-80 object-cover"
                onClick={goToVistaLugar}
              />*/}

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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusquedaLugares;