import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../ServicesAuth/auth.service';


export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  
  //return true;

// Utiliza el método de AuthService para verificar el estado de autenticación

if (authService.isLoggedIn()) {
  return true;
  
} else {
  router.navigate(['/login']);
  return false;
}

};
