

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
  IdProgramacionFecha: number;
  CodigoCapacitacion: number;
  Fecha: Date;
  Imparte: string;
  NombreCapacitacion: string;
  EstadoProgramacionCapacitacion: boolean;
  Color: string;
  Hora: string;
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