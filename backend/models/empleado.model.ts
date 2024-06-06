import { Departamento } from "./departamento.model";

export interface Empleado {
  
  NoNomina: number;
  Nivel: string;
  //Departamento:Departamento;
  NombreDepartamento: string;
  NombrePuesto: string;
  NombreResponsable: string;
  TipoIngreso: string;
  Ingreso: Date;
  Antiguedad: Number;//aQUIMOVI
  HorarioSemanal: string;
  NSS: string;
  UMF: string;
  Sueldo: Number;

  Nombre: string;
  Apellidos: string; 
  Sexo: string; 
  EstadoCivil: string; 
  FechaNacimiento: Date; 
  EntidadNacimiento: string;
  CiudadNacimiento: string;
  CURP: string;
  RFC: string;

  DomicilioIne: string;
  Poblacion: string;
  EntidadDireccion: string;
  CP: string;
  CorreoElectronico: string;
  NumeroTelefono1: string;
  NumeroTelefono2: string;
  NombreBeneficiario: string;
  Parentesco: string;
  FechaNacimientoBeneficiario: Date;
  NumeroTelefonoEmergencia: string;
}
