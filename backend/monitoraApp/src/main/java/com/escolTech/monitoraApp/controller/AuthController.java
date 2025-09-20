package com.escolTech.monitoraApp.controller;

// IMPORTS ADICIONADOS
import com.escolTech.monitoraApp.dto.AuthRequest;
import com.escolTech.monitoraApp.dto.AuthResponse;
import com.escolTech.monitoraApp.security.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtService jwtService;

    // As definições dos records foram removidas daqui

    @PostMapping("/token")
    public AuthResponse authenticate(@RequestBody AuthRequest request) {
        if ("device-001".equals(request.deviceId()) && "secret-123".equals(request.secretKey())) {
            String token = jwtService.generateToken(request.deviceId());
            return new AuthResponse(token);
        } else {
            throw new RuntimeException("Credenciais inválidas");
        }
    }
}