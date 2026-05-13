import React, { useState, useContext } from 'react';
import { AuthContext } from './GlobalContext';

function Registro({ volver }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { registrar } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Enviamos siempre 'comun' por seguridad
        const exito = await registrar(email, password, 'comun');
        if (exito) {
            volver();
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

                    <button type="submit" className="login-boton">Registrar</button>
                    
                    <button
                        type="button"
                        onClick={volver}
                        className="btn btn-link mt-3"
                        style={{ textDecoration: 'none' }}>
                        ¿Ya tienes cuenta? Inicia sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Registro;