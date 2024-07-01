
export interface SolicitudProceso {
    IdSolicitud: number;
    Nombre: string;
    Apellidos: string; 
    Sexo: string; 
    EstadoCivil: string; 
    FechaNacimiento: Date; 
  Edad: number;
    EntidadNacimiento: string;
    CiudadNacimiento: string;
    CURP: string;
    RFC: string;
    NSS: string;
    UMF: string;
    PuestoOfrecido: string;
    PuestoSolicitado: string;
    FechaSolicitud: Date;
    HorarioSemanal: string;
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

export interface SolicitudAceptada {
    IdSolicitud: number;
    Nombre: string;
    Apellidos: string; 
    Sexo: string; 
    EstadoCivil: string; 
    FechaNacimiento: Date; 
  Edad: number;
    EntidadNacimiento: string;
    CiudadNacimiento: string;
    CURP: string;
    RFC: string;
    NSS: string;
    UMF: string;
    PuestoAceptado: string;
    FechaAceptacion: Date;
    HorarioSemanal: string;
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

    export interface SolicitudRechazada {
        IdSolicitud: number;
        Nombre: string;
        Apellidos: string; 
        Sexo: string; 
        EstadoCivil: string; 
        FechaNacimiento: Date; 
      Edad: number;
        EntidadNacimiento: string;
        CiudadNacimiento: string;
        CURP: string;
        RFC: string;
        NSS: string;
        UMF: string;
        PuestoRechazado: string;
        FechaRechazado: Date;
        DescripcionRechazo: string;
        HorarioSemanal: string;
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
