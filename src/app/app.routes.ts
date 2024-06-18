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



export const routes: Routes = [
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


    { path: 'system',
        loadComponent:()=> import('./shared/components/system/system.component').then((c) => c.SystemComponent),
        canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'data', component: DatosCapacitacionCatalogoComponent, canActivate: [authGuard] },
    { path: 'incidencias', component: IncidenciasComponent, canActivate: [authGuard] },
    { path: 'capacitaciones', component: CapacitacionesComponent, canActivate: [authGuard] },
    { path: 'catalogocapacitaciones', component: DatosCapacitacionCatalogoComponent, canActivate: [authGuard] },
    { path: 'system', component: SystemComponent, canActivate: [authGuard] },
    { path: 'empleados', component: EmpleadosComponent, canActivate: [authGuard] },
    { path: 'puestos', component: PuestoComponentComponent, canActivate: [authGuard] },
    { path: 'departamentos', component: ComponentDepartamentoComponent, canActivate: [authGuard]},
    { path: 'addEmpleado', component: AddEmpleadoComponent, canActivate: [authGuard] },
    { path: 'updateEmpleado/:NoNomina', component: UpdateEmpleadoComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }

];
