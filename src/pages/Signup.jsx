import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";

const Signup = () => {
    const [role, setRole] = useState(""); // Estado para almacenar la selección del usuario
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        // Lógica para iniciar sesión con Google
        console.log("Iniciar sesión con Google");
    };

    const handleContinue = () => {
        if (role === "cliente") {
            navigate("/registro-cliente");
        } else if (role === "experto") {
            navigate("/registro-experto");
        } else {
            alert("Por favor selecciona una opción antes de continuar.");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-left">
                <h1>Encuentra, resuelve o trabaja con Chambi</h1>
                <ul>
                    <li>✓ Acceso a expertos cerca de ti.</li>
                    <li>✓ Servicios personalizados y confiables.</li>
                    <li>✓ Una plataforma diseñada para facilitar tu vida.</li>
                </ul>
            </div>
            <div className="signup-right">
                <h2>Inicia sesión en tu cuenta</h2>
                <p>
                    ¿No tienes cuenta aún? <a href="#create">Crea una aquí</a>
                </p>
                <button className="google-button" onClick={handleGoogleSignIn}>
                    <img
                        src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                        alt="Google"
                    />
                    Iniciar sesión con Google
                </button>
                <button className="email-button">Continuar con email/username</button>
                <div className="role-selection">
                    <h3>¿Qué deseas hacer?</h3>
                    <div>
                        <input
                            type="radio"
                            id="cliente"
                            name="role"
                            value="cliente"
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label htmlFor="cliente">Quiero buscar servicios</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="experto"
                            name="role"
                            value="experto"
                            onChange={(e) => setRole(e.target.value)}
                        />
                        <label htmlFor="experto">Quiero ofrecer mis servicios</label>
                    </div>
                </div>
                <button className="continue-button" onClick={handleContinue}>
                    Continuar
                </button>
                <p>
                    Al unirte, aceptas los <a href="#terms">Términos de servicio</a> y la{" "}
                    <a href="#privacy">Política de privacidad</a>.
                </p>
            </div>
        </div>
    );
};

export default Signup;
