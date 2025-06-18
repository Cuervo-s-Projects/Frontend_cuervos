// src/components/SignupForm.jsx
import { useState } from 'react';
import axios from 'axios';

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPassword_confirm] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Formulario enviado');
        try {
            const res = await axios.post(`http://127.0.0.1:5000/api/signup`, {
                email,
                username,
                password,
                password_confirm
            });
            console.log(res.request)
            setMessage('✅ Registro exitoso. Ya puedes iniciar sesión.');
            setEmail('');
            setPassword('');
            setPassword_confirm('');
            setUsername('');
        } catch (err) {
            setMessage('❌ Error al registrar. Verifica los datos o intenta más tarde.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Correo electrónico:</label><br />
            <input
                type="email"
                id="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            /><br />

            <label htmlFor="username">Nombre de usuario:</label><br />
            <input
                type="username"
                id="username"
                placeholder="user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            /><br />

            <label htmlFor="password">Contraseña:</label><br />
            <input
                type="password"
                id="password"
                placeholder="Contraseña segura"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br />

            <label htmlFor="password_confirm">Contraseña:</label><br />
            <input
                type="password"
                id="password_confirm"
                placeholder="Contraseña segura"
                value={password_confirm}
                onChange={(e) => setPassword_confirm(e.target.value)}
                required
            /><br />

            <input type="submit" value="Crear cuenta" />

            {message && <p>{message}</p>}
        </form>
    );
}
