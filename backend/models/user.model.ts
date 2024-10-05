export interface Usuario {
    IdUsuario: number;
    NombreUsuario: string;
    NombreRole: string;
    IdRole: number;
    DescripcionRole: string;
    EstadoRole: boolean;
    ConsultarEmpleados: boolean;
    HistorialEmpleados: boolean;
    Incidencias: boolean;
    Vacaciones: boolean;
    Dashboard: boolean;
    ConsultarCapacitaciones: boolean;
    Departamentos: boolean;
    Puestos: boolean;
    Usuarios: boolean;
    Reportes: boolean;
  }


  export interface Role{
    IdRole: number;
    NombreRole: string;
    DescripcionRole: string;
    EstadoRole: boolean;
    ConsultarEmpleados: boolean;
    HistorialEmpleados: boolean;
    Incidencias: boolean;
    Vacaciones: boolean;
    Dashboard: boolean;
    ConsultarCapacitaciones: boolean;
    Departamentos: boolean;
    Puestos: boolean;
    Usuarios: boolean;
    Reportes: boolean;
  }