

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
  FechaComienzo: Date;
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
  Cerrado: boolean;
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
  Calificacion: number;
  Estatus: boolean;
  Comentario: string;
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
  Evaluado: boolean;
}


export interface CapacitacionesEmpleado {
  NoNomina: number;
  Nombre: string;
  Apellidos: string;
  NombrePuesto: string;
  NombreDepartamento: string;
  IdSuscripcionCapacitacion: number;
  Asistencia: boolean;
  IdProgramacionCapacitacion: number;
  NombreCapacitacion: string;
  Origen: string;
  Frecuencia: string;
  PersonaImparte: string;
  FechaInicio: Date;
  Horas: number;
  Calificacion: number;
  Comentario: string;
  Estatus: boolean;
  Evaluacion: boolean;
}