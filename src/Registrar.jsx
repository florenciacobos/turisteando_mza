import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Registrar = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/'); 
  };

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    genero: '',
    pais: '',
    mail: '',
    contraseña: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    console.log('Formulario:', form);
    // Aquí va la lógica para registrar
  };

  return (
    <div className="register-container">

      <div className='registrar-header'>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="back-arrow"
        viewBox="0 0 16 16"
        onClick={handleBack}
      >
        <path
          fillRule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
      />
      </svg>
      </div>

      <h2 className="register-title">REGISTRO</h2>

      <div className="input-row">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
          onChange={handleChange}
          className="register-input"
        />
      </div>

      <div className="input-row">
        <input
          type="date"
          name="fechaNacimiento"
          placeholder="Fecha de nacimiento"
          value={form.fechaNacimiento}
          onChange={handleChange}
          className="register-input"
        />
        <select
          name="genero"
          value={form.genero}
          onChange={handleChange}
          className="register-input"
        >
          <option value="">Género</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <select
        name="pais"
        value={form.pais}
        onChange={handleChange}
        className="register-input full-width"
      >
        <option value="">País de origen</option>
        <option value="argentina">Argentina</option>
        <option value="chile">Chile</option>
        <option value="uruguay">Uruguay</option>
        {/* Agrega más opciones */}
      </select>

      <input
        type="email"
        name="mail"
        placeholder="Mail"
        value={form.mail}
        onChange={handleChange}
        className="register-input full-width"
      />

      <div className="password-container">
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={form.contraseña}
          onChange={handleChange}
          className="register-input full-width"
        />
      </div>

      <button className="register-button" onClick={handleRegister}>
        Registrarme
      </button>

      <p className="login-text">
        Si ya tienes una cuenta{' '}
        <span className="login-link" onClick={() => navigate('/Login')}>
          inicia sesión
        </span>
      </p>
    </div>
  );
};

export default Registrar;
