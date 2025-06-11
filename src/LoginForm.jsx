import { useState } from 'react';
import axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('✔ handleSubmit ejecutado');

    setMessage('Enviando...');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email,
        password,
      });
      console.log('Respuesta:', res.data);
      setMessage('✅ Login exitoso');
    } catch (err) {
      console.error(err);
      setMessage('❌ Error en login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        placeholder="Correo"
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        value={password}
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button type="submit">Ingresar</button>
      <p>{message}</p>
    </form>
  );
}
  