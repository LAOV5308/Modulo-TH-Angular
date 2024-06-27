export interface inputEmpleado {
  Nombre: string;
  Apellidos: string; 
  Sexo: string; 
  EstadoCivil: string; 
  FechaNacimiento: Date; 
  EntidadNacimiento: string;
  CiudadNacimiento: string;
  CURP: string;
  RFC: string;
  NSS: string;
  UMF: string;
Edad: number;
  NoNomina: number;
  Nivel: string;
  //Departamento:Departamento;
  IdDepartamento: number;
  NombrePuesto: string;
  NombreResponsable: string;
  TipoIngreso: string;
  Ingreso: Date;
  Antiguedad: Number;//aQUIMOVI
  HorarioSemanal: string;
  Sueldo: Number;
  IngresoImss: Date;
  BajaImss: Date;
  Escolaridad: string;


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