package com.backend.auth_mcsv.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.auth_mcsv.entity.User;
import com.backend.auth_mcsv.service.AuthService;

@RestController
@RequestMapping("/")
public class AuthController {
    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User req) {
        return ResponseEntity.ok(service.register(req.getEmail(), req.getPassword()));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User req) {
        boolean ok = service.login(req.getEmail(), req.getPassword());
        return ok ? ResponseEntity.ok("Login success")
                  : ResponseEntity.status(401).body("Invalid credentials");
    }
}