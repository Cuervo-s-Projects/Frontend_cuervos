// src/components/LoginForm.jsx
// Antes de correr el programa, instalar:
// npm install axios

import { useState } from 'react';
import axios from 'axios';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try{
      const res = await axios.post(`http://127.0.0.1:5000/api/login`, {
        username,
        password,
      });
      localStorage.setItem('token', res.data.access_token);
      console.log(res.data.access_token)
      setMessage('✅ Login exitoso');
    }catch (err) {
      setMessage('❌ Credenciales inválidas');
    }   
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Correo"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
          <input type="submit" />
          {message && <p>{message}</p>}
    </form>
  )
}
