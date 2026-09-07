import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterLink
} from '@angular/router';

import { AuthService }
  from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {

  email = '';
  otp = '';
  newPassword = '';
  confirmPassword = '';

  currentStep = 1;

  isSubmitting = false;

  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  generateOtp(): void {

    this.clearMessages();

    if (!this.email.trim()) {
      this.errorMessage =
        'Email is required.';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage =
        'Enter a valid email address.';
      return;
    }

    this.isSubmitting = true;

    this.authService
      .generateOtp(this.email.trim())
      .subscribe({

        next: (response) => {

          console.log(
            'Generate OTP response:',
            response
          );

          this.successMessage = response;

          this.currentStep = 2;

          this.isSubmitting = false;
        },

        error: (error) => {

          console.error(
            'Generate OTP error:',
            error
          );

          this.errorMessage =
            this.getErrorMessage(
              error,
              'Unable to generate OTP.'
            );

          this.isSubmitting = false;
        }
      });
  }

  verifyOtp(): void {

    this.clearMessages();

    if (!this.otp.trim()) {
      this.errorMessage =
        'OTP is required.';
      return;
    }

    if (!/^\d{6}$/.test(this.otp.trim())) {
      this.errorMessage =
        'OTP must contain exactly 6 digits.';
      return;
    }

    this.isSubmitting = true;

    this.authService
      .verifyOtp(
        this.email.trim(),
        this.otp.trim()
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Verify OTP response:',
            response
          );

          this.successMessage = response;

          this.currentStep = 3;

          this.isSubmitting = false;
        },

        error: (error) => {

          console.error(
            'Verify OTP error:',
            error
          );

          this.errorMessage =
            this.getErrorMessage(
              error,
              'Invalid OTP.'
            );

          this.isSubmitting = false;
        }
      });
  }

  resetPassword(): void {

    this.clearMessages();

    if (!this.newPassword.trim()) {
      this.errorMessage =
        'New password is required.';
      return;
    }

    if (this.newPassword.length < 4) {
      this.errorMessage =
        'Password must contain at least 4 characters.';
      return;
    }

    if (
      this.newPassword !==
      this.confirmPassword
    ) {
      this.errorMessage =
        'New password and confirm password do not match.';
      return;
    }

    this.isSubmitting = true;

    this.authService
      .resetPassword(
        this.email.trim(),
        this.newPassword
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Reset password response:',
            response
          );

          alert(response);

          this.isSubmitting = false;

          this.router.navigate(['/']);
        },

        error: (error) => {

          console.error(
            'Reset password error:',
            error
          );

          this.errorMessage =
            this.getErrorMessage(
              error,
              'Unable to reset password.'
            );

          this.isSubmitting = false;
        }
      });
  }

  backToEmail(): void {

    this.currentStep = 1;
    this.otp = '';

    this.clearMessages();
  }

  private clearMessages(): void {

    this.successMessage = '';
    this.errorMessage = '';
  }

  private isValidEmail(
    email: string
  ): boolean {

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(
      email.trim()
    );
  }

  private getErrorMessage(
    error: any,
    defaultMessage: string
  ): string {

    if (
      typeof error.error === 'string' &&
      error.error.trim()
    ) {
      return error.error;
    }

    if (error.error?.message) {
      return error.error.message;
    }

    if (error.status === 0) {
      return 'Backend is not running.';
    }

    return defaultMessage;
  }
}
``