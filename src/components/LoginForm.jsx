// src/components/LoginForm.jsx
// Antes de correr el programa, instalar:
// npm install axios

import { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try{
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem('token', res.data.access_token);
      console.log(res.data.access_token)
      setMessage('✅ Login exitoso');
    } catch (err) {
      setMessage('❌ Credenciales inválidas');
    }   
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        className="login-input"
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" type="submit">Iniciar Sesión</button>
      {message && <p className="login-message">{message}</p>}
    </form>
  );
}