import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Candidato, Usuario } from '../types/types';
import { obtenerDatos, registrarVoto, verificarSiYaVoto } from '../services/localStorage';
import noboaImg from "../imagenes/noboa.jpeg";
import trumpImg from "../imagenes/trump.jpeg";
import putinImg from "../imagenes/putin.jpeg";

// Mapeo de imágenes por ID
const imageMap: { [key: number]: string } = {
  1: noboaImg,
  2: trumpImg,
  3: putinImg
};

// Interfaz del contexto
interface VotacionContextType {
  // Estados
  listaDeCandidatos: Candidato[];
  usuarioActual: Usuario | null;
  usuarioYaHaVotado: boolean;
  cantidadTotalDeVotos: number;
  isLoading: boolean;
  
  // Funciones
  funcionParaVotar: (candidatoId: number) => boolean;
  setUsuarioActual: (usuario: Usuario | null) => void;
  logout: () => void;
  recargarDatos: () => void;
}

// Crear el contexto
const VotacionContext = createContext<VotacionContextType | undefined>(undefined);

// Provider del contexto
interface VotacionProviderProps {
  children: ReactNode;
}

export const VotacionProvider: React.FC<VotacionProviderProps> = ({ children }) => {
  const [listaDeCandidatos, setListaDeCandidatos] = useState<Candidato[]>([]);
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);
  const [usuarioYaHaVotado, setUsuarioYaHaVotado] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Cargar datos iniciales
  useEffect(() => {
    cargarDatos();
  }, []);

  // Verificar si el usuario actual ya votó cuando cambie
  useEffect(() => {
    if (usuarioActual) {
      const yaVoto = verificarSiYaVoto(usuarioActual.cedula);
      setUsuarioYaHaVotado(yaVoto);
    } else {
      setUsuarioYaHaVotado(false);
    }
  }, [usuarioActual]);

  const cargarDatos = () => {
    console.log('VotacionContext: cargarDatos iniciado');
    try {
      setIsLoading(true);
      const datos = obtenerDatos();
      console.log('VotacionContext: datos obtenidos:', datos);
      
      // Agregar imágenes a los candidatos
      const candidatosConImagenes = datos.candidatos.map(candidato => ({
        ...candidato,
        imagen: imageMap[candidato.id]
      }));
      
      console.log('VotacionContext: candidatos con imágenes:', candidatosConImagenes);
      setListaDeCandidatos(candidatosConImagenes);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setIsLoading(false);
    }
  };

  const emitirVoto = (candidatoId: number): boolean => {
    console.log('emitirVoto called with:', { candidatoId, usuarioActual });
    
    if (!usuarioActual) {
      alert('Error: No hay usuario logueado');
      return false;
    }

    if (usuarioYaHaVotado) {
      alert('Ya has votado con esta cédula');
      return false;
    }

    const exito = registrarVoto(usuarioActual, candidatoId);
    console.log('registrarVoto result:', exito);
    
    if (exito) {
      // Recargar datos para mostrar el voto actualizado
      cargarDatos();
      setUsuarioYaHaVotado(true);
      
      // Mostrar mensaje de éxito
      const candidatoVotado = listaDeCandidatos.find(c => c.id === candidatoId);
      alert(`Voto registrado por ${candidatoVotado?.nombre}`);
      return true;
    } else {
      alert('Intenta nuevamente.');
      return false;
    }
  };

  const logout = () => {
    setUsuarioActual(null);
    setUsuarioYaHaVotado(false);
  };

  // Calcular total de votos
  const cantidadTotalDeVotos = listaDeCandidatos.reduce(
    (total, candidato) => total + candidato.votos,
    0
  );

  const contextValue: VotacionContextType = {
    // Estados
    listaDeCandidatos,
    usuarioActual,
    usuarioYaHaVotado,
    cantidadTotalDeVotos,
    isLoading,
    
    // Funciones
    funcionParaVotar: emitirVoto,
    setUsuarioActual,
    logout,
    recargarDatos: cargarDatos
  };

  return (
    <VotacionContext.Provider value={contextValue}>
      {children}
    </VotacionContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useVotacion = (): VotacionContextType => {
  const context = useContext(VotacionContext);
  if (context === undefined) {
    throw new Error('useVotacion debe usarse dentro de un VotacionProvider');
  }
  return context;
};