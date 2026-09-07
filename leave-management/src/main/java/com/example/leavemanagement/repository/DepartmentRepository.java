package com.example.leavemanagement.repository;

import com.example.leavemanagement.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository
        extends JpaRepository<Department, Long> {
}


//provide crud operations auto 
//save()
//findAll()
//findById()
//deleteById()
