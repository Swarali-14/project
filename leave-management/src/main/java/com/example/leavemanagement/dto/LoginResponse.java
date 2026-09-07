package com.example.leavemanagement.dto;

public class LoginResponse {

    private String message;
    private String role;
    private Long employeeId;

    public LoginResponse(
            String message,
            String role,
            Long employeeId) {

        this.message = message;
        this.role = role;
        this.employeeId = employeeId;
    }

    public String getMessage() {
        return message;
    }

    public String getRole() {
        return role;
    }

    public Long getEmployeeId() {
        return employeeId;
    }
}