import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { LeaveService }
  from '../../../services/leave.service';

import { Leave }
  from '../../../models/leave';

@Component({
  selector: 'app-pending-leaves',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './pending-leaves.html',
  styleUrl: './pending-leaves.css'
})
export class PendingLeaves implements OnInit {

  pendingLeaves: Leave[] = [];

  isLoading = false;
  processingLeaveId: number | null = null;
  errorMessage = '';

  constructor(
    private leaveService: LeaveService
  ) {}

  ngOnInit(): void {
    this.loadPendingLeaves();
  }

  loadPendingLeaves(): void {

    const role =
      localStorage.getItem('role');

    if (role !== 'ADMIN') {
      this.errorMessage =
        'Only Admin can view pending leave requests.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.leaveService
      .getPendingLeaves()
      .subscribe({

        next: (response) => {

          this.pendingLeaves = response;
          this.isLoading = false;
        },

        error: (error) => {

          console.error(
            'Pending leaves error:',
            error
          );

          this.errorMessage =
            this.getErrorMessage(
              error,
              'Unable to load pending leave requests.'
            );

          this.isLoading = false;
        }
      });
  }

  approveLeave(
    leaveId?: number
  ): void {

    if (!leaveId) {
      return;
    }

    const shouldApprove = confirm(
      'Are you sure you want to approve this leave request?'
    );

    if (!shouldApprove) {
      return;
    }

    this.processingLeaveId = leaveId;

    this.leaveService
      .approveLeave(leaveId)
      .subscribe({

        next: (response) => {

          console.log(
            'Approved leave:',
            response
          );

          alert(
            'Leave approved successfully.'
          );

          this.processingLeaveId = null;

          // Reload list because approved leave
          // should no longer appear in pending list
          this.loadPendingLeaves();
        },

        error: (error) => {

          console.error(
            'Approve leave error:',
            error
          );

          alert(
            this.getErrorMessage(
              error,
              'Unable to approve leave.'
            )
          );

          this.processingLeaveId = null;
        }
      });
  }

  rejectLeave(
    leaveId?: number
  ): void {

    if (!leaveId) {
      return;
    }

    const shouldReject = confirm(
      'Are you sure you want to reject this leave request?'
    );

    if (!shouldReject) {
      return;
    }

    this.processingLeaveId = leaveId;

    this.leaveService
      .rejectLeave(leaveId)
      .subscribe({

        next: (response) => {

          console.log(
            'Rejected leave:',
            response
          );

          alert(
            'Leave rejected successfully.'
          );

          this.processingLeaveId = null;

          // Reload list because rejected leave
          // should no longer appear in pending list
          this.loadPendingLeaves();
        },

        error: (error) => {

          console.error(
            'Reject leave error:',
            error
          );

          alert(
            this.getErrorMessage(
              error,
              'Unable to reject leave.'
            )
          );

          this.processingLeaveId = null;
        }
      });
  }

  formatLeaveType(
    leaveType: string
  ): string {

    switch (leaveType?.toUpperCase()) {

      case 'CASUALLEAVE':
        return 'Casual Leave (CL)';

      case 'SICKLEAVE':
        return 'Sick Leave (SL)';

      case 'PRIVILEGEDLEAVE':
        return 'Privilege Leave (PL)';

      default:
        return leaveType || '-';
    }
  }

  formatDuration(
    leaveDuration: string
  ): string {

    switch (leaveDuration?.toUpperCase()) {

      case 'FULL_DAY':
        return 'Full Day';

      case 'HALF_DAY':
        return 'Half Day';

      default:
        return leaveDuration || '-';
    }
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