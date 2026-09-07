    package com.example.leavemanagement.service;

import com.example.leavemanagement.entity.LeaveBalance;
import com.example.leavemanagement.repository.LeaveBalanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveBalanceService {

    private final LeaveBalanceRepository leaveBalanceRepository;

    public LeaveBalanceService(
            LeaveBalanceRepository leaveBalanceRepository) {

        this.leaveBalanceRepository = leaveBalanceRepository;
    }

    // Add Leave Balance
    public LeaveBalance addLeaveBalance(
            LeaveBalance leaveBalance) {

        return leaveBalanceRepository.save(
                leaveBalance
        );
    }

    // Get Balance By Employee
    public List<LeaveBalance> getEmployeeBalances(
            Long employeeId) {

        return leaveBalanceRepository
                .findByEmployeeId(employeeId);
    }

    // Get All Leave Balances
    public List<LeaveBalance> getAllBalances() {

        return leaveBalanceRepository.findAll();
    }

    // Update Leave Balance
    public LeaveBalance updateLeaveBalance(
            Long balanceId,
            LeaveBalance updatedBalance) {

        LeaveBalance balance =
                leaveBalanceRepository.findById(balanceId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Leave balance not found"
                                )
                        );

        balance.setTotalDays(
                updatedBalance.getTotalDays());

        balance.setUsedDays(
                updatedBalance.getUsedDays());

        balance.setRemainingDays(
                updatedBalance.getRemainingDays());

        return leaveBalanceRepository.save(
                balance
        );
    }
}