import { Routes } from '@angular/router';
import { LoginComponent } from '../../frontend/login/login.component';
import { NgModule } from '@angular/core';
import { DatosComponent } from '../../frontend/Datos/datos/datos.component';


export const routes: Routes = [
    /*{path: 'login', component: LoginComponent},*/
    {path: 'data', component: DatosComponent},
    {path: 'home', component: LoginComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: '**', redirectTo: '/home' }
    //{ path: '', redirectTo: '/data', pathMatch: 'full' }, // Redirecciona las rutas vacías a '/home'
    //{ path: '**', redirectTo: '/data' }  // Redirecciona las rutas no encontradas a '/home'
];
