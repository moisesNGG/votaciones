import React from "react";
import { useVotacion } from "../context/VotacionContext";
import "../styles/App.css";
import CandidatosCards from "./CandidatosCards";

const CandidatosLista: React.FC = () => {
  const {
    listaDeCandidatos,
    funcionParaVotar,
    usuarioYaHaVotado,
    cantidadTotalDeVotos,
  } = useVotacion();

  return (
    <div className="lista-candidatos">
      <h2 className="titulo">Lista de Candidatos</h2>
      <div className="grid-cards">
        {listaDeCandidatos.map((candidato) => (
          <CandidatosCards
            key={candidato.nombre}
            candidato={candidato}
            votar={funcionParaVotar}
            deshabilitar={usuarioYaHaVotado}
          />
        ))}
      </div>
      <p className="total-votos">Total de votos: {cantidadTotalDeVotos}</p>
    </div>
  );
};

export default CandidatosLista;