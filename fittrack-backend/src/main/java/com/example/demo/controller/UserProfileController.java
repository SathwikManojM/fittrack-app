package com.example.demo.controller;

import com.example.demo.config.JwtUtil;
import com.example.demo.model.UserProfile;
import com.example.demo.repository.UserProfileRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/api/profile", "/api/profiles"})
@CrossOrigin
public class UserProfileController {

    private final UserProfileRepository repo;
    private final JwtUtil jwtUtil;

    public UserProfileController(UserProfileRepository repo, JwtUtil jwtUtil) {
        this.repo = repo;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public UserProfile getProfile(@RequestHeader("Authorization") String header) {
        String email = jwtUtil.extractEmail(header.substring(7));
        return repo.findByEmail(email).orElse(null);
    }

    @PostMapping
    public UserProfile save(@RequestBody UserProfile profile,
                            @RequestHeader("Authorization") String header) {
        String email = jwtUtil.extractEmail(header.substring(7));
        profile.setEmail(email);
        return repo.save(profile);
    }
}
