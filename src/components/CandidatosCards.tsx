import React from "react";
import "../styles/App.css";
import { Candidato } from "./VotacionLogica";

type Props = {
  candidato: Candidato;
  votar: (id: number) => void;
  deshabilitar: boolean;
};

const CandidatosCards: React.FC<Props> = ({
  candidato,
  votar,
  deshabilitar,
}) => {
  return (
    <div className="card-candidato">
      {/* Imagen */}
      {candidato.imagen && (
        <img
          src={candidato.imagen}
          alt={`Foto de ${candidato.nombre}`}
          className="imagen-candidato"
        />
      )}
      <h3>{candidato.nombre}</h3>
      <p>Votos: {candidato.votos}</p>
      <button
        onClick={() => votar(candidato.id)}
        disabled={deshabilitar}
        className="btn-votar"
      >
        Votar
      </button>
    </div>
  );
};

export default CandidatosCards;
