import { useState } from "react";

// Definimos un tipo llamado 'Candidato' que contiene los campos que tendrá cada candidato.
export type Candidato = {
  id: number;          // Identificador unico del candidato
  nombre: string;      // Nombre del candidato
  votos: number;       // Número de votos que ha recibido
};
// Lista inicial con tres candidatos, todos con 0 votos
const listaInicialDeCandidatos: Candidato[] = [
  { id: 1, nombre: "Candidato A", votos: 0 },
  { id: 2, nombre: "Candidato B", votos: 0 },
  { id: 3, nombre: "Candidato C", votos: 0 },
];


// logica
export const useVotacion = () => {
  // Estado que contiene la lista actualizada de candidatos y sus votos
  const [listaDeCandidatos, actualizarListaDeCandidatos] = useState<Candidato[]>(listaInicialDeCandidatos);

  // Estado que controla si el usuario voto
  const [usuarioYaHaVotado, actualizarEstadoDeVotacion] = useState<boolean>(false);

  // Función que se ejecuta cuando el usuario emite su voto por un candidato específico
  const emitirVoto = (identificadorDelCandidato: number) => {
    // Si el usuario ya voto, no se permite votar de nuevo
    if (usuarioYaHaVotado) {
      return;
    }

    // Creamos una nueva lista de candidatos donde solo el candidato votado aumenta su conteo de votos
    const nuevaListaDeCandidatos = listaDeCandidatos.map((candidatoActual) => {
      if (candidatoActual.id === identificadorDelCandidato) {
        return {
          id: candidatoActual.id,
          nombre: candidatoActual.nombre,
          votos: candidatoActual.votos + 1,
        };
      } else {
        // Si no es queda igual
        return candidatoActual;
      }
    });

    // Actualizamos el estado con la nueva lista de candidatos con los votos actualizados.
    actualizarListaDeCandidatos(nuevaListaDeCandidatos);

    // Marcamos que el usuario ya votó para que no pueda votar de nuevo.
    actualizarEstadoDeVotacion(true);
  };

  // Calculamos el total de votos sumando los votos de todos los candidatos.
  const cantidadTotalDeVotos = listaDeCandidatos.reduce((contador, candidatoActual) => {
    return contador + candidatoActual.votos;
  }, 0);

  // Retornamos los valores y funciones necesarios para que otros componentes usen esta lógica.
  return {
    listaDeCandidatos: listaDeCandidatos,
    funcionParaVotar: emitirVoto,
    usuarioYaHaVotado: usuarioYaHaVotado,
    cantidadTotalDeVotos: cantidadTotalDeVotos,
  };
};
