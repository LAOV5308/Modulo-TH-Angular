import { Routes, RouterModule} from '@angular/router';
import { ComponentDepartamentoComponent } from './shared/components/Departamentos/component-departamento.component';
import { AddEmpleadoComponent } from './shared/components/empleados/add-empleado/add-empleado.component';
import { PuestoComponentComponent } from './shared/components/Puestos/puesto-component.component';
import { UpdateEmpleadoComponent } from './shared/components/empleados/update-empleado/update-empleado.component';
import { IncidenciasComponent } from './shared/components/incidencias/incidencias.component';
//import { DatosCapacitacionCatalogoComponent } from './shared/components/capacitacionesCatalogo/datos-capacitacion-catalogo/datos-capacitacion-catalogo.component';
import { LoginComponent } from './shared/components/Login/login.component';
import { authGuard } from './auth/Guards/auth.guard';
import { roleGuard } from './auth/Guards/role.guard';
import { ConsultarEmpleadoComponent } from './shared/components/empleados/consultar-empleado/consultar-empleado.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { AddReclutamientoComponent } from './shared/components/reclutamiento/add-reclutamiento/add-reclutamiento.component';
import { DatosReclutamientoComponent } from './shared/components/reclutamiento/datos-reclutamiento/datos-reclutamiento.component';
import { ProgramarCapacitacionesComponent } from './shared/components/programar-capacitaciones/programar-capacitaciones.component';
import { ConsultarCapacitacionesComponent } from './shared/components/consultar-capacitaciones/consultar-capacitaciones.component';
import { VacacionesComponent } from './shared/components/vacaciones/vacaciones.component';
import { VacacionaddComponent } from './shared/components/vacacionadd/vacacionadd.component';
import { ConsultarHistorialComponent } from './shared/components/consultar-historial/consultar-historial.component';
import { UpdateCapacitacionesComponent } from './shared/components/capacitaciones/update-capacitaciones/update-capacitaciones.component';
import { ReportesComponent } from './shared/components/Reportes/reportes.component';
import { System1Component } from './shared/components/system1/system1.component';
import { UsuariosComponent } from './shared/components/usuarios/usuarios.component';
import { RolesComponent } from './shared/components/roles/roles.component';
import { RoleeditarComponent } from './shared/components/roleeditar/roleeditar.component';
import { UsuarioeditarComponent } from './shared/components/usuarioeditar/usuarioeditar.component';
import { BienvenidaComponent } from './shared/components/bienvenida/bienvenida.component';
import { FaltasComponent } from './shared/components/faltas/faltas.component';
import { ReportesNormativaComponent } from './shared/components/reportes-normativa/reportes-normativa.component';
import { FaltasdiasComponent } from './shared/components/faltasdias/faltasdias.component';
import { EmpleadosComponent } from './shared/components/empleados/empleados.component';


export const routes: Routes = [

    /*{ path: 'admin', component: DatosCapacitacionCatalogoComponent, canActivate: [authGuard], data:{
        role:'Admin'
    } },*/

    { path: 'system', component: System1Component, canActivate: [authGuard],
        children: [
            { path: 'bienvenida', component: BienvenidaComponent, canActivate: [authGuard]},
            { path: 'empleados', component: EmpleadosComponent, canActivate: [roleGuard], data:{acceder: 'ConsultarEmpleados'} },
            { path: 'dashboard', component: DashboardComponent, canActivate: [roleGuard], data:{acceder: 'Dashboard'}},
            { path: 'incidencias', component: IncidenciasComponent, canActivate: [roleGuard], data:{acceder: 'Incidencias'}},
            { path: 'programarcapacitaciones', component: ProgramarCapacitacionesComponent, canActivate: [roleGuard], data:{acceder: 'ConsultarCapacitaciones'}},
            { path: 'consultarcapacitaciones', component: ConsultarCapacitacionesComponent, canActivate: [roleGuard], data:{acceder: 'ConsultarCapacitaciones'}},
            { path: 'puestos', component: PuestoComponentComponent, canActivate: [roleGuard], data:{acceder: 'Puestos'}},
            { path: 'departamentos', component: ComponentDepartamentoComponent, canActivate: [roleGuard], data:{acceder: 'Departamentos'}},
            { path: 'addEmpleado', component: AddEmpleadoComponent, canActivate: [roleGuard], data:{acceder: 'ConsultarEmpleados'}},
            { path: 'updateEmpleado/:NoNomina', component: UpdateEmpleadoComponent, canActivate: [roleGuard], data:{acceder: 'ConsultarEmpleados'}},
            { path: 'consultarEmpleado/:NoNomina', component: ConsultarEmpleadoComponent, canActivate: [roleGuard], data:{acceder: 'ConsultarEmpleados'}},
            { path: 'addreclutamiento', component: AddReclutamientoComponent, canActivate: [roleGuard], data:{acceder: 'ConsultarEmpleados'}},
            { path: 'solicitudes', component: DatosReclutamientoComponent, canActivate: [roleGuard], data:{acceder: 'ConsultarEmpleados'}},
            { path: 'consultarvacaciones', component: VacacionesComponent, canActivate: [roleGuard], data:{acceder: 'Vacaciones'}},
            { path: 'agregarvacacion', component: VacacionaddComponent, canActivate: [roleGuard], data:{acceder: 'Vacaciones'}},
            { path: 'historial', component: ConsultarHistorialComponent, canActivate: [roleGuard], data:{acceder: 'HistorialEmpleados'}},
            { path: 'updateCapacitacion/:IdProgramacionCapacitacion', component: UpdateCapacitacionesComponent, canActivate: [roleGuard], data:{acceder: 'ConsultarCapacitaciones'}},
            { path: 'reportes', component: ReportesComponent, canActivate: [roleGuard], data:{acceder: 'Reportes'}},
            { path: 'users', component: UsuariosComponent, canActivate: [roleGuard], data:{acceder: 'Usuarios'}},
            { path: 'updateuser', component: UsuarioeditarComponent, canActivate: [roleGuard], data:{acceder: 'Usuarios'}},
            { path: 'roles', component:  RolesComponent,canActivate: [roleGuard], data:{acceder: 'Usuarios'}},
            { path: 'updaterole/:IdRole', component: RoleeditarComponent, canActivate: [roleGuard], data:{acceder: 'Usuarios'}},
            /*{ path: 'faltas', component: FaltasComponent, canActivate: [roleGuard], data:{acceder: 'Faltas'}},
            { path: 'faltasdias/:IdFalta', component: FaltasdiasComponent, canActivate: [roleGuard], data:{acceder: 'Faltas'}},*/
            { path: 'faltas', component: FaltasComponent},
            { path: 'faltasdias/:IdFalta', component: FaltasdiasComponent},
            { path: 'reportesnormativa', component: ReportesNormativaComponent, canActivate: [roleGuard], data:{acceder: 'ReportesNormativa'}},
            
        ]
    },

    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },
    
];


/*
export const routes: Routes = [
    { path: 'system',
        loadComponent:()=> import('./shared/components/system/system.component').then((c) => c.SystemComponent),
        canActivate: [authGuard] },
    
    { path: 'data', component: DatosCapacitacionCatalogoComponent, canActivate: [authGuard] },
   

    { path: 'system', component: SystemComponent, canActivate: [authGuard],
        children:[
            {path:'empleados', component: EmpleadosComponent},
            {path:'dashboard', component: DashboardComponent},
            { path: 'incidencias', component: IncidenciasComponent },
            //{ path: 'capacitaciones', component: CapacitacionesComponent },
            { path: 'catalogocapacitaciones', component: DatosCapacitacionCatalogoComponent},
            { path: 'programarcapacitaciones', component: ProgramarCapacitacionesComponent},
            { path: 'consultarcapacitaciones', component: ConsultarCapacitacionesComponent},
            
            { path: 'puestos', component: PuestoComponentComponent },
            { path: 'departamentos', component: ComponentDepartamentoComponent},
            { path: 'addEmpleado', component: AddEmpleadoComponent},
            { path: 'updateEmpleado/:NoNomina', component: UpdateEmpleadoComponent},
            { path: 'consultarEmpleado/:NoNomina', component: ConsultarEmpleadoComponent},
            //{ path: 'addreclutamiento', component: ConsultarCapacitacionesComponent},
            { path: 'addreclutamiento', component: AddReclutamientoComponent},
            { path: 'solicitudes', component: DatosReclutamientoComponent},
            { path: 'consultarvacaciones', component: VacacionesComponent},
            {path: 'agregarvacacion', component: VacacionaddComponent},
            {path: 'historial', component: ConsultarHistorialComponent},
            {path: 'updateCapacitacion/:IdProgramacionCapacitacion', component: UpdateCapacitacionesComponent},
            {path: 'reportes', component: ReportesComponent},
            
           

        ]
     },
     
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },
    ];



    /*{path: 'login', component: LoginComponent},
    {path: 'data', component: DatosCapacitacionCatalogoComponent},
    //{path: 'home', component: AppComponent},
    {path: 'login', component: LoginComponent},
    {path: 'incidencias', component: IncidenciasComponent},
    {path: 'capacitaciones', component: CapacitacionesComponent},
    {path: 'catalogocapacitaciones', component: DatosCapacitacionCatalogoComponent},
    

    {path: 'system', component: SystemComponent},
    {path: 'empleados', component: EmpleadosComponent},
    {path: 'puestos', component: PuestoComponentComponent},
    {path: 'departamentos', component: ComponentDepartamentoComponent},
    {path: 'addEmpleado', component: AddEmpleadoComponent},
    {path: 'updateEmpleado/:NoNomina', component: UpdateEmpleadoComponent},
    
    
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: '**', redirectTo: '/login' }
    //{ path: '', redirectTo: '/data', pathMatch: 'full' }, // Redirecciona las rutas vacías a '/home'
    //{ path: '**', redirectTo: '/data' }  // Redirecciona las rutas no encontradas a '/home'
    */


