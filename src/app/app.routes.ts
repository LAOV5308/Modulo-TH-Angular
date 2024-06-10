import { Routes, RouterModule} from '@angular/router';
import { LoginComponent } from '../../frontend/login/login.component';
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






export const routes: Routes = [
    /*{path: 'login', component: LoginComponent},*/
    {path: 'data', component: ComponentHistorialComponent},
    //{path: 'home', component: AppComponent},
    {path: 'login', component: LoginComponent},
    {path: 'incidencias', component: IncidenciasComponent},
    {path: 'capacitaciones', component: CapacitacionesComponent},
    
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
];
