import React from "react";
import "./styles/App.css"; // Importing styles for the App component
import CandidatosLista from "./components/CandidatosLista";
import Resultado from "./components/Resultados";
import { useVotacion } from "./components/VotacionLogica";

const App: React.FC = () => {
  const { listaDeCandidatos } = useVotacion();

  const totalVotos = listaDeCandidatos.reduce((suma, c) => suma + c.votos, 0);

  return (
    <>
      <header
        style={{
          backgroundColor: "#161b22",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#58a6ff", fontSize: "2.5rem", margin: 0 }}>
          VOTAPP - Votaciones 2025
        </h1>
      </header>
      <main className="App-content">
        <CandidatosLista />
        <Resultado candidatos={listaDeCandidatos} totalVotos={totalVotos} />
      </main>
    </>
  );
};

export default App;
