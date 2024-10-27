import { Departamento } from "./departamento.model";

export interface Empleado {
  
  NoNomina: number;
  Nivel: string;
  //Departamento:Departamento;
  IdDepartamento: number;
  NombreDepartamento: string;
  NombrePuesto: string;
  NombreResponsable: string;
  TipoIngreso: string;
  Ingreso: Date;
  Antiguedad: number;//aQUIMOVI
  HorarioSemanal: string;
  NSS: string;
  UMF: string;
  Sueldo: Number;
  IngresoImss: Date;
  Aniversario: Date;
  BajaImss: Date;
  Escolaridad: string;

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
  EstadoEmpleado: boolean;
  Vacaciones: boolean;
  Edad: number;
  FechaBaja: Date;
  //disabled?: boolean; 
}
