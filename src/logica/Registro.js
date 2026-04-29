import React, { useState, useContext } from 'react';
import { AuthContext } from './GlobalContext';

function Registro({ volver }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('comun');
    const { registrar } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const exito = await registrar(email, password, rol);
        if (exito) {
            volver(); // Si se crea bien, volvemos a la pantalla de Login
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-titulo">Crear Cuenta</h1>
                <form onSubmit={handleSubmit}>
                    <div className="login-campo">
                        <label>Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="correo@iesgijon.es"
                            required 
                        />
                    </div>
                    <div className="login-campo">
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Crea una contraseña"
                            required 
                        />
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
                    <button type="submit" className="login-boton">Registrar</button>
                    <button 
                        type="button" 
                        onClick={volver} 
                        className="btn btn-link mt-3" 
                        style={{textDecoration: 'none'}}>
                        ¿Ya tienes cuenta? Inicia sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Registro;