import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LeaveBalance } from '../models/leave-balance';

@Injectable({
  providedIn: 'root'
})
export class LeaveBalanceService {

  private baseUrl =
    'http://localhost:8080/api/leave-balances';

  constructor(
    private http: HttpClient
  ) {}

  getEmployeeBalances(
    employeeId: number
  ): Observable<LeaveBalance[]> {

    return this.http.get<LeaveBalance[]>(
      `${this.baseUrl}/employee/${employeeId}`
    );
  }
}