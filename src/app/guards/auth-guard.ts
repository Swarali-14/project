import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  const role =
    localStorage.getItem('role');

  if (
    role === 'EMPLOYEE' ||
    role === 'ADMIN'
  ) {
    return true;
  }

  alert(
    'Please login to access this page.'
  );

  return router.createUrlTree(['/']);
};


//Role exists
//  Access allowed

// Role missing
// redirect to Login page