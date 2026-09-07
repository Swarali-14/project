import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

export const employeeGuard: CanActivateFn = () => {

  const router = inject(Router);

  const role =
    localStorage.getItem('role');

  const employeeId =
    localStorage.getItem('employeeId');

  if (
    role === 'EMPLOYEE' &&
    employeeId
  ) {
    return true;
  }

  if (role === 'ADMIN') {

    alert(
      'This page is available only for employees.'
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

// emp guards protects

// /apply-leave
// /leave-history
// /view-balance