// src/components/SignupForm.jsx
import { useState } from 'react';
import axios from 'axios';

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
                email,
                password,
            });

            setMessage('✅ Registro exitoso. Ya puedes iniciar sesión.');
            setEmail('');
            setPassword('');
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

            <label htmlFor="password">Contraseña:</label><br />
            <input
                type="password"
                id="password"
                placeholder="Contraseña segura"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br />

            <input type="submit" value="Crear cuenta" />

            {message && <p>{message}</p>}
        </form>
    );
}
