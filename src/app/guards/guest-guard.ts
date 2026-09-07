import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

export const guestGuard: CanActivateFn = () => {

  const router = inject(Router);

  const role =
    localStorage.getItem('role');

  if (
    role === 'ADMIN' ||
    role === 'EMPLOYEE'
  ) {

    return router.createUrlTree([
      '/dashboard'
    ]);
  }

  return true;
};