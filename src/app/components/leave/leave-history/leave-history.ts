import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { LeaveService } from '../../../services/leave.service';
import { Leave } from '../../../models/leave';

@Component({
  selector: 'app-leave-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-history.html',
  styleUrl: './leave-history.css'
})
export class LeaveHistory implements OnInit {

  leaves: Leave[] = [];

  isLoading = false;

  errorMessage = '';

  constructor(
    private leaveService: LeaveService
  ) {}

  ngOnInit(): void {
    this.loadLeaveHistory();
  }

  loadLeaveHistory(): void {

    const employeeId = Number(
      localStorage.getItem('employeeId')
    );

    if (!employeeId) {
      this.errorMessage =
        'Please login again.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.leaveService
      .getLeavesByEmployee(employeeId)
      .subscribe({

        next: (response) => {

          this.leaves = response;

          this.isLoading = false;
        },

        error: (error) => {

          console.error(
            'Leave history error:',
            error
          );

          this.errorMessage =
            'Unable to load leave history.';

          this.isLoading = false;
        }
      });
  }

  cancelLeave(leaveId?: number): void {

    if (!leaveId) {
      return;
    }

    const shouldCancel = confirm(
      'Do you want to cancel this leave request?'
    );

    if (!shouldCancel) {
      return;
    }

    this.leaveService
      .cancelLeave(leaveId)
      .subscribe({

        next: () => {

          alert('Leave Cancelled Successfully');

          this.loadLeaveHistory();
        },

        error: (error) => {

          console.error(
            'Cancel leave error:',
            error
          );

          alert('Unable to cancel leave');
        }
      });
  }
}