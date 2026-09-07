import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';

  isLoggingIn = false;

    constructor(
      private authService: AuthService,
      private router: Router
    ) {}

  login(): void {

    if (!this.email.trim() || !this.password.trim()) {
      alert('Please enter email and password.');
      return;
    }

    const loginData = {
      email: this.email.trim(),
      password: this.password
    };

    this.isLoggingIn = true;

    this.authService
      .login(loginData)
      .subscribe({

        next: (response) => {

          // console.log(
          //   'Login response:',
          //   response
          // );

          localStorage.setItem(
            'role',
            response.role
          );

          if (
            response.role === 'EMPLOYEE' &&
            response.employeeId !== null &&
            response.employeeId !== undefined
          ) {

            localStorage.setItem(
              'employeeId',
              response.employeeId.toString()
            );

          } else {

            localStorage.removeItem(
              'employeeId'
            );
          }

          this.isLoggingIn = false;

          alert('Login Successful');

         this.router.navigateByUrl('/dashboard',
             {
                replaceUrl: true
            }
            );
          },

          // Before: Login → Dashboard
          // After: Dashboard Login history entry ko replace karega

        error: (error) => {

          console.error(
            'Login error:',
            error
          );

          this.isLoggingIn = false;

          alert(
            'Invalid Email or Password'
          );
        }
      });
  }

  openForgotPassword(): void {

    this.router.navigate([
      '/forgot-password'
    ]);
  }
}