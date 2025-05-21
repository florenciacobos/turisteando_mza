
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// import mockPOIs from "./data/mockPOIs.js";


const sugerencias = [
    {
        id: 1,
        nombre: 'Parque General San Martín',
        categoria: 'Lugares de esparcimiento',
        direccion: 'Av. Emilio Civit 701, Ciudad, Mendoza',
        descripcion:
            'Es el parque más emblemático de Mendoza, ideal para caminatas, picnics y actividades al aire libre.',
        distancia: 1.4,
        imagen: 'https://billiken.lat/wp-content/uploads/2022/01/portones.jpeg',
    },
    {
        id: 2,
        nombre: 'Bodega López',
        categoria: 'Bodegas',
        direccion: 'Ozamis Sur 375, Maipú',
        descripcion:
            'Tradicional bodega mendocina con degustaciones y visitas guiadas.',
        distancia: 4.5,
        imagen: 'https://mendoza.tur.ar/wp-content/uploads/2021/12/Frente-Bodega-noche-8-13.jpg',
    },
];



const Sugerencias = () => {
    const [categorias, setCategorias] = useState([]);
    const [distancia, setDistancia] = useState([]);
    const navigate = useNavigate();
    const [visitados, setVisitados] = React.useState(() => {
        return JSON.parse(localStorage.getItem("visitados")) || [];
    });

    const handleCategoriaChange = (e) => {
        const value = e.target.value;
        setCategorias((prev) =>
            prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
        );
    };

    const handleDistanciaChange = (e) => {
        const value = e.target.value;
        setDistancia((prev) =>
            prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
        );
    };

    const handleBack = () => {
        navigate("/");
    };

    // Filtrado de lugares según filtros seleccionados
    const lugaresFiltrados = sugerencias.filter((lugar) => {
        // Filtrar por categoría si alguna está seleccionada
        const categoriaMatch =
            categorias.length === 0 ||
            categorias.some((cat) => {
                if (cat === "Parque") return lugar.categoria.toLowerCase().includes("parque") || lugar.categoria.toLowerCase().includes("esparcimiento");
                if (cat === "Bodega") return lugar.categoria.toLowerCase().includes("bodega");
                return false;
            });


        // Filtrar por distancia si alguna está seleccionada
        const distanciaMatch =
            distancia.length === 0 ||
            distancia.some((dist) => {
                if (dist === "Cerca") return lugar.distancia <= 3;
                if (dist === "Lejos") return lugar.distancia > 3;
                return false;
            });

        return categoriaMatch && distanciaMatch;
    });

    return (
        <div className="p-5 bg-[#fdf8f3] min-h-screen font-sans">
            <div className="header-vista-lugar">
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

            <div className="p-5 bg-[#fdf8f3] min-h-screen font-sans">
                <h2 className="text-xl font-semibold mb-4 text-center text-[#3b3b3b]">
                    Lugares sugeridos
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                        <p className="titulo-categoria text-sm font-semibold text-gray-600 ">Categorías</p>
                        <label className=" checkbox-parque flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value="Parque"
                                checked={categorias.includes("Parque")}
                                onChange={handleCategoriaChange}
                            />
                            <span> Parque</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value="Bodega"
                                checked={categorias.includes("Bodega")}
                                onChange={handleCategoriaChange}
                            />
                            <span> Bodega</span>
                        </label>
                    </div>

                    <div className="space-y-2">
                        <p className="titulo-distancia text-sm font-semibold text-gray-600">Distancia</p>
                        <label className="checkbox-cerca flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value="Cerca"
                                checked={distancia.includes("Cerca")}
                                onChange={handleDistanciaChange}
                            />
                            <span> Cerca (-3 km)</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value="Lejos"
                                checked={distancia.includes("Lejos")}
                                onChange={handleDistanciaChange}
                            />
                            <span> Lejos (+3 km)</span>
                        </label>
                    </div>
                </div>

                <div className="card-lugar space-y-6">
                    {lugaresFiltrados.length > 0 ? (
                        lugaresFiltrados.map((lugar) => {
                            const estaVisitado = visitados.includes(lugar.nombre);

                            const toggleVisitado = () => {
                                let nuevos;
                                if (estaVisitado) {
                                    nuevos = visitados.filter((item) => item !== lugar.nombre);
                                } else {
                                    nuevos = [...visitados, lugar.nombre];
                                }
                                setVisitados(nuevos);
                                localStorage.setItem("visitados", JSON.stringify(nuevos));
                            };

                            return (
                                <div
                                    key={lugar.id}
                                    className="card-sombra bg-white rounded-2xl p-4 flex shadow-md space-x-4 lugar-card"
                                >
                                    <img
                                        src={lugar.imagen}
                                        alt={lugar.nombre}
                                        className="rounded-xl w-32 h-32 object-cover"
                                    />
                                    <div className="flex flex-col justify-between flex-1">
                                        <div className="card-contenido">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-[#3b3b3b]">{lugar.nombre}</h3>
                                                    <p className="text-sm text-gray-500">{lugar.categoria}</p>
                                                </div>
                                            </div>

                                            <div className="bg-[#f7f4f1] rounded-xl p-2 mt-2 text-sm">
                                                <p className="text-gray-500 font-semibold">Dirección</p>
                                                <p className="text-[#3b3b3b]">{lugar.direccion}</p>
                                            </div>

                                            <div className="bg-[#f7f4f1] rounded-xl p-2 mt-2 text-sm">
                                                <p className="text-gray-500 font-semibold">Descripción: </p>
                                                <p className="text-[#3b3b3b]">{lugar.descripcion}</p>
                                            </div>

                                            <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                                                {lugar.distancia} km
                                            </span>
                                        </div>

                                        <div className="container-input mt-2">
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={estaVisitado}
                                                    onChange={toggleVisitado}
                                                    className="w-4 h-4 accent-[#a9443d]"
                                                />
                                                <span className="text-sm text-[#3b3b3b] font-medium">Marcar como visitado</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-500">No se encontraron lugares con esos filtros.</p>
                    )}
                </div>

                {/* <div className="card-lugar space-y-6">
                    {lugaresFiltrados.length > 0 ? (
                        lugaresFiltrados.map((lugar) => (
                            <div
                                key={lugar.id}
                                className="card-sombra bg-white rounded-2xl p-4 flex shadow-md space-x-4 lugar-card"
                            >
                                <img
                                    src={lugar.imagen}
                                    alt={lugar.nombre}
                                    className="rounded-xl w-32 h-32 object-cover"
                                />
                                <div className="flex flex-col justify-between flex-1">
                                    <div className='card-contenido'>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold text-[#3b3b3b]">{lugar.nombre}</h3>
                                                <p className="text-sm text-gray-500">{lugar.categoria}</p>
                                            </div>
                                        </div>

                                        <div className="bg-[#f7f4f1] rounded-xl p-2 mt-2 text-sm">
                                            <p className="text-gray-500 font-semibold">Dirección</p>
                                            <p className="text-[#3b3b3b]">{lugar.direccion}</p>
                                        </div>

                                        <div className="bg-[#f7f4f1] rounded-xl p-2 mt-2 text-sm">
                                            <p className="text-gray-500 font-semibold">Descripción: </p>
                                            <p className="text-[#3b3b3b]">{lugar.descripcion}</p>
                                        </div>
                                        <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                                            {lugar.distancia} km
                                        </span>
                                    </div>

                                    <div className="container-input">
                                        <input
                                            type="checkbox"
                                            checked={estaVisitado}
                                            onChange={toggleVisitado}
                                        />
                                        <span> Marcar como visitado </span>
                                    </div>

                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No se encontraron lugares con esos filtros.</p>
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default Sugerencias;
