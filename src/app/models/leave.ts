export interface Leave {
  id?: number;
  employeeId: number;
  leaveType: string;
  leaveDuration: string;
  startDate: string;
  endDate: string;
  reason: string;
  totalDays?: number;
  status?: string;
}