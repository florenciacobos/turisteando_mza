import { useNavigate } from "react-router-dom";
import mockPOIs from "./data/mockPOIs.js";
import "./App.css";
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import Avatar from "@mui/joy/Avatar";
import CardContent from "@mui/joy/CardContent";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabaseClient"; // Asegúrate que este archivo esté bien configurado
import { subirComentario } from "./lib/comentarioService";
import { obtenerComentariosPorLugar } from "./lib/comentarioService";


const VistaLugar = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate("/");

  const lugarId = 1; // este valor puede venir por props o URL
  const lugar = mockPOIs.find((item) => item.id === lugarId);

  const [favoritos, setFavoritos] = useState([]);
  const [visitados, setVisitados] = useState(() => {
    return JSON.parse(localStorage.getItem("visitados")) || [];
  });

  const esFavorito = favoritos.includes(lugar.name);
  const estaVisitado = visitados.includes(lugar.name);

  const toggleFavorito = (nombreLugar) => {
    setFavoritos((prev) => {
      const nuevos = prev.includes(nombreLugar)
        ? prev.filter((item) => item !== nombreLugar)
        : [...prev, nombreLugar];
      localStorage.setItem("favoritos", JSON.stringify(nuevos));
      return nuevos;
    });
  };

  const toggleVisitado = () => {
    const nuevos = estaVisitado
      ? visitados.filter((item) => item !== lugar.name)
      : [...visitados, lugar.name];
    setVisitados(nuevos);
    localStorage.setItem("visitados", JSON.stringify(nuevos));
  };

  const data = [
    { src: "https://billiken.lat/wp-content/uploads/2022/01/portones-768x455.jpeg" },
    { src: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/65000/65201-General-San-Martin-Park.jpg" },
    { src: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/65000/65195-General-San-Martin-Park.jpg" },
  ];

  // Comentarios
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);

  // Cargar comentarios al cargar el componente
  useEffect(() => {
    const cargarComentarios = async () => {
      const res = await obtenerComentariosPorLugar(lugar.id);
      if (res.success) {
        setComentarios(res.comentarios);
      } else {
        console.error(res.error);
      }
    };

    cargarComentarios();
  }, [lugar.id]);


  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const manejarEnvio = async () => {
    if (comentario.trim() === "") {
      alert("El comentario no puede estar vacío");
      return;
    }

    // Simular un usuario por ahora (en un futuro esto vendría del auth)
    const id_usuario = 2;

    const resultado = await subirComentario({
      id_usuario,
      id_lugar: lugarId,
      comentario,
    });

    if (!resultado.success) {
      console.error("Error al enviar comentario:", resultado.error);
      alert("Hubo un error al guardar el comentario");
      return;
    }

    setComentario("");
    setMostrarFormulario(false);
    alert("¡Comentario enviado con éxito!");

    // Recargar comentarios
    const { data, error } = await supabase
      .from("comentario")
      .select("*")
      .eq("id_lugar", lugarId)
      .order("fecha_creacion", { ascending: false });

    if (!error) {
      setComentarios(data);
    }
  };


  return (
    <div className="container-vista-lugar">
      <div className="header-vista-lugar header">
        <svg onClick={handleBack} xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
        </svg>

        <svg onClick={() => toggleFavorito(lugar.name)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={esFavorito ? "#5d2120" : "none"} stroke="#5d2120" className="bi bi-heart" viewBox="0 0 20 20" style={{ cursor: "pointer" }}>
          {esFavorito ? (
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
          ) : (
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748z" />
          )}
        </svg>
      </div>

      <h2>{lugar?.name}</h2>
      <Box sx={{
        display: "flex",
        gap: 1,
        py: 2,
        overflow: "auto",
        width: "90vw",
        scrollSnapType: "x mandatory",
        "& > *": { scrollSnapAlign: "center" },
        "::-webkit-scrollbar": { display: "none" },
      }}>
        {data.map((item, index) => (
          <Card key={index} orientation="horizontal" size="m" variant="outlined">
            <AspectRatio ratio="1.5" sx={{ minWidth: 300 }}>
              <img src={item.src} alt="Imagen lugar" className="img-lugar" />
            </AspectRatio>
          </Card>
        ))}
      </Box>

      <div className="container-tag">
        <span className="tag">Parque Urbano</span>
        <span className="tag">Gratis</span>
        <span className="tag">Abierto 24hs</span>
        <span className="tag">⭐ 4.8</span>
      </div>

      <div className="container-input">
        <input type="checkbox" checked={estaVisitado} onChange={toggleVisitado} />
        <span> Marcar como visitado </span>
      </div>

      <div className="container-direccion">
        <h6>Dirección</h6>
        <p>Av. Emilio Civit 701, Ciudad, Mendoza</p>
      </div>

      <div className="container-descripcion">
        <h6>Descripción</h6>
        <p>{lugar?.description}</p>
      </div>

      {/* Sección de comentarios */}
      <div className="container-comentarios">
        <button className="btn_dejar_comentario" onClick={toggleFormulario}>
          {mostrarFormulario ? "Cancelar comentario" : "Dejá tu comentario"}
        </button>

        {mostrarFormulario && (
          <div className="formulario-comentario">
            <textarea
              className="textArea-comentario"
              rows="3"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Escribí tu comentario..."
            />
            <button className="btn_enviar_comentario" onClick={manejarEnvio}>Enviar</button>
          </div>
        )}

        <div className="lista-comentarios">
          <h4>Comentarios:</h4>
          {comentarios.length === 0 && <p>Este lugar aún no tiene comentarios.</p>}
          {comentarios.map((c, index) => (
            <div key={c.id ?? index} className="comentario">
              <Card variant="outlined" sx={{ mb: 1 }}>
                <CardContent>
                  <Typography level="body1">{c.comentario}</Typography>
                  <Typography level="body3" sx={{ mt: 1, fontSize: "0.75rem", color: "gray" }}>
                    {new Date(c.fecha_creacion).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}

        </div>
      </div>
    </div >
  );
};

export default VistaLugar;
