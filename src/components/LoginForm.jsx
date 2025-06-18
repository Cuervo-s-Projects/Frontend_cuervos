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
    console.log('Formulario enviado');

    try{
      const res = await axios.post(`http://127.0.0.1:5000/api/login`, {
        email,
        password,
      });

      if (res.status === 200){
        localStorage.setItem('token', res.data.access_token);
        console.log(res.data.access_token)
        setEmail('')
        setPassword('')
        setMessage('✅ Login exitoso');
      }else{
        console.log("Credenciales inválidas")
        setMessage("❌ Credenciales inválidas")
      }
    }catch (err) {
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
        required
      />
      <input
        className="login-input"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="login-button" type="submit">Iniciar Sesión</button>
      {message && <p className="login-message">{message}</p>}
    </form>
  );
}