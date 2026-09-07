    package com.example.leavemanagement.controller;

    import com.example.leavemanagement.entity.LeaveType;
    import com.example.leavemanagement.service.LeaveTypeService;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/api/leave-types")
    @CrossOrigin(origins = "http://localhost:4200")
    public class LeaveTypeController {

        private final LeaveTypeService service;

        public LeaveTypeController(
                LeaveTypeService service) {

            this.service = service;
        }

        @PostMapping
        public LeaveType addLeaveType(
                @RequestBody LeaveType leaveType) {

            return service.addLeaveType(leaveType);
        }

        @GetMapping
        public List<LeaveType> getAllLeaveTypes() {

            return service.getAllLeaveTypes();
        }

        // API: Update Leave Type
    @PutMapping("/{leaveTypeId}")
    public LeaveType updateLeaveType(
            @PathVariable Long leaveTypeId,
            @RequestBody LeaveType leaveType) {

        return service.updateLeaveType(
                leaveTypeId,
                leaveType
        );
    }
    
}