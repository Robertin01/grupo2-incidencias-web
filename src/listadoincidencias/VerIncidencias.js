import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../logica/GlobalContext';

const VerIncidencias = () => {
    const [incidencias, setIncidencias] = useState([]);
    const { usuarioLogin } = useContext(AuthContext);

    useEffect(() => {
        const obtenerIncidencias = async () => {
            try {
                const respuesta = await fetch("http://localhost:4000/incidencias");
                const datos = await respuesta.json();

                if (usuarioLogin.rol === 'admin') {
                    setIncidencias(datos); // El admin ve todo
                } else {
                    // El común solo ve las suyas (comparando con su email)
                    const filtradas = datos.filter(inc => inc.userId === usuarioLogin.email);
                    setIncidencias(filtradas);
                }
            } catch (error) {
                console.error("Error al cargar incidencias:", error);
            }
        };

        obtenerIncidencias();
    }, [usuarioLogin]);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Listado de Incidencias ({usuarioLogin.rol})</h2>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
                        <th>Urgencia</th>
                        <th>Ubicación</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {incidencias.map((incidencia) => (
                        <tr key={incidencia.id}>
                            <td>{incidencia.id}</td>
                            <td>{incidencia.titulo}</td>
                            <td>{incidencia.descripcion}</td>
                            <td>{incidencia.categoria}</td>
                            <td>{incidencia.urgencia}</td>
                            <td>{incidencia.ubicacion}</td>
                            <td>{incidencia.estado}</td>
                            <td>{incidencia.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {incidencias.length === 0 && <div className="alert alert-info">No hay incidencias que mostrar.</div>}
            
            <footer className="bg-dark text-white text-center p-3 mt-4">
                <p>Proyecto Equipo 2026</p>
            </footer>
        </div>
    );
};

export default VerIncidencias;