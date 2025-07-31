// Definimos los tipos principales de la aplicación

export type Candidato = {
  id: number;
  nombre: string;
  votos: number;
  imagen?: string;
  partido?: string;
  color?: string;
};

export type Usuario = {
  nombres: string;
  apellidos: string;
  cedula: string;
  yaVoto: boolean;
  fechaVoto?: string;
  candidatoVotado?: number;
};

export type BaseDatosLocal = {
  usuarios: Usuario[];
  candidatos: Candidato[];
  configuracion: {
    ultimaActualizacion: string;
    totalVotosEmitidos: number;
  };
};