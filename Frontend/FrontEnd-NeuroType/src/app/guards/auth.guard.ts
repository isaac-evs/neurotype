import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const routerService = inject(Router);

  if(authService.isLoggedIn()){
    return true
  }else{
    routerService.navigateByUrl('/')
    return false
  }
};
