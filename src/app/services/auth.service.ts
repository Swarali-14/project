import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl =
    'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient
  ) {}

  login(
    loginData: Login
  ): Observable<any> {

    return this.http.post(
      `${this.baseUrl}/login`,
      loginData
    );
  }

  generateOtp(
    email: string
  ): Observable<string> {

    return this.http.post(
      `${this.baseUrl}/generate-otp`,
      { email: email },
      {
        responseType: 'text'
      }
    );
  }

  verifyOtp(
    email: string,
    otp: string
  ): Observable<string> {

    return this.http.post(
      `${this.baseUrl}/verify-otp`,
      {
        email: email,
        otp: otp
      },
      {
        responseType: 'text'
      }
    );
  }

  resetPassword(
    email: string,
    newPassword: string
  ): Observable<string> {

    return this.http.post(
      `${this.baseUrl}/reset-password`,
      {
        email: email,
        newPassword: newPassword
      },
      {
        responseType: 'text'
      }
    );
  }

  changePassword(
    email: string,
    oldPassword: string,
    newPassword: string
  ): Observable<string> {

    return this.http.post(
      `${this.baseUrl}/change-password`,
      {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
      },
      {
        responseType: 'text'
      }
    );
  }
}