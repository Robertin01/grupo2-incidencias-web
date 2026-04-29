import React, { useContext, useState } from 'react';
import './App.css';
import Login from './logica/Login';
import Registro from './logica/Registro';
import PantallaPrincipal from './logica/PantallaPrincipal';
import { AuthProvider, AuthContext } from './logica/GlobalContext';

function AppContent() {
  const { usuarioLogin } = useContext(AuthContext);
  const [vistaRegistro, setVistaRegistro] = useState(false);

  // Si el usuario está logueado, va directo a la principal
  if (usuarioLogin) {
    return (
      <div className="App">
        <PantallaPrincipal />
      </div>
    );
  }

  // Si no está logueado, alternamos entre Login y Registro
  return vistaRegistro ? (
    <Registro volver={() => setVistaRegistro(false)} />
  ) : (
    <Login irARegistro={() => setVistaRegistro(true)} />
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;