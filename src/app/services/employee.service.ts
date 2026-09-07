import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl =
    'http://localhost:8080/api/employees';

  constructor(
    private http: HttpClient
  ) {}

  addEmployee(
    employee: Employee
  ): Observable<Employee> {

    return this.http.post<Employee>(
      this.baseUrl,
      employee
    );
  }

  getAllEmployees(): Observable<Employee[]> {

    return this.http.get<Employee[]>(
      this.baseUrl
    );
  }

  deleteEmployee(
  employeeId: number
): Observable<string> {

  return this.http.delete(
    `${this.baseUrl}/${employeeId}`,
    {
      responseType: 'text'
    }
  );
}
}