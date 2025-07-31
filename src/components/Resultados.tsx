import React from "react";
import { Candidato } from "../types/types";

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

  // Ordenar candidatos por votos (de mayor a menor)
  const candidatosOrdenados = [...candidatos].sort((a, b) => b.votos - a.votos);

  return (
    <div className="resultado-votacion">
      <h2>📊 Resultados en Tiempo Real</h2>
      
      {/* Estadísticas generales */}
      <div className="estadisticas-generales">
        <div className="stat-item">
          <span className="stat-number">{totalVotos}</span>
          <span className="stat-label">Total de Votos</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{candidatos.length}</span>
          <span className="stat-label">Candidatos</span>
        </div>
      </div>

      {/* Mensaje de empate */}
      {hayEmpate && totalVotos > 0 && (
        <div className="empate-alert">
          <h3>🟡 ¡Hay un empate!</h3>
          <p>
            Empate entre: <strong>{empatados.map((c) => c.nombre).join(" y ")}</strong>
            {" "}con <strong>{maxVotos}</strong> votos cada uno
          </p>
        </div>
      )}

      {/* Resultados por candidato */}
      {totalVotos === 0 ? (
        <div className="no-votos">
          <div className="no-votos-icon">🗳️</div>
          <h3>¡Aún no hay votos!</h3>
          <p>Los resultados aparecerán aquí cuando se emitan los primeros votos.</p>
        </div>
      ) : (
        <div className="resultados-lista">
          {candidatosOrdenados.map((candidato, index) => {
            const porcentaje = (candidato.votos / totalVotos) * 100;
            const isGanador = candidato.votos === maxVotos && !hayEmpate;
            
            return (
              <div 
                key={candidato.id} 
                className={`resultado-candidato ${isGanador ? 'ganador' : ''}`}
              >
                <div className="resultado-header">
                  <div className="resultado-posicion">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}°`}
                  </div>
                  <div className="resultado-info">
                    <div className="resultado-nombre">
                      {candidato.nombre}
                      {isGanador && <span className="winner-badge">Líder</span>}
                    </div>
                    <div className="resultado-votos">
                      {candidato.votos} votos ({porcentaje.toFixed(1)}%)
                    </div>
                  </div>
                </div>
                
                <div className="barra-progreso">
                  <div
                    className="barra-progreso-fill"
                    style={{
                      width: `${porcentaje}%`,
                      background: candidato.color 
                        ? `linear-gradient(90deg, ${candidato.color}, ${candidato.color}dd)`
                        : 'linear-gradient(90deg, #238636, #2ea043)'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Información adicional */}
      {totalVotos > 0 && (
        <div className="resumen-votacion">
          <h4>Resumen de la Votación</h4>
          <div className="resumen-grid">
            <div className="resumen-item">
              <span className="resumen-label">Candidato líder:</span>
              <span className="resumen-value">
                {hayEmpate ? "Empate" : candidatosOrdenados[0]?.nombre}
              </span>
            </div>
            <div className="resumen-item">
              <span className="resumen-label">Mayor porcentaje:</span>
              <span className="resumen-value">
                {((maxVotos / totalVotos) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="resumen-item">
              <span className="resumen-label">Participación:</span>
              <span className="resumen-value">{totalVotos} votantes</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resultado;