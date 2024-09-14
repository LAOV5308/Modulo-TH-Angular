

export interface Capacitacion {
  IdProgramacionCapacitacion: number;//IdProgramacionFecha
  NombreCapacitacion: string;
  Origen: string;
  Frecuencia: string;
  FechaInicio: Date;
  PersonaImparte: string;
  Comentarios: string;
  Color: string;
  Horas: number;
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
  Horas: number;
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