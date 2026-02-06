import React, { useState } from 'react';
import './App.css';
import RegistrarIncidencia from './logica/RegistrarIncidencia';

function App() {
  const [incidencias, setIncidencias] = useState([]);

  const handleRegistrarIncidencia = (incidencia) => {
    // Almacenar la incidencia en la variable de estado
    setIncidencias([...incidencias, incidencia]);
    // Aquí se puede pasar el array de incidencias a otro componente cuando sea necesario
    console.log('Incidencia registrada:', incidencia);
    console.log('Total de incidencias:', incidencias.length + 1);
  };

  return (
    <div className="App">
      <RegistrarIncidencia onRegistrar={handleRegistrarIncidencia} />
    </div>
  );
}

export default App;
