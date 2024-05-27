import { Routes, RouterModule} from '@angular/router';
import { LoginComponent } from '../../frontend/login/login.component';
import { NgModule } from '@angular/core';
import { DatosComponent } from '../../frontend/Datos/datos/datos.component';
import { SystemComponent } from './shared/components/system/system.component';
import { EmpleadosComponent } from './shared/components/empleados/empleados.component';
import { ComponentDepartamentoComponent } from './shared/components/Departamentos/component-departamento.component';
import { AddEmpleadoComponent } from './shared/components/empleados/add-empleado/add-empleado.component';
import { PuestoComponentComponent } from './shared/components/Puestos/puesto-component.component';






export const routes: Routes = [
    /*{path: 'login', component: LoginComponent},*/
    {path: 'data', component: AddEmpleadoComponent},
    {path: 'home', component: LoginComponent},
    {path: 'system', component: SystemComponent},
    {path: 'empleados', component: EmpleadosComponent},
    {path: 'puestos', component: PuestoComponentComponent},
    {path: 'departamentos', component: ComponentDepartamentoComponent},
    {path: 'addEmpleado', component: AddEmpleadoComponent},
    

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: '**', redirectTo: '/home' }
    //{ path: '', redirectTo: '/data', pathMatch: 'full' }, // Redirecciona las rutas vacías a '/home'
    //{ path: '**', redirectTo: '/data' }  // Redirecciona las rutas no encontradas a '/home'
];
