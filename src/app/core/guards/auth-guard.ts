import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let isAuthenticatedUser = undefined
    if (typeof window !== 'undefined' && window.localStorage) {
       isAuthenticatedUser = localStorage.getItem('isLoggedIn');

  }
  if(isAuthenticatedUser){
    return router.createUrlTree(['/home']);
  }
  return true;
};
