export interface FechaVacacion {
    IdFechaVacacion: number;
    NoNomina: number;
    Fecha: Date;
    Comentarios: string;
    EstadoVacacion: boolean;
    Periodo: string;
  }

  export interface Vacacion {
    IdVacacion: number;
    DiasVacaciones: number;
    DiasDisponibles: number;
    DiasUtilizados: number;
    Periodo: string;
  }
