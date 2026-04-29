import React, { useState, useContext } from 'react';
import './Login.css';
import { AuthContext } from './GlobalContext';

function Login({ irARegistro }) { // Recibimos la función para cambiar de vista
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-titulo">Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <div className="login-campo">
                        <label>Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="ejemplo@iesgijon.es" 
                            required 
                        />
                    </div>
                    <div className="login-campo">
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Tu contraseña" 
                            required 
                        />
                    </div>
                    <button type="submit" className="login-boton">Entrar</button>
                    
                    <button 
                        type="button" 
                        onClick={irARegistro} 
                        className="btn btn-link mt-3" 
                        style={{textDecoration: 'none'}}>
                        ¿No tienes cuenta? Regístrate aquí
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;