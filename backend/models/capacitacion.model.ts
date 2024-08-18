

export interface Capacitacion {
  NoNomina: number;
  NombreCompleto: string;
  NombrePuesto: string;
  NombreDepartamento: string;
  FechaIngreso: Date;
  CURP: string;
  NombreCapacitacion: string;
  FechaCapacitacion: Date;
  ValoracionCapacitacion: string;
  CalificacionCapacitacion: string;
}

export interface CapacitacionProgramada {
  IdProgramacionCapacitacion: number;//IdProgramacionFecha
  IdProgramacionFecha: number;
  NombreCapacitacion: string;
  Origen: string;
  Frecuencia: string;
  Fecha: Date;
  FechaInicio: Date;
  FechaFin: Date;
  HoraInicio: any;
  HoraFin: any;
  PersonaImparte: string;
  Comentarios: string;
  IdEstadoProgramacionCapacitacion: number;
  Color: string;
  Evaluacion: boolean;
}



export interface CapacitacionesSuscripciones {
  IdSuscripcionCapacitacion: number;
  NoNomina: number;
  Nombre: string;
  Apellidos: string;
  NombrePuesto: string;
  NombreDepartamento: string;
  IdProgramacionFecha: number;
  CodigoCapacitacion: number;
  Evaluado: boolean;
  Asistencia: boolean;
  Estado: boolean;
}

export interface Calificaciones {
  IdSuscripcionCapacitacion: number;
  NoNomina: number;
  Nombre: string;
  Apellidos: string;
  NombrePuesto: string;
  NombreDepartamento: string;
  IdProgramacionFecha: number;
  CodigoCapacitacion: number;
  Calificacion: number;
  Asistio: boolean;
  Estatus: boolean;
  Comentario: string;
}