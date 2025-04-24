import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
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

      <button onClick={handleBack} className="back-button">
        Volver
      </button>
      
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
        <span className="register-link" onClick={() => console.log('Ir a registro')}>
          regístrate
        </span>
      </p>
    </div>
  );
};

export default Login;