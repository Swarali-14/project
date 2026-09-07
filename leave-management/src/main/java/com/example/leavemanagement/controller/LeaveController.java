package com.example.leavemanagement.controller;

import com.example.leavemanagement.entity.Leave;
import com.example.leavemanagement.service.LeaveService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(originPatterns = "http://localhost:*")
@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    // Apply Leave
    @PostMapping
    public ResponseEntity<Leave> applyLeave(
            @RequestBody Leave leave) {

        Leave savedLeave =
                leaveService.applyLeave(leave);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedLeave);
    }

    // View All Leave Requests
    @GetMapping
    public ResponseEntity<List<Leave>> getAllLeaves() {

        return ResponseEntity.ok(
                leaveService.getAllLeaves()
        );
    }

    // View Leave Requests By Employee
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Leave>>
    getLeavesByEmployeeId(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                leaveService.getLeavesByEmployeeId(
                        employeeId
                )
        );
    }

    // Cancel Leave
    @PutMapping("/cancel/{id}")
    public Leave cancelLeave(
            @PathVariable Long id) {

        return leaveService.cancelLeave(id);
    }

    // View Pending Leave Requests
    @GetMapping("/pending")
    public List<Leave> getPendingLeaves() {

        return leaveService.getPendingLeaves();
    }

    // Approve Leave
    @PutMapping("/{leaveId}/approve")
    public Leave approveLeave(
            @PathVariable Long leaveId) {

        return leaveService.approveLeave(
                leaveId
        );
    }

    // Reject Leave
    @PutMapping("/{leaveId}/reject")
    public Leave rejectLeave(
            @PathVariable Long leaveId) {

        return leaveService.rejectLeave(
                leaveId
        );
    }
}