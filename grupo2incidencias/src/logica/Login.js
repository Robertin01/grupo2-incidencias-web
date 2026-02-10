import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-titulo">Iniciar Sesión</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="login-campo">
                        <label>Usuario</label>
                        <input
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            placeholder="Ingresa tu usuario"
                        />
                    </div>

                    <div className="login-campo">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>

                    <button type="submit" className="login-boton">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;