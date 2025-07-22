import { useState } from 'react';
import axios from 'axios';
import '../styles/signup.css';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPassword_confirm] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/signup', {
        email,
        username,
        password,
        password_confirm,
        first_name: firstName,
        last_name: lastName,
        age: parseInt(age),
        date_birth: new Date(dateBirth).toUTCString(), // Formato tipo "Tue, 17 Jun 2025 21:33:47 GMT"
      });

      setMessage('✅ Registro exitoso. Ya puedes iniciar sesión.');
      setEmail('');
      setUsername('');
      setPassword('');
      setPassword_confirm('');
      setFirstName('');
      setLastName('');
      setAge('');
      setDateBirth('');
    } catch (err) {
      const errMsg = err.response?.data?.message || '❌ Error al registrar. Verifica los datos o intenta más tarde.';
      setMessage(`❌ ${errMsg}`);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="signup-input"
        placeholder="Nombre"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        className="signup-input"
        placeholder="Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="number"
        className="signup-input"
        placeholder="Edad"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <input
        type="date"
        className="signup-input"
        placeholder="Fecha de nacimiento"
        value={dateBirth}
        onChange={(e) => setDateBirth(e.target.value)}
        max={new Date().toISOString().split('T')[0]} // <-- aquí se limita la fecha
        required
      />
      <input
        type="email"
        className="signup-input"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        className="signup-input"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        className="signup-input"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
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
