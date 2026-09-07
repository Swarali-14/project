package com.example.leavemanagement.service;

import com.example.leavemanagement.entity.Department;
import com.example.leavemanagement.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(
            DepartmentRepository departmentRepository) {

        this.departmentRepository = departmentRepository;
    }

    public Department addDepartment(
            Department department) {

        return departmentRepository.save(department);
    }

    public List<Department> getAllDepartments() {

        return departmentRepository.findAll();
    }
}