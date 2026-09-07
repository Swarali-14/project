package com.example.leavemanagement.controller;
import com.example.leavemanagement.entity.Employee;
import com.example.leavemanagement.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//added frontend path here [connection]

@CrossOrigin(originPatterns = "http://localhost:*")
@RestController

@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // Add a new employee
    @PostMapping
    public ResponseEntity<Employee> addEmployee(
            @RequestBody Employee employee) {

        Employee savedEmployee =
                employeeService.addEmployee(employee);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedEmployee);
    }

    // View all employees
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {

        List<Employee> employees =
                employeeService.getAllEmployees();

        return ResponseEntity.ok(employees);
    }

    // View one employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(
            @PathVariable Long id) {

        Employee employee =
                employeeService.getEmployeeById(id);

        return ResponseEntity.ok(employee);
    }

        // API: Update employee details by employee ID

    @PutMapping("/{employeeId}")
public Employee updateEmployee(
        @PathVariable Long employeeId,
        @RequestBody Employee employee) 
        
        {    
            // Call service layer to perform update operation

    return employeeService.updateEmployee(
            employeeId,
            employee
    );
        }

        // API: Delete Employee
    @DeleteMapping("/{employeeId}")
        public String deleteEmployee(
        @PathVariable Long employeeId) 
        {
    employeeService.deleteEmployee(employeeId);

    return "Employee deleted successfully";
        }
}
