package com.example.leavemanagement.controller;

import com.example.leavemanagement.dto.ForgotPasswordRequest;
import com.example.leavemanagement.dto.LoginRequest;
import com.example.leavemanagement.dto.LoginResponse;
import com.example.leavemanagement.dto.ResetPasswordRequest;
import com.example.leavemanagement.dto.VerifyOtpRequest;
import com.example.leavemanagement.service.AuthService;
import org.springframework.web.bind.annotation.*;
import com.example.leavemanagement.dto.ChangePasswordRequest;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Login API
    @PostMapping("/login") 
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        return authService.login(request);
    }

    // Generate OTP
    @PostMapping("/generate-otp")
    public String generateOtp(
            @RequestBody ForgotPasswordRequest request) {

        return authService.generateOtp(request);
    }

    // Verify OTP
    @PostMapping("/verify-otp")
    public String verifyOtp(
            @RequestBody VerifyOtpRequest request) {

        return authService.verifyOtp(request);
    }

    // Reset Password
    @PostMapping("/reset-password")
    public String resetPassword(
            @RequestBody ResetPasswordRequest request) {

        return authService.resetPassword(request);
    }

    @PostMapping("/change-password")
    public String changePassword(
        @RequestBody ChangePasswordRequest request) {

    return authService.changePassword(request);
}
}