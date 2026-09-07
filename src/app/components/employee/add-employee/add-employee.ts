import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EmployeeService }
  from '../../../services/employee.service';

import { Employee }
  from '../../../models/employee';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css'
})
export class AddEmployee {

  employee: Employee = {
    name: '',
    email: '',
    password: '',
    department: ''
  };

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private employeeService: EmployeeService
  ) {}

  addEmployee(): void {

  this.successMessage = '';
  this.errorMessage = '';

  if (
    !this.employee.name.trim() ||
    !this.employee.email.trim() ||
    !this.employee.password.trim() ||
    !this.employee.department
  ) {
    this.errorMessage =
      'Please fill all the fields.';

    return;
  }

  const capitaEmailPattern =
    /^[a-z]+\.[a-z]+@capita\.co\.uk$/i;

  if (
    !capitaEmailPattern.test(
      this.employee.email.trim()
    )
  ) {
    this.errorMessage =
      'Email must follow firstname.lastname@capita.co.uk format.';

    return;
  }

  this.isSubmitting = true;

  this.employeeService
    .addEmployee(this.employee)
    .subscribe({

      next: () => {

        this.successMessage =
          'Employee added successfully.';

        this.isSubmitting = false;
        this.resetForm();
      },

      error: (error) => {

        console.error(
          'Add employee error:',
          error
        );

        this.errorMessage =
          typeof error.error === 'string'
            ? error.error
            : 'Unable to add employee.';

        this.isSubmitting = false;
      }
    });
}

  resetForm(): void {

    this.employee = {
      name: '',
      email: '',
      password: '',
      department: ''
    };
  }
}