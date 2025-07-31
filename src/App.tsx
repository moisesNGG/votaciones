import React from "react";
import "./styles/App.css";
import Login from "./components/Login";
import CandidatosLista from "./components/CandidatosLista";
import Resultado from "./components/Resultados";
import UserInfo from "./components/UserInfo";
import { VotacionProvider, useVotacion } from "./context/VotacionContext";
import { Usuario } from "./types/types";

// Componente interno que usa el contexto
const AppContent: React.FC = () => {
  const { 
    listaDeCandidatos, 
    usuarioActual, 
    setUsuarioActual, 
    logout,
    cantidadTotalDeVotos,
    isLoading 
  } = useVotacion();

  const handleLogin = (usuario: Usuario) => {
    console.log('Login successful:', usuario);
    setUsuarioActual(usuario);
  };

  // Si no hay usuario logueado, mostrar login
  if (!usuarioActual) {
    return <Login onLogin={handleLogin} />;
  }

  // Mostrar loading si está cargando
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando sistema de votación...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header mejorado */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>🗳️ VOTAPP 2025</h1>
            <p>Sistema de Votación Digital</p>
          </div>
          <UserInfo usuario={usuarioActual} onLogout={logout} />
        </div>
      </header>

      {/* Contenido principal */}
      <main className="app-main">
        <div className="voting-section">
          <CandidatosLista />
        </div>
        
        <div className="results-section">
          <Resultado 
            candidatos={listaDeCandidatos} 
            totalVotos={cantidadTotalDeVotos} 
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>VOTA-APP</p>
        <p>2025</p>
      </footer>
    </div>
  );
};

// Componente principal que provee el contexto
const App: React.FC = () => {
  return (
    <VotacionProvider>
      <AppContent />
    </VotacionProvider>
  );
};

export default App;