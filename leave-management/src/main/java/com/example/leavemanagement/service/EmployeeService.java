package com.example.leavemanagement.service;

import com.example.leavemanagement.entity.Employee;
import com.example.leavemanagement.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import com.example.leavemanagement.entity.LeaveBalance;
import com.example.leavemanagement.repository.LeaveBalanceRepository;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;

    public EmployeeService(EmployeeRepository employeeRepository,LeaveBalanceRepository leaveBalanceRepository) 
    {
        this.employeeRepository = employeeRepository;
        this.leaveBalanceRepository = leaveBalanceRepository;
    }

    // Add a new employee
   @Transactional
public Employee addEmployee(Employee employee) {

    // Validate Capita employee email
    if (employee.getEmail() == null ||
            !employee.getEmail()
                    .trim()
                    .matches(
                            "(?i)^[a-z]+\\.[a-z]+@capita\\.co\\.uk$"
                    )) {

        throw new RuntimeException(
                "Email must follow firstname.lastname@capita.co.uk format"
        );
    }

    // Convert email to lowercase before saving
    employee.setEmail(
            employee.getEmail()
                    .trim()
                    .toLowerCase()
    );

    // Check duplicate email
    if (employeeRepository.existsByEmail(
            employee.getEmail())) {

        throw new RuntimeException(
                "Employee with this email already exists"
        );
    }

    // Save employee
    Employee savedEmployee =
            employeeRepository.save(employee);

    // Casual Leave = 12 days
    LeaveBalance casualLeave =
            new LeaveBalance();

    casualLeave.setEmployeeId(
            savedEmployee.getId());

    casualLeave.setLeaveTypeId(1L);
    casualLeave.setTotalDays(12);
    casualLeave.setUsedDays(0);
    casualLeave.setRemainingDays(12);

    leaveBalanceRepository.save(
            casualLeave);

    // Sick Leave = 10 days
    LeaveBalance sickLeave =
            new LeaveBalance();

    sickLeave.setEmployeeId(
            savedEmployee.getId());

    sickLeave.setLeaveTypeId(2L);
    sickLeave.setTotalDays(10);
    sickLeave.setUsedDays(0);
    sickLeave.setRemainingDays(10);

    leaveBalanceRepository.save(
            sickLeave);

    // Privilege Leave = 15 days
    LeaveBalance privilegeLeave =
            new LeaveBalance();

    privilegeLeave.setEmployeeId(
            savedEmployee.getId());

    privilegeLeave.setLeaveTypeId(3L);
    privilegeLeave.setTotalDays(15);
    privilegeLeave.setUsedDays(0);
    privilegeLeave.setRemainingDays(15);

    leaveBalanceRepository.save(
            privilegeLeave);

    return savedEmployee;
        
}

    // View all employees
 // View all employees
public List<Employee> getAllEmployees() {
    return employeeRepository.findAll();
}

// Find one employee using employee ID
public Employee getEmployeeById(Long id) {

    return employeeRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Employee not found with ID: " + id
                    )
            );
}

// Update existing employee details
public Employee updateEmployee(
        Long employeeId,
        Employee updatedEmployee) {

    Employee employee =
            employeeRepository.findById(employeeId)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Employee not found with ID: "
                                            + employeeId
                            )
                    );

    employee.setName(
            updatedEmployee.getName());

    employee.setEmail(
            updatedEmployee.getEmail());

    employee.setPassword(
        updatedEmployee.getPassword());

    employee.setDepartment(
            updatedEmployee.getDepartment());

    employee.setLeaveBalance(
            updatedEmployee.getLeaveBalance());

    return employeeRepository.save(employee);
}

// Delete employee by ID
public void deleteEmployee(Long employeeId) {

    // Check whether employee exists
    if (!employeeRepository.existsById(employeeId)) {

        throw new RuntimeException(
                "Employee not found with ID: "
                        + employeeId
        );
    }

    // Delete employee
    employeeRepository.deleteById(employeeId);
}
}