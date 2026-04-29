import React, { useState, useContext } from 'react';
import VerIncidencias from '../listadoincidencias/VerIncidencias';
import RegistrarIncidencia from './RegistrarIncidencia';
import { AuthContext } from './GlobalContext';

export default function PantallaPrincipal() {
    const { usuarioLogin, logout } = useContext(AuthContext);
    const [vista, setVista] = useState('inicio'); 
    
    const isAdmin = usuarioLogin?.rol === 'admin';

    return (
        <div className="container-fluid p-0">
            <header className="bg-dark text-white text-center py-4">
                <h1>SISTEMA DE INCIDENCIAS - IES GIJÓN</h1>
                <p>Conectado como: <strong>{usuarioLogin?.email}</strong> ({usuarioLogin?.rol})</p>
            </header>

            <nav className="d-flex justify-content-center gap-3 my-5">
                <button className="btn btn-primary" onClick={() => setVista('ver')}>
                    VER INCIDENCIAS
                </button>
                <button className="btn btn-success" onClick={() => setVista('reg')}>
                    REGISTRAR NUEVA
                </button>
                {isAdmin && (
                    <button className="btn btn-warning" onClick={() => setVista('gestion')}>
                        GESTIÓN USUARIOS
                    </button>
                )}
                <button className="btn btn-danger" onClick={logout}>
                    CERRAR SESIÓN
                </button>
            </nav>

            <div className="container pb-5">
                {vista === 'inicio' && (
                    <div className="text-center text-muted mt-5">
                        <h3>Bienvenido. Selecciona una opción del menú.</h3>
                    </div>
                )}
                
                {vista === 'ver' && <VerIncidencias userRole={usuarioLogin?.rol} />}
                {vista === 'reg' && <RegistrarIncidencia />}
                {vista === 'gestion' && isAdmin && (
                    <div className="card p-4 shadow">
                        <h2>Panel de Administración</h2>
                        <p>Solo visible para administradores.</p>
                    </div>
                )}
            </div>
        </div>
    );
}