import React, { useState, useContext } from 'react';
import { AuthContext } from './GlobalContext';
import './RegistrarIncidencia.css';

function RegistrarIncidencia() {
    const { usuarioLogin } = useContext(AuthContext);
    const [incidencia, setIncidencia] = useState({
        titulo: '',
        descripcion: '',
        categoria: 'Hardware',
        urgencia: 'Normal',
        ubicacion: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncidencia(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construimos el objeto exacto que se guardará en db.json
        const nuevaIncidencia = {
            titulo: incidencia.titulo,
            descripcion: incidencia.descripcion,
            categoria: incidencia.categoria,
            urgencia: incidencia.urgencia,
            ubicacion: incidencia.ubicacion,
            estado: "Abierta",
            fecha: new Date().toLocaleDateString('es-ES'),
            userId: usuarioLogin.email // Esto es lo que usaremos para filtrar
        };

        try {
            const respuesta = await fetch("http://localhost:4000/incidencias", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaIncidencia)
            });

            if (respuesta.ok) {
                alert('Incidencia guardada correctamente');
                // Limpiar el formulario
                setIncidencia({
                    titulo: '',
                    descripcion: '',
                    categoria: 'Hardware',
                    urgencia: 'Normal',
                    ubicacion: ''
                });
            } else {
                alert('Error en el servidor al guardar');
            }
        } catch (error) {
            console.error("Error:", error);
            alert('No se pudo conectar con el servidor');
        }
    };

    return (
        <div className="registrar-incidencia-container">
            <div className="registrar-incidencia-card">
                <h1 className="titulo-formulario">Nueva Incidencia</h1>
                <p className="text-muted text-center">Registrando como: {usuarioLogin.email}</p>
                
                <form onSubmit={handleSubmit} className="formulario-incidencia">
                    <div className="campo">
                        <label>Título</label>
                        <input type="text" name="titulo" value={incidencia.titulo} onChange={handleChange} required />
                    </div>

                    <div className="campo">
                        <label>Descripción</label>
                        <textarea name="descripcion" value={incidencia.descripcion} onChange={handleChange} required />
                    </div>

                    <div className="grupo-campos dos-columnas">
                        <div className="campo">
                            <label>Categoría</label>
                            <select name="categoria" value={incidencia.categoria} onChange={handleChange}>
                                <option value="Hardware">Hardware</option>
                                <option value="Software">Software</option>
                                <option value="Red">Red</option>
                            </select>
                        </div>
                        <div className="campo">
                            <label>Urgencia</label>
                            <select name="urgencia" value={incidencia.urgencia} onChange={handleChange}>
                                <option value="Baja">Baja</option>
                                <option value="Normal">Normal</option>
                                <option value="Alta">Alta</option>
                            </select>
                        </div>
                    </div>

                    <div className="campo">
                        <label>Ubicación</label>
                        <input type="text" name="ubicacion" value={incidencia.ubicacion} onChange={handleChange} required />
                    </div>

                    <button type="submit" className="boton-registrar">Enviar a Soporte</button>
                </form>
            </div>
        </div>
    );
}

export default RegistrarIncidencia;