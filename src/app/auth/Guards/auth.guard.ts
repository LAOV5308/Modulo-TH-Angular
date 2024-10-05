import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../../../backend/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  //const expectedRole = route.data['role'];
 

if (authService.isLoggedIn()) {
  return true;
  
} else {
  router.navigate(['/login']);
  return false;
}

};
