import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../css/Signup.css";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("cliente"); // Valor por defecto: "cliente" (buscar servicios)
    const [showEmailInput, setShowEmailInput] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    // Función para manejar el inicio de sesión con Google
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Verificar si el usuario ya existe en Firestore
            const userRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userRef);

            if (!userDocSnap.exists()) {
                // Si no existe, crea un nuevo documento para el usuario
                // Aquí se añade el rol por defecto
                await setDoc(userRef, {
                    uid: user.uid,
                    email: user.email,
                    role: role, // Usar el rol seleccionado (por defecto "cliente")
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                });
                console.log("Nuevo usuario agregado a Firestore (Google)");
            } else {
                console.log("Usuario ya existe en Firestore (Google)");
            }

            console.log("Inicio de sesión exitoso con Google:", user);
            // Redirigir según el rol
            if (role === "cliente") {
                navigate("/registro-cliente");
            } else {
                navigate("/registro-experto");
            }
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
            alert("Error al iniciar sesión con Google");
        }
    };

    // Función para manejar el registro con email y contraseña
    const handleEmailSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            // Crear un documento para el usuario en Firestore
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                role: role, // Usar el rol seleccionado (por defecto "cliente")
            });

            console.log("Registro exitoso con email:", user);
            alert("Registro exitoso. Por favor, completa tu perfil.");
            // Redirigir según el rol
            if (role === "cliente") {
                navigate("/registro-cliente");
            } else {
                navigate("/registro-experto");
            }
        } catch (error) {
            console.error("Error al registrar con email:", error);
            alert("Error al registrar con email");
        }
    };

    // Función para manejar el botón "Continuar"
    const handleContinue = () => {
        // Si se está mostrando el input de email, realizar el registro con email
        if (showEmailInput) {
            if (!email || !password) {
                alert("Por favor, ingresa email y contraseña.");
                return;
            }
            handleEmailSignUp();
        } else {
            // Si no se muestra el input de email, se asume que se está usando Google Sign-In
            // Por lo tanto, simplemente redirigimos según el rol seleccionado
            if (role === "cliente") {
                navigate("/registro-cliente");
            } else if (role === "experto") {
                navigate("/registro-experto");
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-left">
                    <h1>No más problemas, Chambi esta aqui para ayudarte!</h1>
                    <ul>
                        <li>Busca servicios y expertos cerca de ti</li>
                        <li>Acuerda un precio</li>
                        <li>Gana tiempo o genera ganancias :'D</li>
                    </ul>
                </div>
                <div className="signup-right">
                    <h2>Registrate para comenzar</h2>
                    <p>
                        tienes una cuenta?{" "}
                        <a href="#!" onClick={() => setShowEmailInput(true)}>
                            inicia sesión!
                        </a>
                    </p>
                    <button className="google-button" onClick={handleGoogleSignIn}>
                        <img
                            className="google-icon"
                            src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                            alt="Google"
                        />
                        Continuar con Google
                    </button>
                    <button
                        className="email-button"
                        onClick={() => setShowEmailInput(true)}
                    >
                        <img
                            className="google-icon"
                            src="https://img.icons8.com/?size=100&id=82785&format=png&color=000000"
                            alt="Googlemail"
                        />
                        Continuar con tu email
                    </button>

                    {showEmailInput && (
                        <>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                            />
                        </>
                    )}

                    <div className="role-selection">
                        <h3>¿Qué deseas hacer?</h3>
                        <div>
                            <input
                                type="radio"
                                id="cliente"
                                name="role"
                                value="cliente"
                                checked={role === "cliente"} // Marcado por defecto si el rol es "cliente"
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
                                checked={role === "experto"} // Marcado si el rol es "experto"
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <label htmlFor="experto">Quiero ofrecer mis servicios</label>
                        </div>
                    </div>

                    <button className="continue-button" onClick={handleContinue}>
                        {showEmailInput ? "Registrar" : "Continuar"}
                    </button>
                    <p className="terms-text">
                        Al unirte, aceptas los{" "}
                        <a href="#terms">Términos de Servicio</a> de Chambi y recibir
                        ocasionalmente correos electrónicos de nuestra parte. Por favor,
                        lee nuestra{" "}
                        <a href="#privacy">Política de Privacidad</a> para saber cómo
                        usamos tus datos personales.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;