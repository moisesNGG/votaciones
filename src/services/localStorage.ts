import { BaseDatosLocal, Candidato, Usuario } from "../types/types";

// Clave para el localStorage
const STORAGE_KEY = "votacion_data";

// Candidatos iniciales con mejor información
const candidatosIniciales: Candidato[] = [
  {
    id: 1,
    nombre: "Daniel Noboa",
    votos: 145,
    partido: "Acción Democrática Nacional",
    color: "#1e88e5",
  },
  {
    id: 2,
    nombre: "Donald Trump",
    votos: 1230,
    partido: "Partido Republicano",
    color: "#d32f2f",
  },
  {
    id: 3,
    nombre: "Vladimir Putin",
    votos: 120,
    partido: "Rusia Unida",
    color: "#388e3c",
  },
  {
    id: 4,
    nombre: "Nicolás Maduro",
    votos: 9999,
    partido: "Maduro Socialista",
    color: "#6a1b9a",
  },
  {
    id: 5,
    nombre: "Roberto Garcia",
    votos: 4234,
    partido: "Capas de la Democracia",
    color: "#6a1b9a",
  },
  {
    id: 6,
    nombre: "Framework Castro",
    votos: 4235,
    partido: "Frameworks de la Revolución",
    color: "#769a1bff",
  },
];

// Base de datos inicial
const baseDatosInicial: BaseDatosLocal = {
  usuarios: [],
  candidatos: candidatosIniciales,
  configuracion: {
    ultimaActualizacion: new Date().toISOString(),
    totalVotosEmitidos: 0,
  },
};

// Función para obtener los datos del localStorage
export const obtenerDatos = (): BaseDatosLocal => {
  try {
    console.log("obtenerDatos: Intentando obtener datos de localStorage...");
    const datos = localStorage.getItem(STORAGE_KEY);
    console.log("obtenerDatos: Datos raw del localStorage:", datos);

    if (datos) {
      const datosParsed = JSON.parse(datos);
      console.log("obtenerDatos: Datos parseados exitosamente:", datosParsed);
      return datosParsed;
    }

    console.log(
      "obtenerDatos: No hay datos en localStorage, devolviendo datos iniciales"
    );
    // Solo devolver datos iniciales si realmente no hay nada guardado
    return baseDatosInicial;
  } catch (error) {
    console.error("Error al obtener datos del localStorage:", error);
    return baseDatosInicial;
  }
};

// Función para guardar datos en localStorage
export const guardarDatos = (datos: BaseDatosLocal): void => {
  try {
    datos.configuracion.ultimaActualizacion = new Date().toISOString();
    const datosString = JSON.stringify(datos);
    console.log("guardarDatos: Guardando datos en localStorage:", datosString);
    localStorage.setItem(STORAGE_KEY, datosString);

    // Verificar que se guardó correctamente
    const verificacion = localStorage.getItem(STORAGE_KEY);
    console.log("guardarDatos: Verificación - datos guardados:", verificacion);
  } catch (error) {
    console.error("Error al guardar datos en localStorage:", error);
  }
};

// Función para verificar si una cédula ya votó
export const verificarSiYaVoto = (cedula: string): boolean => {
  const datos = obtenerDatos();
  return datos.usuarios.some(
    (usuario) => usuario.cedula === cedula && usuario.yaVoto
  );
};

// Función para registrar un nuevo voto
export const registrarVoto = (
  usuario: Usuario,
  candidatoId: number
): boolean => {
  try {
    const datos = obtenerDatos();

    // Verificar si ya votó
    if (verificarSiYaVoto(usuario.cedula)) {
      return false;
    }

    // Agregar/actualizar usuario
    const usuarioIndex = datos.usuarios.findIndex(
      (u) => u.cedula === usuario.cedula
    );
    const usuarioVotante: Usuario = {
      ...usuario,
      yaVoto: true,
      fechaVoto: new Date().toISOString(),
      candidatoVotado: candidatoId,
    };

    if (usuarioIndex >= 0) {
      datos.usuarios[usuarioIndex] = usuarioVotante;
    } else {
      datos.usuarios.push(usuarioVotante);
    }

    // Incrementar votos del candidato
    const candidatoIndex = datos.candidatos.findIndex(
      (c) => c.id === candidatoId
    );
    if (candidatoIndex >= 0) {
      datos.candidatos[candidatoIndex].votos += 1;
    }

    // Actualizar configuración
    datos.configuracion.totalVotosEmitidos += 1;

    // Guardar datos
    guardarDatos(datos);
    return true;
  } catch (error) {
    console.error("Error al registrar voto:", error);
    return false;
  }
};

// Función para obtener estadísticas
export const obtenerEstadisticas = () => {
  const datos = obtenerDatos();
  return {
    totalUsuarios: datos.usuarios.length,
    totalVotos: datos.configuracion.totalVotosEmitidos,
    candidatos: datos.candidatos,
    ultimaActualizacion: datos.configuracion.ultimaActualizacion,
  };
};

// Función para limpiar datos (útil para desarrollo)
export const limpiarDatos = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
