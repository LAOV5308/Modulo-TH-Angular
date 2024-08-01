import { Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { DatosComponent } from '../../frontend/Datos/datos/datos.component';
import { SystemComponent } from './shared/components/system/system.component';
import { EmpleadosComponent } from './shared/components/empleados/empleados.component';
import { ComponentDepartamentoComponent } from './shared/components/Departamentos/component-departamento.component';
import { AddEmpleadoComponent } from './shared/components/empleados/add-empleado/add-empleado.component';
import { PuestoComponentComponent } from './shared/components/Puestos/puesto-component.component';
import { UpdateEmpleadoComponent } from './shared/components/empleados/update-empleado/update-empleado.component';
import { AddBajaComponent } from './shared/components/Bajas/add-baja/add-baja.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { AppComponent } from './app.component';
import { IncidenciasComponent } from './shared/components/incidencias/incidencias.component';
import { AddIncidenciaComponent } from './shared/components/incidencias/add-incidencia/add-incidencia.component';
import { ComponentHistorialComponent } from './shared/components/empleados/historial/component-historial.component';
import { CapacitacionesComponent } from './shared/components/capacitaciones/capacitaciones.component';
import { DatosCapacitacionCatalogoComponent } from './shared/components/capacitacionesCatalogo/datos-capacitacion-catalogo/datos-capacitacion-catalogo.component';
import { LoginComponent } from './shared/components/Login/login.component';
import { authGuard } from './auth/Guards/auth.guard';
import { ConsultarEmpleadoComponent } from './shared/components/empleados/consultar-empleado/consultar-empleado.component';
import { ReclutamientoComponent } from './shared/components/reclutamiento/reclutamiento.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { AddReclutamientoComponent } from './shared/components/reclutamiento/add-reclutamiento/add-reclutamiento.component';
import { DatosReclutamientoComponent } from './shared/components/reclutamiento/datos-reclutamiento/datos-reclutamiento.component';
import { ProgramarCapacitacionesComponent } from './shared/components/programar-capacitaciones/programar-capacitaciones.component';
import { ConsultarCapacitacionesComponent } from './shared/components/consultar-capacitaciones/consultar-capacitaciones.component';
import { VacacionesComponent } from './shared/components/vacaciones/vacaciones.component';
import { VacacionaddComponent } from './shared/components/vacacionadd/vacacionadd.component';
import { ConsultarHistorialComponent } from './shared/components/consultar-historial/consultar-historial.component';



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
            {path: 'historial', component: ConsultarHistorialComponent}
        ]
     },
     
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },
    


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


];
