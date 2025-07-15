import { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    console.log('Formulario enviado');

    try {
      const res = await axios.post(`http://127.0.0.1:5000/api/login`, {
        email,
        password,
      });

      if (res.status === 200) {
        const token = res.data.access_token;
        localStorage.setItem('token', token);
        console.log('Token:', token);

        // 🔥 Nueva llamada a /profile para obtener el user_id
        const profileRes = await axios.get('http://127.0.0.1:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (profileRes.status === 200) {
          const userId = profileRes.data._id;
          localStorage.setItem('user_id', userId);
          console.log('user_id:', userId);
        } else {
          console.warn('No se pudo obtener el perfil');
        }

        setEmail('');
        setPassword('');
        setMessage('Login exitoso');
        navigate('/');
      } else {
        console.log('Credenciales inválidas');
        setMessage('Credenciales inválidas');
      }
    } catch (err) {
      console.error('Error en login:', err);
      setMessage('Credenciales inválidas');
    }
  };

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
      <button
        className="login-button"
        type="submit"
        style={{ backgroundColor: '#28a745', borderColor: '#28a745', color: '#fff' }}
      >
        Iniciar Sesión
      </button>

      {message && (
        <p
          className="login-message"
          style={{
            color: message === 'Login exitoso' ? 'green' : 'red',
            fontWeight: 'bold',
            marginTop: '10px',
          }}
        >
          {message === 'Login exitoso' ? '✅ Acceso exitoso' : `${message}`}
        </p>
      )}
    </form>
  );
}
