import { Routes } from '@angular/router';

import { LoginComponent }
  from './components/auth/login/login';

import { ForgotPassword }
  from './components/auth/forgot-password/forgot-password';

import { Dashboard }
  from './components/dashboard/dashboard';

import { ApplyLeave }
  from './components/leave/apply-leave/apply-leave';

import { LeaveHistory }
  from './components/leave/leave-history/leave-history';

import { ViewBalance }
  from './components/leave/view-balance/view-balance';

import { PendingLeaves }
  from './components/leave/pending-leaves/pending-leaves';

import { AddEmployee }
  from './components/employee/add-employee/add-employee';

import { EmployeeList }
  from './components/employee/employee-list/employee-list';

import { authGuard }
  from './guards/auth-guard';

import { adminGuard }
  from './guards/admin-guard';

import { employeeGuard }
  from './guards/employee-guard';

  import { guestGuard }
  from './guards/guest-guard';


export const routes: Routes = [

  // Public Routes

  {
  path: '',
  component: LoginComponent,
  canActivate: [guestGuard]
  },


  {
    path: 'forgot-password',
    component: ForgotPassword
  },

  // Common Protected Route

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  // Employee Routes

  {
    path: 'apply-leave',
    component: ApplyLeave,
    canActivate: [
      authGuard,
      employeeGuard
    ]
  },

  {
    path: 'leave-history',
    component: LeaveHistory,
    canActivate: [
      authGuard,
      employeeGuard
    ]
  },

  {
    path: 'view-balance',
    component: ViewBalance,
    canActivate: [
      authGuard,
      employeeGuard
    ]
  },

  // Admin Routes

  {
    path: 'add-employee',
    component: AddEmployee,
    canActivate: [
      authGuard,
      adminGuard
    ]
  },

  {
    path: 'employee-list',
    component: EmployeeList,
    canActivate: [
      authGuard,
      adminGuard
    ]
  },

  {
    path: 'pending-leaves',
    component: PendingLeaves,
    canActivate: [
      authGuard,
      adminGuard
    ]
  },

  // Unknown Route

  {
    path: '**',
    redirectTo: ''
  }

];