import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { PhotoCamera, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./App.css";
// import { supabase } from '../supabaseClient'; // Asegurate de tener esto configurado

export default function AgregarSitio() {
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAgregar = async () => {
    if (!nombre || !descripcion || !imagen) {
      alert("Completa todos los campos");
      return;
    }

    /* // Subir imagen a Supabase Storage
    const { data: imgData, error: imgError } = await supabase.storage
      .from('imagenes') // nombre del bucket en Supabase
      .upload(`sitios/${imagen.name}`, imagen);

    if (imgError) {
      console.error(imgError);
      alert('Error al subir la imagen');
      return;
    }

    const imagenUrl = `https://<tu-proyecto>.supabase.co/storage/v1/object/public/imagenes/${imgData.path}`;

    // Guardar info en la base de datos
    const { error } = await supabase.from('sitios').insert([
      {
        nombre,
        descripcion,
        imagen_url: imagenUrl,
      },
    ]);

    if (error) {
      console.error(error);
      alert('Error al guardar en la base de datos');
    } else {
      alert('Sitio agregado correctamente');
      setImagen(null);
      setPreview(null);
      setNombre('');
      setDescripcion('');
    }*/
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
                height: 150,
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
