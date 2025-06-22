// src/components/SignupForm.jsx
import { useState } from 'react';
import axios from 'axios';
import '../styles/signup.css';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPassword_confirm] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://127.0.0.1:5000/api/signup`, {
        email,
        username,
        password,
        password_confirm,
      });
      setMessage('✅ Registro exitoso. Ya puedes iniciar sesión.');
      setEmail('');
      setUsername('');
      setPassword('');
      setPassword_confirm('');
    } catch (err) {
      setMessage('❌ Error al registrar. Verifica los datos o intenta más tarde.');
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <input
        type="email"
        id="email"
        className="signup-input"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        id="username"
        className="signup-input"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        id="password"
        className="signup-input"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        id="password_confirm"
        className="signup-input"
        placeholder="Repetir contraseña"
        value={password_confirm}
        onChange={(e) => setPassword_confirm(e.target.value)}
        required
      />

      <button type="submit" className="signup-button">Crear cuenta</button>

      {message && <p className="signup-message">{message}</p>}
    </form>
  );
}
