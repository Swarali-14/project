import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Leave } from '../models/leave';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private baseUrl =
    'http://localhost:8080/api/leaves';

  constructor(
    private http: HttpClient
  ) {}

  // Employee applies for leave
  applyLeave(
    leaveData: Leave
  ): Observable<Leave> {

    return this.http.post<Leave>(
      this.baseUrl,
      leaveData
    );
  }

  // Get logged-in employee's leave history
  getLeavesByEmployee(
    employeeId: number
  ): Observable<Leave[]> {

    return this.http.get<Leave[]>(
      `${this.baseUrl}/employee/${employeeId}`
    );
  }

  // Employee cancels leave
  cancelLeave(
    leaveId: number
  ): Observable<Leave> {

    return this.http.put<Leave>(
      `${this.baseUrl}/cancel/${leaveId}`,
      {}
    );
  }

  // Admin views pending leave requests
  getPendingLeaves(): Observable<Leave[]> {

    return this.http.get<Leave[]>(
      `${this.baseUrl}/pending`
    );
  }

  // Admin approves leave
  approveLeave(
    leaveId: number
  ): Observable<Leave> {

    return this.http.put<Leave>(
      `${this.baseUrl}/${leaveId}/approve`,
      {}
    );
  }

  // Admin rejects leave
  rejectLeave(
    leaveId: number
  ): Observable<Leave> {

    return this.http.put<Leave>(
      `${this.baseUrl}/${leaveId}/reject`,
      {}
    );
  }
}