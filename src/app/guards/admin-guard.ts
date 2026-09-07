import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  const role =
    localStorage.getItem('role');

  if (role === 'ADMIN') {
    return true;
  }

  if (role === 'EMPLOYEE') {

    alert(
      'Only Admin can access this page.'
    );

    return router.createUrlTree([
      '/dashboard'
    ]);
  }

  alert(
    'Please login to access this page.'
  );

  return router.createUrlTree(['/']);
};


// admin guard 

// /add-employee
// /employee-list
// /pending-leaves