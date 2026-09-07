import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { LeaveBalanceService }
  from '../../../services/leave-balance.service';

import { LeaveBalance }
  from '../../../models/leave-balance';

@Component({
  selector: 'app-view-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-balance.html',
  styleUrl: './view-balance.css'
})
export class ViewBalance implements OnInit {

  balances: LeaveBalance[] = [];

  isLoading = false;

  errorMessage = '';

  constructor(
    private leaveBalanceService:
      LeaveBalanceService
  ) {}

  ngOnInit(): void {
    this.loadBalances();
  }

  loadBalances(): void {

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

    this.leaveBalanceService
      .getEmployeeBalances(employeeId)
      .subscribe({

        next: (response) => {

          this.balances = response;

          this.isLoading = false;
        },

        error: (error) => {

          console.error(
            'Leave balance error:',
            error
          );

          this.errorMessage =
            'Unable to load leave balance.';

          this.isLoading = false;
        }
      });
  }

  getLeaveTypeName(
    leaveTypeId: number
  ): string {

    switch (leaveTypeId) {

      case 1:
        return 'Casual Leave (CL)';

      case 2:
        return 'Sick Leave (SL)';

      case 3:
        return 'Privilege Leave (PL)';

      default:
        return 'Unknown Leave Type';
    }
  }
}