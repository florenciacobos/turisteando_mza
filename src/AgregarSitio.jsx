import React, { useState, useEffect } from "react";
import { Box, TextField, Card, CardContent, Typography } from "@mui/material";
import { PhotoCamera} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import "./App.css";
import { subirLugarConFoto } from "./lib/lugarService";

export default function AgregarSitio() {
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  /* categorias q deberian estar cargadas en la bd */
  const options = [
    "Actividades recreativas",
    "Bodegas",
    "Gastronomía",
    "Lugares de esparcimiento",
    "Mall/Centro comercial",
    "Sitios patrimoniales",
  ];
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);

  useEffect(() => {
    //obtener la lat y long de la ubicacion actual del usuario
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitud(position.coords.latitude);
          setLongitud(position.coords.longitude);
          console.log(
            "Ubicación actual:",
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
          alert(
            "No se pudo obtener tu ubicación. Activá el GPS o los permisos de ubicación."
          );
        }
      );
    } else {
      alert("Tu navegador no soporta la geolocalización.");
    }
  }, []);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  //al cargar una imagen la muestra
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAgregar = async () => {
    if (!nombre || !descripcion || !imagen || !latitud || !longitud) {
      alert("Completa todos los campos y activa la ubicación");
      return;
    }

    const resultado = await subirLugarConFoto({
      nombre,
      descripcion,
      categoria: value,
      archivoFoto: imagen,
      latitud,
      longitud,
    });

    if (resultado.success) {
      alert("Sitio agregado correctamente");
      setNombre("");
      setDescripcion("");
      setImagen(null);
      setPreview(null);
      setValue(options[0]);
      setInputValue("");
    } else {
      alert("Error: " + resultado.error);
    }
  };

  return (
    <div>
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
      </div>

      <h2 className="text-xl font-semibold text-center text-[#3b3b3b]">
        AGREGAR SITIO
      </h2>

      <Box display="flex" justifyContent="center" mt={3}>
        <Card sx={{ width: "80vw", p: 2, boxShadow: 3, borderRadius: 6 }}>
          <Box display="flex" flexDirection="column" textAlign="left">
            <Box
              component="label"
              htmlFor="upload-img"
              sx={{
                width: "70vw",
                height: 200,
                backgroundColor: "#ddd",
                borderRadius: 5,
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <PhotoCamera sx={{ fontSize: 40 }} />
              )}
              <input
                type="file"
                id="upload-img"
                accept="image/*"
                onChange={handleImagenChange}
                hidden
              />
            </Box>

            <CardContent>
              <Typography variant="subtitle1">Nombre del lugar</Typography>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                sx={{ mb: 2 }}
              />

              <div>
                <Typography variant="subtitle1">Categoría</Typography>
                <Autocomplete
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={options}
                  sx={{ width: "67vw" }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>

              <Typography variant="subtitle1">Descripción</Typography>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </CardContent>

            <Box display="flex" justifyContent="space-between" mt={2}>
              <button onClick={handleBack} className="btn-cancelar">
                Cancelar
              </button>

              <button onClick={handleAgregar} className="btn-agregar">
                Agregar
              </button>
            </Box>
          </Box>
        </Card>
      </Box>
    </div>
  );
}
