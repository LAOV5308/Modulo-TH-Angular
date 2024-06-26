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