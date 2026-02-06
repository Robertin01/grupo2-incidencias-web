import React, { useState } from 'react';
import './RegistrarIncidencia.css';


// Componente para registrar una nueva incidencia

function RegistrarIncidencia({ onRegistrar }) {
    const [incidencia, setIncidencia] = useState({
        id_incidencia: 1,
        titulo: '',
        descripcion: '',
        categoria: 'Hardware',
        nivel_urgencia: 'Normal',
        fecha_registro: new Date().toISOString().split('T')[0],
        estado: 'Abierta',
        ubicacion: ''
    });

    // funcion que se encarga de actualizar el estado del formulario conforme se van llenando los campos

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncidencia(prevState => ({
            ...prevState,
            [name]: value,
            fecha_registro: name === 'fecha_registro' ? value : prevState.fecha_registro
        }));
    };


    // funcion que se encarga de enviar los datos del formulario al componente padre

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar campos obligatorios
        if (!incidencia.id_usuario || !incidencia.titulo || !incidencia.descripcion || !incidencia.ubicacion) {
            alert('Por favor, completa todos los campos obligatorios');
            return;
        }

        // Pasar la incidencia al componente padre y muestra una alerta de confirmacion del registro
        if (onRegistrar) {
            onRegistrar(incidencia);
        }
        alert('Incidencia registrada exitosamente');

        // Limpiar formulario y lo prepara para una nueva incidencia dandole un valor predefinido
        setIncidencia({
            id_incidencia: incidencia.id_incidencia + 1,
            titulo: '',
            descripcion: '',
            categoria: 'Hardware',
            nivel_urgencia: 'Normal',
            fecha_registro: new Date().toISOString().split('T')[0],
            estado: 'Abierta',
            ubicacion: ''
        });
    };

    // funcion que sirve para limpar el formulario sinque se envien datos. (toISOSString es para mantener el formato de fecha)
    const handleReset = () => {
        setIncidencia({
            id_incidencia: incidencia.id_incidencia,
            titulo: '',
            descripcion: '',
            categoria: 'Hardware',
            nivel_urgencia: 'Normal',
            fecha_registro: new Date().toISOString().split('T')[0],
            estado: 'Abierta',
            ubicacion: ''
        });
    };

    return (
        <div className="registrar-incidencia-container">
            <div className="registrar-incidencia-card">
                <h1 className="titulo-formulario">Registrar Incidencia</h1>

                <form onSubmit={handleSubmit} className="formulario-incidencia">

                    <div className="grupo-campos dos-columnas">
                        {/* <div className="campo">
                            <label htmlFor="id_usuario">ID Usuario *</label>
                            <input
                                type="text"
                                id="id_usuario"
                                name="id_usuario"
                                value={incidencia.id_usuario}
                                onChange={handleChange}
                                placeholder="ej: e768590345h"
                                required
                            />
                        </div> */}

                        <div className="campo">
                            <label htmlFor="titulo">Título *</label>
                            <input
                                type="text"
                                id="titulo"
                                name="titulo"
                                value={incidencia.titulo}
                                onChange={handleChange}
                                placeholder="Resumen de la incidencia"
                                required
                            />
                        </div>
                    </div>

                    <div className="campo">
                        <label htmlFor="descripcion">Descripción *</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={incidencia.descripcion}
                            onChange={handleChange}
                            placeholder="Describe el problema en detalle"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div className="grupo-campos dos-columnas">
                        <div className="campo">
                            <label htmlFor="categoria">Categoría</label>
                            <select
                                id="categoria"
                                name="categoria"
                                value={incidencia.categoria}
                                onChange={handleChange}
                            >
                                <option value="Hardware">Hardware</option>
                                <option value="Software">Software</option>
                                <option value="Red">Red</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        <div className="campo">
                            <label htmlFor="nivel_urgencia">Nivel de Urgencia</label>
                            <select
                                id="nivel_urgencia"
                                name="nivel_urgencia"
                                value={incidencia.nivel_urgencia}
                                onChange={handleChange}
                            >
                                <option value="Baja">Baja</option>
                                <option value="Normal">Normal</option>
                                <option value="Alta">Alta</option>
                                <option value="Crítica">Crítica</option>
                            </select>
                        </div>
                    </div>

                    <div className="grupo-campos dos-columnas">
                        <div className="campo">
                            <label htmlFor="ubicacion">Ubicación *</label>
                            <input
                                type="text"
                                id="ubicacion"
                                name="ubicacion"
                                value={incidencia.ubicacion}
                                onChange={handleChange}
                                placeholder="ej: A301"
                                required
                            />
                        </div>

                        <div className="campo">
                            <label htmlFor="fecha_registro">Fecha de Registro</label>
                            <input
                                type="date"
                                id="fecha_registro"
                                name="fecha_registro"
                                value={incidencia.fecha_registro}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grupo-campos dos-columnas">
                        <div className="campo">
                            <label htmlFor="estado">Estado</label>
                            <select
                                id="estado"
                                name="estado"
                                value={incidencia.estado}
                                onChange={handleChange}
                            >
                                <option value="Abierta">Abierta</option>
                                <option value="En Progreso">En Progreso</option>
                                <option value="Cerrada">Cerrada</option>
                            </select>
                        </div>

                        <div className="campo">
                            <label htmlFor="id_incidencia">ID Incidencia</label>
                            <input
                                type="number"
                                id="id_incidencia"
                                name="id_incidencia"
                                value={incidencia.id_incidencia}
                                disabled
                                className="input-disabled"
                            />
                        </div>
                    </div>

                    <div className="grupo-botones">
                        <button type="submit" className="boton boton-registrar">
                            Registrar Incidencia
                        </button>
                        <button type="button" className="boton boton-limpiar" onClick={handleReset}>
                            Limpiar Formulario
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegistrarIncidencia;
