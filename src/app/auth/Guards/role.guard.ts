import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../ServicesAuth/auth.service';
import { inject } from '@angular/core';



export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'];

  const userRole = authService.getUserRole();
  if (authService.isLoggedIn() && userRole === expectedRole) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
