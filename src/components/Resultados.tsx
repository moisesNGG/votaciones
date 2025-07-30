import React from "react";
import { Candidato } from "./VotacionLogica";

type Props = {
  candidatos: Candidato[];
  totalVotos: number;
};

const Resultado: React.FC<Props> = ({ candidatos, totalVotos }) => {
  const maxVotos = Math.max(...candidatos.map((c) => c.votos));
  const empatados = candidatos.filter(
    (c) => c.votos === maxVotos && totalVotos > 0
  );
  const hayEmpate = empatados.length > 1;

  return (
    <div className="resultado-votacion">
      <h2>Resultados de la votación</h2>
      {hayEmpate && (
        <p style={{ color: "orange", fontWeight: "bold" }}>
          🟡 Hay un empate entre: {empatados.map((c) => c.nombre).join(" y ")}{" "}
          con {maxVotos} votos
        </p>
      )}
      {totalVotos === 0 ? (
        <p>No hay votos aún.</p>
      ) : (
        <div>
          {candidatos.map((candidato) => {
            const porcentaje = (candidato.votos / totalVotos) * 100;
            return (
              <div key={candidato.id} style={{ marginBottom: 16 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <strong>{candidato.nombre}</strong>
                  <span>
                    {candidato.votos} votos ({porcentaje.toFixed(1)}%)
                  </span>
                </div>
                <div
                  style={{
                    height: 20,
                    width: "100%",
                    backgroundColor: "#eee",
                    borderRadius: 8,
                    overflow: "hidden",
                    marginTop: 4,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${porcentaje}%`,
                      backgroundColor: "#4caf50",
                      borderRadius: 8,
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
          <p>
            <strong>Total de votos:</strong> {totalVotos}
          </p>
        </div>
      )}
    </div>
  );
};

export default Resultado;
