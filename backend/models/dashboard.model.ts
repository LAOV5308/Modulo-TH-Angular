export interface D_Departamentos{
    NombreDepartamento: string;
    CantidadEmpleados: number;
}
export interface D_EstadoCivil{
    EstadoCivil: string;
    CantidadEstadoCivil: number;
}


export interface D_IncidenciasPeriodo{
    Motivo: string;
    Mes: number;
    CantidadIncidencias: number;
}

export interface D_CapacitacionesPeriodo{
    NombreCapacitacion: string;
    Mes: number;
    CantidadCapacitaciones: number;
}

export interface D_ContratacionesPeriodo{
    NombreDepartamento: string;
    Mes: number;
    CantidadContrataciones: number;
}
export interface D_Edades{
    RangoEdad: string;
    CantidadEdades: number;
}


