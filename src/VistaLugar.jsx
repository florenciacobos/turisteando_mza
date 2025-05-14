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

const Login = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  const lugarId = 1; // ejemplo
  const lugar = mockPOIs.find((item) => item.id === lugarId);

  const [favoritos, setFavoritos] = React.useState([]);

  const toggleFavorito = (nombreLugar) => {
    setFavoritos((prevFavoritos) => {
      let nuevos;
      if (prevFavoritos.includes(nombreLugar)) {
        nuevos = prevFavoritos.filter((item) => item !== nombreLugar);
      } else {
        nuevos = [...prevFavoritos, nombreLugar];
      }
      localStorage.setItem("favoritos", JSON.stringify(nuevos));
      return nuevos;
    });
  };
  const esFavorito = favoritos.includes(lugar.name);

  const [visitados, setVisitados] = React.useState(() => {
    return JSON.parse(localStorage.getItem("visitados")) || [];
  });
  const estaVisitado = visitados.includes(lugar.name);

  const toggleVisitado = () => {
    let nuevos;
    if (estaVisitado) {
      nuevos = visitados.filter((item) => item !== lugar.name);
    } else {
      nuevos = [...visitados, lugar.name];
    }
    setVisitados(nuevos);
    localStorage.setItem("visitados", JSON.stringify(nuevos));
  };


  const data = [
    //ejemplo
    {
      src: "https://billiken.lat/wp-content/uploads/2022/01/portones-768x455.jpeg",
    },
    {
      src: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/65000/65201-General-San-Martin-Park.jpg",
    },
    {
      src: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/65000/65195-General-San-Martin-Park.jpg",
    },
  ];

  return (
    <div className="container-vista-lugar">
      <div className="header-vista-lugar">
        {/* Flecha para volver al inicio*/}
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

        {/* Corazon para agregar/eliminar de favoritos */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill={esFavorito ? "#5d2120" : "none"}
          stroke="#5d2120"
          className="bi bi-heart"
          viewBox="0 0 20 20"
          style={{ cursor: "pointer" }}
          onClick={() => toggleFavorito(lugar.name)}
        >
          {esFavorito ? (
            // Corazón lleno
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
            />
          ) : (
            // Corazón vacío
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          )}
        </svg>
      </div>

      <div>
        <h2>{lugar?.name}</h2>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            py: 2,
            overflow: "auto",
            width: "90vw",
            scrollSnapType: "x mandatory",
            "& > *": {
              scrollSnapAlign: "center",
            },
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          {data.map((item, index) => (
            <Card
              orientation="horizontal"
              size="m"
              key={index}
              variant="outlined"
            >
              <AspectRatio ratio="1.5" sx={{ minWidth: 300 }}>
                <img
                  srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.src}?h=120&fit=crop&auto=format`}
                  alt="Imagen parque"
                  className="img-lugar"
                />
              </AspectRatio>
            </Card>
          ))}
        </Box>

        <div className="container-tag">
          <span className="tag">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-tree"
              viewBox="0 0 16 16"
            >
              <path d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777zM6.437 4.758A.5.5 0 0 0 6 4.5h-.066L8 1.401 10.066 4.5H10a.5.5 0 0 0-.424.765L11.598 8.5H11.5a.5.5 0 0 0-.447.724L12.69 12.5H3.309l1.638-3.276A.5.5 0 0 0 4.5 8.5h-.098l2.022-3.235a.5.5 0 0 0 .013-.507" />
            </svg>
            Paque Urbano
          </span>
          <span className="tag">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-coin"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
            </svg>
            Gratis
          </span>
          <span className="tag">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-door-open"
              viewBox="0 0 16 16"
            >
              <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
              <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
            </svg>
            Abierto 24hs
          </span>
          <span className="tag">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="16"
              height="16"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            4.8
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

        <div className="container-direccion">
          <h6>Dirección</h6>
          <p>Av. Emilio Civit 701, Ciudad, Mendoza</p>
        </div>
        <div className="container-descripcion">
          <h6>Descripción</h6>
          <p>{lugar?.description}</p>
        </div>
      </div>

      <div className="container-comentarios">
        {/* Comentario 1 */}
        <Card
          variant="outlined"
          sx={{
            width: "40vw",
            // to make the card resizable
            overflow: "auto",
            resize: "horizontal",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar>CG</Avatar>
            <Typography level="title-lg">Camila Gómez</Typography>
          </Box>
          <CardContent>
            <Typography level="body-sm">
              Es un lugar increible para poder relajarse y pasarlo con familia.
              Recomendadísimo!!
            </Typography>
          </CardContent>
        </Card>

        {/* Comentario 2 */}
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            width: "40vw",
            // to make the card resizable
            overflow: "auto",
            resize: "horizontal",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar>JS</Avatar>
            <Typography level="title-lg">Jack Ross</Typography>
          </Box>
          <CardContent>
            <Typography level="body-sm">
              It is an incredible place to relax and spend time with family.
              Highly recommended!
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
