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

export interface D_Bajas{
    RangoEdad: string;
    CantidadEdades: number;
}

export interface D_RangoAntiguedad{
    RangoAntiguedad: string;
    CantidadAntiguedades: number;
}

export interface D_IncidenciasPorDepartamento{
    NombreDepartamento: string;
    Motivo: string;
    CantidadMotivos: number;
}

export interface D_SalidasEdades{
    Mes: number;
    RangoEdad: string;
    CantidadEdades: number;
}

export interface D_SumaIncidenciasPorDepartamento{
    Mes: number;
    NombreDepartamento: string;
    TotalDiasSubsidios: number;
    
}

export interface D_CambiosPorDepartamento{
    NombreDepartamentoAnterior: string;
    CantidadCambios: number;
}


export interface D_HorasCapacitacionDepartamento{
    NombreDepartamento: string;
    TotalHoras: number;
}


export interface D_FaltasDepartamento{
    NombreDepartamento: string;
    CantidadFaltasDepartamento: number;
}



