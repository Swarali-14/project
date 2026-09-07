import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink
} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  role =
    localStorage.getItem('role') || '';

  constructor(
    private router: Router
  ) {}

  isEmployee(): boolean {
    return this.role === 'EMPLOYEE';
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }


logout(): void {

  localStorage.removeItem('employeeId');
  localStorage.removeItem('role');
  localStorage.removeItem('email');

  this.router.navigateByUrl('/',
    {
      replaceUrl: true
    }
  );
}
}