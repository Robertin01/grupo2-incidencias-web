import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [rol, setRol] = useState('comun'); 

    const handleSubmit = (e) => {
        e.preventDefault();
        
        onLogin(rol); 
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-titulo">Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <div className="login-campo">
                        <label>Usuario</label>
                        <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="Ingresa tu usuario" />
                    </div>
                    <div className="login-campo">
                        <label>Contraseña</label>
                        <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder="Ingresa tu contraseña" />
                    </div>
                    
                    <div className="login-campo">
                        <label>Tipo de Usuario</label>
                        <select 
                            value={rol} 
                            onChange={(e) => setRol(e.target.value)} 
                            className="form-select">
                            <option value="comun">Usuario Común</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>

                    <button type="submit" className="login-boton">Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;