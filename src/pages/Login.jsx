// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../src/css/Login.css';
import { auth } from '../services/firebase'; // Asegúrate de tener configurado Firebase Auth
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/search'); // Redirige a la página de búsqueda después del login
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Credenciales inválidas. Por favor, intenta nuevamente.");
        }
    };

    return (
        <div className="login-container">
            <h2>Inicia Sesión en Chambi</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
            <p>
                ¿No tienes una cuenta? <a href="/join">Regístrate ahora</a>
            </p>
        </div>
    );
};

export default Login;
