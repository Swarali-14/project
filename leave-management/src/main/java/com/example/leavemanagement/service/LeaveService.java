package com.example.leavemanagement.service;

import com.example.leavemanagement.entity.Employee;
import com.example.leavemanagement.entity.Leave;
import com.example.leavemanagement.repository.EmployeeRepository;
import com.example.leavemanagement.entity.LeaveBalance;
import com.example.leavemanagement.repository.LeaveBalanceRepository;
import com.example.leavemanagement.repository.LeaveRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Service
public class LeaveService {

    private final LeaveBalanceRepository leaveBalanceRepository;
    private final LeaveRepository leaveRepository;
    private final EmployeeRepository employeeRepository;

    public LeaveService(
            LeaveRepository leaveRepository,
            EmployeeRepository employeeRepository,
            LeaveBalanceRepository leaveBalanceRepository) {

        this.leaveRepository = leaveRepository;
        this.employeeRepository = employeeRepository;
        this.leaveBalanceRepository = leaveBalanceRepository;
    }

    @Transactional
    public Leave applyLeave(Leave leave) {

        if (leave.getEmployeeId() == null) {
            throw new RuntimeException(
                    "Employee ID is required"
            );
        }

         employeeRepository
                .findById(leave.getEmployeeId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee not found with ID: "
                                        + leave.getEmployeeId()
                        )
                 );

        if (leave.getStartDate() == null
                || leave.getEndDate() == null) {

            throw new RuntimeException(
                    "Start date and end date are required"
            );
        }

        if (leave.getEndDate()
                .isBefore(leave.getStartDate())) {

            throw new RuntimeException(
                    "End date cannot be before start date"
            );
        }

        List<Leave> existingLeaves =
                leaveRepository.findByEmployeeId(
                        leave.getEmployeeId()
                );

        for (Leave existingLeave : existingLeaves) {

            if (!leave.getEndDate().isBefore(
                    existingLeave.getStartDate())
                    &&
                    !leave.getStartDate().isAfter(
                            existingLeave.getEndDate())) {

                throw new RuntimeException(
                        "Leave already applied for selected dates"
                );
            }
        }

        int totalDays = 0;

        LocalDate currentDate =
                leave.getStartDate();

        while (!currentDate.isAfter(
                leave.getEndDate())) {

            DayOfWeek day =
                    currentDate.getDayOfWeek();

            if (day != DayOfWeek.SATURDAY
                    &&
                    day != DayOfWeek.SUNDAY) {

                totalDays++;
            }

            currentDate =
                    currentDate.plusDays(1);
        }

        if (totalDays == 0) {

            throw new RuntimeException(
                    "Selected dates contain no working days"
            );
        }

        Long leaveTypeId;

switch (leave.getLeaveType().toUpperCase()) {

    case "CASUALLEAVE":
        leaveTypeId = 1L;
        break;

    case "SICKLEAVE":
        leaveTypeId = 2L;
        break;

    case "PRIVILEGEDLEAVE":
        leaveTypeId = 3L;
        break;

    default:
        throw new RuntimeException(
                "Invalid leave type"
        );
}

        LeaveBalance leaveBalance =
        leaveBalanceRepository
                .findByEmployeeIdAndLeaveTypeId(
                        leave.getEmployeeId(),
                        leaveTypeId
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Leave balance not found"
                        )
                );

if (totalDays >
        leaveBalance.getRemainingDays()) {

    throw new RuntimeException(
            "Insufficient leave balance"
    );
}


     double calculatedDays = totalDays;

if ("HALF_DAY".equalsIgnoreCase(
        leave.getLeaveDuration())) {

    if (!leave.getStartDate().equals(
            leave.getEndDate())) {

        throw new RuntimeException(
                "For half-day leave, start date and end date must be the same"
        );
    }

    calculatedDays = 0.5;
}

if (calculatedDays >
        leaveBalance.getRemainingDays()) {

    throw new RuntimeException(
            "Insufficient leave balance. Available balance: "
                    + leaveBalance.getRemainingDays()
    );
}
        leave.setTotalDays(calculatedDays);

        // Every new request goes for admin review
        leave.setStatus("PENDING");

        return leaveRepository.save(leave);
    }

    public List<Leave> getAllLeaves() {

        return leaveRepository.findAll();
    }

    public List<Leave> getLeavesByEmployeeId(
            Long employeeId) {

        if (!employeeRepository.existsById(
                employeeId)) {

            throw new RuntimeException(
                    "Employee not found with ID: "
                            + employeeId
            );
        }

        return leaveRepository
                .findByEmployeeId(employeeId);
    }

    @Transactional
    public Leave cancelLeave(Long leaveId) {

        Leave leave = leaveRepository
                .findById(leaveId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Leave not found with ID: "
                                        + leaveId
                        )
                );

        if ("CANCELLED".equals(leave.getStatus())) {

    throw new RuntimeException(
            "Leave is already cancelled"
    );
        }

        if (!"APPROVED".equals(leave.getStatus())) {

    leave.setStatus("CANCELLED");

    return leaveRepository.save(leave);
        }

        Long leaveTypeId;

        switch (leave.getLeaveType().toUpperCase()) {

    case "CASUALLEAVE":
        leaveTypeId = 1L;
        break;

    case "SICKLEAVE":
        leaveTypeId = 2L;
        break;

    case "PRIVILEGEDLEAVE":
        leaveTypeId = 3L;
        break;

    default:
        throw new RuntimeException(
                "Invalid leave type"
        );
        }

        LeaveBalance leaveBalance =
        leaveBalanceRepository
                .findByEmployeeIdAndLeaveTypeId(
                        leave.getEmployeeId(),
                        leaveTypeId
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Leave balance not found"
                        )
                );

        leaveBalance.setUsedDays(
        leaveBalance.getUsedDays()
                - leave.getTotalDays()
        );

        leaveBalance.setRemainingDays(
        leaveBalance.getRemainingDays()
                + leave.getTotalDays()
        );

        leaveBalanceRepository.save(
        leaveBalance
        );

        leave.setStatus("CANCELLED");

        return leaveRepository.save(leave);
    }

    public List<Leave> getPendingLeaves() {

        return leaveRepository.findByStatus(
                "PENDING"
        );
    }

    @Transactional
    public Leave approveLeave(Long leaveId) {

        Leave leave = leaveRepository
                .findById(leaveId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Leave request not found"
                        )
                );

        if ("APPROVED".equals(
        leave.getStatus())) {

    throw new RuntimeException(
            "Leave already approved"
    );
        }

        if (!"PENDING".equals(
        leave.getStatus())) {

    throw new RuntimeException(
            "Only pending leave requests can be approved"
    );
        }

        

        Long leaveTypeId;

switch (leave.getLeaveType().toUpperCase()) {

    case "CASUALLEAVE":
        leaveTypeId = 1L;
        break;

    case "SICKLEAVE":
        leaveTypeId = 2L;
        break;

    case "PRIVILEGEDLEAVE":
        leaveTypeId = 3L;
        break;

    default:
        throw new RuntimeException(
                "Invalid leave type"
        );
}

        LeaveBalance leaveBalance =
        leaveBalanceRepository
                .findByEmployeeIdAndLeaveTypeId(
                        leave.getEmployeeId(),
                        leaveTypeId
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Leave balance not found"
                        )
                );

        leaveBalance.setUsedDays(
        leaveBalance.getUsedDays()
                + leave.getTotalDays()
        );

        leaveBalance.setRemainingDays(
        leaveBalance.getRemainingDays()
                - leave.getTotalDays()
        );

        leaveBalanceRepository.save(
        leaveBalance
        );

        leave.setStatus("APPROVED");

        return leaveRepository.save(leave);
    }

    public Leave rejectLeave(Long leaveId) {

        Leave leave = leaveRepository
                .findById(leaveId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Leave request not found"
                        )
                );

        
        if (!"PENDING".equals(
        leave.getStatus())) {

    throw new RuntimeException(
            "Only pending leave requests can be rejected"
        );
        }

        leave.setStatus("REJECTED");

        return leaveRepository.save(leave);
    }
}