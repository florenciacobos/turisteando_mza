import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mockPOIs from "./data/mockPOIs.js";

const LugaresVisitados = () => {
  const navigate = useNavigate();
  const [visitados, setVisitados] = useState([]);

  useEffect(() => {
    const lugaresGuardados = JSON.parse(localStorage.getItem("visitados")) || [];
    const lugaresVisitados = mockPOIs.filter((lugar) =>
      lugaresGuardados.includes(lugar.name)
    );
    setVisitados(lugaresVisitados);
  }, []);

  const handleBack = () => {
    navigate("/"); 
  };

  const goToVistaLugar = () => {
    navigate('/lugar');
  };

  return (
    <div className="p-5 bg-[#fdf8f3] min-h-screen font-sans">
      <div className="header-vista-lugar">
        {/* Flecha para volver al inicio */}
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
        LUGARES VISITADOS
      </h2>

      {visitados.length === 0 ? (
        <p className="text-center text-gray-500">Todavía no marcaste ningún lugar como visitado.</p>
      ) : (
        <div className="card-lugar space-y-6">
          {visitados.map((lugar) => (
            <div
              key={lugar.id}
              className="card-sombra bg-white rounded-2xl p-4 flex shadow-md space-x-4 lugar-card"
              onClick={goToVistaLugar}
            >
              <img
                src="https://billiken.lat/wp-content/uploads/2022/01/portones-768x455.jpeg"
                alt={lugar.name}
                className="rounded-xl w-32 h-32 object-cover"
              />
              <div className="flex flex-col justify-between flex-1">
                <div className="card-contenido">
                  <h3 className="text-lg font-semibold text-[#3b3b3b]">
                    {lugar.name}
                  </h3>
                  <div className="bg-[#f7f4f1] rounded-xl p-2 mt-2 text-sm">
                    <p className="text-gray-500 font-semibold">Dirección</p>
                    <p className="text-[#3b3b3b]">Av. Emilio Civit 701, Ciudad, Mendoza</p>
                  </div>
                  <div className="bg-[#f7f4f1] rounded-xl p-2 mt-2 text-sm">
                    <p className="text-gray-500 font-semibold">Descripción</p>
                    <p className="text-[#3b3b3b]">{lugar.description}</p>
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

export default LugaresVisitados;
