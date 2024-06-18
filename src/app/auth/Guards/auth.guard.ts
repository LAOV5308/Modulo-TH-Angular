import { inject} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../ServicesAuth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  /*const authService = inject(AuthService);
  const router = inject(Router);*/
  
  //console.log(authService.isLoggedIn());
  return true;

  /*
  if (authService.hola()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }*/
};