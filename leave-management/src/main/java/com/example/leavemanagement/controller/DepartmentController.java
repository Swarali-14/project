package com.example.leavemanagement.controller;

import com.example.leavemanagement.entity.Department;
import com.example.leavemanagement.service.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin("*")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(
            DepartmentService departmentService) {

        this.departmentService = departmentService;
    }

    @PostMapping
    public ResponseEntity<Department> addDepartment(
            @RequestBody Department department) {

        Department savedDepartment =
                departmentService.addDepartment(department);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedDepartment);
    }

    @GetMapping
    public List<Department> getAllDepartments() {

        return departmentService.getAllDepartments();
    }
}