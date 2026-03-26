package com.example.demo.controller;

import com.example.demo.config.JwtUtil;
import com.example.demo.model.Progress;
import com.example.demo.repository.ProgressRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin
public class ProgressController {

    private final ProgressRepository repo;
    private final JwtUtil jwtUtil;

    public ProgressController(ProgressRepository repo, JwtUtil jwtUtil) {
        this.repo = repo;
        this.jwtUtil = jwtUtil;
    }

    // ✅ GET ONLY USER PROGRESS
    @GetMapping
    public List<Progress> getProgress(@RequestHeader("Authorization") String header) {

        String email = extractEmail(header);

        return repo.findByUserEmail(email);
    }

    // ✅ ADD PROGRESS ENTRY
    @PostMapping
    public Progress add(@RequestBody Progress p,
                        @RequestHeader("Authorization") String header) {

        String email = extractEmail(header);

        p.setUserEmail(email);

        // 🔥 auto set date if not provided
        if (p.getDate() == null) {
            p.setDate(LocalDate.now());
        }

        return repo.save(p);
    }

    // 🔥 COMMON METHOD
    private String extractEmail(String header) {
        if (header == null || !header.startsWith("Bearer ")) {
            throw new RuntimeException("Missing token");
        }

        String token = header.substring(7);
        return jwtUtil.extractEmail(token);
    }
}