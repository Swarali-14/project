import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { EmployeeService }
  from '../../../services/employee.service';

import { Employee }
  from '../../../models/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {

  employees: Employee[] = [];

  isLoading = false;
  errorMessage = '';

  constructor(
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.employeeService
      .getAllEmployees()
      .subscribe({

        next: (response) => {

          this.employees = response;
          this.isLoading = false;
        },

        error: (error) => {

          console.error(
            'Load employees error:',
            error
          );

          this.errorMessage =
            'Unable to load employees.';

          this.isLoading = false;
        }
      });
  }

  deleteEmployee(
  employeeId?: number
): void {

  if (!employeeId) {
    return;
  }

  const shouldDelete = confirm(
    'Are you sure you want to delete this employee?'
  );

  if (!shouldDelete) {
    return;
  }

  this.employeeService
    .deleteEmployee(employeeId)
    .subscribe({

      next: (response) => {

        console.log(
          'Delete response:',
          response
        );

        alert(
          response ||
          'Employee deleted successfully.'
        );

        this.loadEmployees();
      },

      error: (error) => {

        console.error(
          'Delete employee error:',
          error
        );

        let errorMessage =
          'Unable to delete employee.';

        if (
          typeof error.error === 'string' &&
          error.error.trim()
        ) {
          errorMessage = error.error;
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }

        alert(errorMessage);
      }
    });
  }
}