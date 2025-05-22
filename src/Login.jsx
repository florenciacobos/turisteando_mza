import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/'); 
  };

  const handleLogin = () => {
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
  };

  return (
    <div className="login-container">

      <div className="login-hader">
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
      
      <h2 className="login-title">INICIAR SESIÓN</h2>

      <input
        type="text"
        placeholder="Nombre de usuario o mail"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />

      <div className="password-container">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>

      <button className="login-button" onClick={handleLogin}>
        Iniciar
      </button>

      <p className="register-text">
        Si aún no tienes cuenta{' '}
        <span className="register-link" onClick={() => navigate('/registrar')}>
          regístrate
        </span>
      </p>
    </div>
  );
};

export default Login;