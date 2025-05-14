import React, { useState } from 'react';


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


    return (
        <div className="p-5 bg-[#fdf8f3] min-h-screen font-sans">
            <h2 className="text-xl font-semibold mb-4 text-center text-[#3b3b3b]">
                Lugares sugeridos
            </h2>

            {/* Filtros */}
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
                {sugerencias.map((lugar) => (
                    <div
                        key={lugar.id}
                        className="card-sombra bg-white rounded-2xl p-4 flex flex bg-white rounded-2xl shadow-md p-4 space-x-4 lugar-card"
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

                            <button className="btn-visitado w-full bg-[#a9443d] text-white text-sm font-medium py-2 rounded-lg mt-3 hover:bg-[#922e2a] transition">
                                Marcar como visitado
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sugerencias;
