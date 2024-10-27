export interface FechaVacacion {
    IdFechaVacacion: number;
    NoNomina: number;
    Fecha: Date;
    Comentarios: string;
    EstadoVacacion: boolean;
    Periodo: string;
    IdVacacion: number | null;
    VacacionAdelantada: boolean;
  }

  export interface Vacacion {
    IdVacacion: number;
    DiasVacaciones: number;
    DiasDisponibles: number;
    DiasUtilizados: number;
    Periodo: string;
  }

  export interface DiasDisponibles{
    NoNomina: number;
    DiasDisponibles: number;
  }
