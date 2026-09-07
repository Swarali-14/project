export interface LeaveBalance {
  id: number;
  employeeId: number;
  leaveTypeId: number;
  totalDays: number;
  usedDays: number;
  remainingDays: number;
}