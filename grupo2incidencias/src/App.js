import React, { useState } from 'react';
import './App.css';
import Login from './logica/Login';
import RegistrarIncidencia from './logica/RegistrarIncidencia';
import VerIncidencias from './listadoincidencias/VerIncidencias';

function App() {
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [incidencias, setIncidencias] = useState([]);

  const handleLogin = () => {
    setEstaLogueado(true);
  };

  const handleRegistrarIncidencia = (incidencia) => {
    setIncidencias([...incidencias, incidencia]);
    console.log('Incidencia registrada:', incidencia);
    console.log('Total de incidencias:', incidencias.length + 1);
  };

  if (estaLogueado === false) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <RegistrarIncidencia onRegistrar={handleRegistrarIncidencia} />
      <VerIncidencias />
    </div>
  );
}

export default App;