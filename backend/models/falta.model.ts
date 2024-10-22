export interface Falta {
    IdFalta: number;
    NoNomina: number;
    FechaFalta: Date;
    Motivo: string;
    Sancion: string;
    Estatus: string;
    NivelSancion: string;
    HorasExtras: boolean;
    EstadoFalta: boolean;
    Nombre: string;
    Apellidos: string;
    NombrePuesto: string;
    NombreDepartamento: string;
    Comentario: string;
    EstatusFalta: boolean;
  }


  export interface FechaPagar{
    IdFechaPagar: number;
    IdFalta: number;
    FechaPagar: Date;
    EstadoFechaPagar: boolean;
    Comentario: string;
  }