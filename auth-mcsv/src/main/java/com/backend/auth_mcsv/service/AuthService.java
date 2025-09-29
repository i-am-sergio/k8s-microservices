package com.backend.auth_mcsv.service;

import org.springframework.stereotype.Service;

import com.backend.auth_mcsv.entity.User;
import com.backend.auth_mcsv.repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository repo;

    public AuthService(UserRepository repo) {
        this.repo = repo;
    }

    public User register(String email, String password) {
        User u = new User();
        u.setEmail(email);
        u.setPassword(password); // en prod usar hash
        return repo.save(u);
    }

    public boolean login(String email, String password) {
        return repo.findByEmail(email)
                .map(u -> u.getPassword().equals(password))
                .orElse(false);
    }
}
