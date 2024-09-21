
//La diferencia es que este ya tiene el nombre Completo
export interface Incidencia {
    IdIncidencias: number;
    NoNomina: number;
  NombreCompleto: string;
  NombrePuesto: string;
  NombreDepartamento: string;
  NombreResponsable: string;
  Motivo: string;
  FechaInicio: Date;
  FechaFin: Date;
  DiasSubsidios: number;
  Estatus: Boolean;
  CategoriaIncidencia: String;
  FolioAlta: String;
  FolioBaja: String;
}

export interface IncidenciaB {
  IdIncidencias: number;
  NoNomina: number;
Nombre: string;
Apellidos: string;
NombrePuesto: string;
NombreDepartamento: string;
NombreResponsable: string;
Motivo: string;
FechaInicio: Date;
FechaFin: Date;
DiasSubsidios: number;
Estatus: Boolean;
CategoriaIncidencia: String;
FolioAlta: String;
FolioBaja: String;
}
