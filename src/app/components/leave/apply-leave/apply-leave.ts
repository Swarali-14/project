import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LeaveService } from '../../../services/leave.service';

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './apply-leave.html',
  styleUrl: './apply-leave.css'
})
export class ApplyLeave {

  leaveType = '';
  leaveDuration = '';
  startDate = '';
  endDate = '';
  reason = '';

  isSubmitting = false;

  constructor(
    private leaveService: LeaveService
  ) {}

  applyLeave(): void {

    const employeeId = Number(
      localStorage.getItem('employeeId')
    );

    // Check whether employee is logged in
    if (!employeeId) {
      alert('Please login again.');
      return;
    }

    // Check whether all fields are filled
    if (
      !this.leaveType ||
      !this.leaveDuration ||
      !this.startDate ||
      !this.endDate ||
      !this.reason.trim()
    ) {
      alert('Please fill all the fields.');
      return;
    }

    // End date cannot be before start date
    if (this.endDate < this.startDate) {
      alert('End date cannot be before start date.');
      return;
    }

    if (
  this.leaveDuration === 'HALF_DAY' &&
  this.startDate !== this.endDate
) {
  alert(
    'For Half-Day leave, Start Date and End Date must be the same.'
  );

  return;
}

    // Employee ID comes automatically from login
    const leaveData = {
      employeeId: employeeId,
      leaveType: this.leaveType,
      leaveDuration: this.leaveDuration,
      startDate: this.startDate,
      endDate: this.endDate,
      reason: this.reason.trim()
    };

    console.log('Leave request:', leaveData);

    this.isSubmitting = true;

    this.leaveService
      .applyLeave(leaveData)
      .subscribe({

        next: (response) => {

          console.log(
            'Leave response:',
            response
          );

          alert(
            'Leave Applied Successfully'
          );

          this.resetForm();

          this.isSubmitting = false;
        },

        error: (error) => {

          console.error(
            'Apply leave error:',
            error
          );

          let errorMessage =
            'Failed to apply leave. Please try again.';

          // Backend returned plain text
          if (
            typeof error.error === 'string' &&
            error.error.trim()
          ) {
            errorMessage = error.error;
          }

          // Backend returned an object with message
          else if (error.error?.message) {
            errorMessage = error.error.message;
          }

          // Angular/network error
          else if (error.message) {
            errorMessage = error.message;
          }

          // Backend is unavailable
          if (error.status === 0) {
            errorMessage =
              'Backend is not running. Please start the Spring Boot application.';
          }

          // Generic backend error
          else if (
            error.status === 500 &&
            !error.error?.message
          ) {
            errorMessage =
              'Request failed on the server. Check the Spring Boot terminal for the exact error.';
          }

          alert(errorMessage);

          this.isSubmitting = false;
        }
      });
  }

  resetForm(): void {

    this.leaveType = '';
    this.leaveDuration = '';
    this.startDate = '';
    this.endDate = '';
    this.reason = '';
  }
}