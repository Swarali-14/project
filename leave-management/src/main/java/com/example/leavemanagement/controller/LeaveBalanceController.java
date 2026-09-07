package com.example.leavemanagement.controller;

import com.example.leavemanagement.entity.LeaveBalance;
import com.example.leavemanagement.service.LeaveBalanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave-balances")
@CrossOrigin(originPatterns = "http://localhost:*")
public class LeaveBalanceController {

    private final LeaveBalanceService leaveBalanceService;

    public LeaveBalanceController(
            LeaveBalanceService leaveBalanceService) {

        this.leaveBalanceService = leaveBalanceService;
    }

    // Add Leave Balance
    @PostMapping
    public LeaveBalance addLeaveBalance(
            @RequestBody LeaveBalance leaveBalance) {

        return leaveBalanceService.addLeaveBalance(
                leaveBalance
        );
    }

    // View All Leave Balances
    @GetMapping
    public List<LeaveBalance> getAllBalances() {

        return leaveBalanceService.getAllBalances();
    }

    // View Leave Balances For One Employee
    @GetMapping("/employee/{employeeId}")
    public List<LeaveBalance> getEmployeeBalances(
            @PathVariable Long employeeId) {

        return leaveBalanceService
                .getEmployeeBalances(employeeId);
    }

    // Update Leave Balance
    @PutMapping("/{balanceId}")
    public LeaveBalance updateLeaveBalance(
            @PathVariable Long balanceId,
            @RequestBody LeaveBalance leaveBalance) {

        return leaveBalanceService.updateLeaveBalance(
                balanceId,
                leaveBalance
        );
    }
}