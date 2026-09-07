package com.example.leavemanagement.service;

import com.example.leavemanagement.entity.LeaveType;
import com.example.leavemanagement.repository.LeaveTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveTypeService {

    private final LeaveTypeRepository repository;

    public LeaveTypeService(
            LeaveTypeRepository repository) {

        this.repository = repository;
    }

    public LeaveType addLeaveType(
            LeaveType leaveType) {

        return repository.save(leaveType);
    }

    public List<LeaveType> getAllLeaveTypes() {

        return repository.findAll();
    }

    // Update existing leave type
public LeaveType updateLeaveType(
        Long leaveTypeId,
        LeaveType updatedLeaveType) {

    LeaveType leaveType =
            repository.findById(leaveTypeId)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Leave Type not found with ID: "
                                            + leaveTypeId
                            )
                    );

    leaveType.setLeaveName(
            updatedLeaveType.getLeaveName());

    leaveType.setMaxDays(
            updatedLeaveType.getMaxDays());

    return repository.save(leaveType);
}
}