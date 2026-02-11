import React, { useState } from 'react';
import './App.css';
import Login from './logica/Login';
import PantallaPrincipal from './logica/PantallaPrincipal';


function App() {
  const [userRole, setUserRole] = useState(null); 

  // Guardar si el inicio es admin o comun
  const handleLogin = (rol) => {
    setUserRole(rol); 
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  if (userRole === null) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <PantallaPrincipal userRole={userRole} onLogout={handleLogout} />
    </div>
  );
}

export default App;