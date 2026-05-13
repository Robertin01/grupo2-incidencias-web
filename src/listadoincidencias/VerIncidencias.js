import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../logica/GlobalContext';

const VerIncidencias = () => {
    const [incidencias, setIncidencias] = useState([]);
    const { usuarioLogin } = useContext(AuthContext);

    const obtenerIncidencias = async () => {
        try {
            const respuesta = await fetch("http://localhost:4000/incidencias");
            const datos = await respuesta.json();

            if (usuarioLogin.rol === 'admin') {
                setIncidencias(datos);
            } else {
                const filtradas = datos.filter(inc => inc.userId === usuarioLogin.id);
                setIncidencias(filtradas);
            }
        } catch (error) {
            console.error("Error al cargar:", error);
        }
    };

    useEffect(() => {
        obtenerIncidencias();
    }, [usuarioLogin]);

    const cambiarEstado = async (id, nuevoEstado) => {
        try {
            const url = "http://localhost:4000/incidencias/" + id;

            const respuesta = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + usuarioLogin.token
                },
                body: JSON.stringify({ estado: nuevoEstado })
            });

            if (respuesta.ok) {
                setIncidencias(prev => prev.map(inc =>
                    inc.id === id ? { ...inc, estado: nuevoEstado } : inc
                ));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarIncidencia = async (id) => {
        const idNumerico = Number(id);
        if (!idNumerico || isNaN(idNumerico)) return;

        if (window.confirm("¿Seguro que quieres eliminar la incidencia " + idNumerico + "?")) {
            try {
                const urlBorrado = "http://localhost:4000/incidencias/" + idNumerico;

                const respuesta = await fetch(urlBorrado, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + usuarioLogin.token
                    }
                });

                if (respuesta.ok) {
                    setIncidencias(prev => prev.filter(inc => Number(inc.id) !== idNumerico));
                } else {
                    alert("Error al borrar en el servidor.");
                    obtenerIncidencias();
                }
            } catch (error) {
                console.error(error);
                obtenerIncidencias();
            }
        }
    };

    const isAdmin = usuarioLogin.rol === 'admin';

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Listado de Incidencias ({usuarioLogin.rol})</h2>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Categoría</th>
                            <th>Urgencia</th>
                            <th>Ubicación</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            {isAdmin && <th>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {incidencias.map((inc) => (
                            <tr key={inc.id}>
                                <td>{inc.id}</td>
                                <td>{inc.titulo}</td>
                                <td>{inc.descripcion}</td>
                                <td>{inc.categoria}</td>
                                <td>{inc.urgencia}</td>
                                <td>{inc.ubicacion}</td>
                                <td>
                                    {isAdmin ? (
                                        <select
                                            className="form-select form-select-sm"
                                            value={inc.estado}
                                            onChange={(e) => cambiarEstado(inc.id, e.target.value)}
                                        >
                                            <option value="Abierta">Abierta</option>
                                            <option value="En Progreso">En Progreso</option>
                                            <option value="Cerrada">Cerrada</option>
                                        </select>
                                    ) : (
                                        inc.estado
                                    )}
                                </td>
                                <td>{inc.fecha}</td>
                                {isAdmin && (
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => eliminarIncidencia(inc.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {incidencias.length === 0 && <div className="alert alert-info">No hay incidencias.</div>}

            <footer className="bg-dark text-white text-center p-3 mt-4">
                <p>Proyecto Equipo 2026</p>
            </footer>
        </div>
    );
};

export default VerIncidencias;