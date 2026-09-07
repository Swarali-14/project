package com.example.leavemanagement.service;

import com.example.leavemanagement.dto.ForgotPasswordRequest;
import com.example.leavemanagement.dto.LoginRequest;
import com.example.leavemanagement.dto.LoginResponse;
import com.example.leavemanagement.dto.ResetPasswordRequest;
import com.example.leavemanagement.dto.VerifyOtpRequest;
import com.example.leavemanagement.entity.Employee;
import com.example.leavemanagement.entity.PasswordResetOtp;
import com.example.leavemanagement.repository.EmployeeRepository;
import com.example.leavemanagement.repository.PasswordResetOtpRepository;
import org.springframework.stereotype.Service;
import com.example.leavemanagement.dto.ChangePasswordRequest;

import java.util.Random;

@Service
public class AuthService {

    private final EmployeeRepository employeeRepository;
    private final PasswordResetOtpRepository otpRepository;

    public AuthService(
            EmployeeRepository employeeRepository,
            PasswordResetOtpRepository otpRepository) {

        this.employeeRepository = employeeRepository;
        this.otpRepository = otpRepository;
    }

    // Login
    public LoginResponse login(LoginRequest request) {

        // Hardcoded Admin Login
        if ("admin@gmail.com".equals(request.getEmail())
                && "admin123".equals(request.getPassword())) {

            return new LoginResponse(
                    "Login Successful",
                    "ADMIN",
                    null
            );
        }

        // Employee Login
        Employee employee =
                employeeRepository.findByEmail(
                        request.getEmail())
                        .orElse(null);

        if (employee != null
                && employee.getPassword() != null
                && employee.getPassword().equals(
                        request.getPassword())) {

            return new LoginResponse(
                    "Login Successful",
                    "EMPLOYEE",         
                    employee.getId()
            );
        }

        throw new RuntimeException(
                "Invalid Email or Password"
        );
    }

    // Generate OTP
    public String generateOtp(
            ForgotPasswordRequest request) {

        employeeRepository.findByEmail(
                request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee not found"
                        )
                );

        String otp = String.valueOf(
                100000 + new Random().nextInt(900000)
        );

        PasswordResetOtp passwordResetOtp =
                otpRepository.findByEmail(
                        request.getEmail())
                        .orElse(new PasswordResetOtp());

        passwordResetOtp.setEmail(
                request.getEmail());

        passwordResetOtp.setOtp(otp);

        otpRepository.save(passwordResetOtp);

        return "OTP Generated: " + otp;
    }

    // Verify OTP
    public String verifyOtp(
            VerifyOtpRequest request) {

        otpRepository.findByEmailAndOtp(
                request.getEmail(),
                request.getOtp())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid OTP"
                        )
                );

        return "OTP Verified Successfully";
    }

    // Reset Password
    public String resetPassword(
            ResetPasswordRequest request) {

        Employee employee =
                employeeRepository.findByEmail(
                        request.getEmail())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Employee not found"
                                )
                        );

        employee.setPassword(
                request.getNewPassword());

        employeeRepository.save(employee);

        return "Password Reset Successful";
    }

    public String changePassword(
        ChangePasswordRequest request) {

    Employee employee =
            employeeRepository.findByEmail(
                    request.getEmail())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Employee not found"
                            )
                    );

    if (!employee.getPassword().equals(
            request.getOldPassword())) {

        throw new RuntimeException(
                "Old password is incorrect"
        );
    }

    employee.setPassword(
            request.getNewPassword());

    employeeRepository.save(employee);

    return "Password Changed Successfully";
}
}