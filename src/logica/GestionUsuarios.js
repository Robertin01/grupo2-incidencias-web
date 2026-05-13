import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from './GlobalContext';

const GestionUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const { usuarioLogin } = useContext(AuthContext);

    const obtenerUsuarios = async () => {
        try {
            const respuesta = await fetch("http://localhost:4000/users", {
                headers: {
                    'Authorization': 'Bearer ' + usuarioLogin.token
                }
            });
            const datos = await respuesta.json();
            setUsuarios(datos);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const cambiarRol = async (id, nuevoRol) => {
        try {
            const url = "http://localhost:4000/users/" + id;
            const respuesta = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + usuarioLogin.token
                },
                body: JSON.stringify({ rol: nuevoRol })
            });

            if (respuesta.ok) {
                setUsuarios(prev => prev.map(u =>
                    u.id === id ? { ...u, rol: nuevoRol } : u
                ));
            } else {
                alert("Error al cambiar el rol.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarUsuario = async (id) => {
        if (id === usuarioLogin.id) {
            alert("No puedes eliminar tu propia cuenta.");
            return;
        }

        if (window.confirm("¿Seguro que quieres eliminar el usuario " + id + "?")) {
            try {
                const url = "http://localhost:4000/users/" + id;
                const respuesta = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + usuarioLogin.token
                    }
                });

                if (respuesta.ok) {
                    setUsuarios(prev => prev.filter(u => u.id !== id));
                } else {
                    alert("Error al eliminar. Estado: " + respuesta.status);
                    obtenerUsuarios();
                }
            } catch (error) {
                console.error(error);
                obtenerUsuarios();
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Gestión de Usuarios</h2>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.email}</td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={u.rol}
                                        onChange={(e) => cambiarRol(u.id, e.target.value)}
                                        disabled={u.id === usuarioLogin.id}
                                    >
                                        <option value="comun">comun</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarUsuario(u.id)}
                                        disabled={u.id === usuarioLogin.id}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {usuarios.length === 0 && (
                <div className="alert alert-info">No hay usuarios.</div>
            )}

            <footer className="bg-dark text-white text-center p-3 mt-4">
                <p>Proyecto Equipo 2026</p>
            </footer>
        </div>
    );
};

export default GestionUsuarios;