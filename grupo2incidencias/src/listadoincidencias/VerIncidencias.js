import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import datos from './incidencias.json';

const VerIncidencias = () => {
  return (
    <div className="container mt-4">
      

      {/* Tabla*/}
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
          {datos.map((incidencia) => (
            <tr key={incidencia.id}>
                {/* Cada propiedad es una celda <td>*/}
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

      {/* Footer*/}
      <footer className="bg-dark text-white text-center">
        <p>Proyecto Equipo 2026</p>
      </footer>
    </div>
  );
};

export default VerIncidencias;