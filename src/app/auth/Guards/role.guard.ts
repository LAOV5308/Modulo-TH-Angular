import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../../../backend/services/auth.service';
import { inject } from '@angular/core';
import { access } from 'fs';
import { Usuario } from '../../../../backend/models/user.model';
import { of, switchMap } from 'rxjs';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);
  const acceder = route.data['acceder'];
  const idUser = authService.getIdUser();

  // Retornamos un observable que Angular espera
  return authService.getUser(idUser).pipe(
    switchMap((data: Usuario[]) => {
      const UsuarioSeleccionado = data;

      let hasAccess = false;

      switch (acceder) {
        case 'ConsultarEmpleados':
          hasAccess = authService.isLoggedIn() && UsuarioSeleccionado[0].ConsultarEmpleados;
          break;
        case 'HistorialEmpleados':
          hasAccess = authService.isLoggedIn() && UsuarioSeleccionado[0].HistorialEmpleados;
          break;
        case 'Incidencias':
          hasAccess = authService.isLoggedIn() && UsuarioSeleccionado[0].Incidencias;
          break;
        case 'Vacaciones':
          hasAccess = authService.isLoggedIn() && UsuarioSeleccionado[0].Vacaciones;
          break;
        case 'Dashboard':
          hasAccess = authService.isLoggedIn() && UsuarioSeleccionado[0].Dashboard;
          break;
        case 'ConsultarCapacitaciones':
          hasAccess = authService.isLoggedIn() && UsuarioSeleccionado[0].ConsultarCapacitaciones;
          break;
        case 'Departamentos':
          hasAccess = authService.isLoggedIn() && UsuarioSeleccionado[0].Departamentos;
          break;
        case 'Puestos':
          hasAccess = authService.isLoggedIn() && UsuarioSeleccionado[0].Puestos;
          break;
        case 'Usuarios':
          hasAccess = authService.isLoggedIn() && UsuarioSeleccionado[0].Usuarios;
          break;
        case 'Reportes':
          hasAccess = authService.isLoggedIn() && UsuarioSeleccionado[0].Reportes;
          break;
          case 'Faltas':
          hasAccess = authService.isLoggedIn() && UsuarioSeleccionado[0].Faltas;
          break;
        case 'ReportesNormativa':
          hasAccess = authService.isLoggedIn() && UsuarioSeleccionado[0].ReportesNormativa;
          break;
        default:
          router.navigate(['/login']);
          return of(false);
      }

      return of(hasAccess ? true : (router.navigate(['/login']), false));
    })
  );
};






/*
console.log(acceder);

  console.log(userRole);
  console.log(authService.isLoggedIn());

  console.log(authService.isLoggedIn());*/



/*router.navigate(['/login']);
  return false;
*/
 
   







