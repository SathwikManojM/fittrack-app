package com.example.demo.controller;

import com.example.demo.config.JwtUtil;
import com.example.demo.model.Meal;
import com.example.demo.repository.MealRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meals")
@CrossOrigin
public class MealController {

    private final MealRepository repo;
    private final JwtUtil jwtUtil;

    public MealController(MealRepository repo, JwtUtil jwtUtil) {
        this.repo = repo;
        this.jwtUtil = jwtUtil;
    }

    // ✅ GET USER MEALS
    @GetMapping
    public List<Meal> getMeals(@RequestHeader("Authorization") String header) {

        String email = extractEmail(header);

        return repo.findByUserEmail(email);
    }

    // ✅ ADD MEAL
    @PostMapping
    public Meal addMeal(@RequestBody Meal meal,
                        @RequestHeader("Authorization") String header) {

        String email = extractEmail(header);

        meal.setUserEmail(email);

        return repo.save(meal);
    }

    // 🔥 COMMON METHOD (CLEAN CODE)
    private String extractEmail(String header) {
        if (header == null || !header.startsWith("Bearer ")) {
            throw new RuntimeException("Missing token");
        }

        String token = header.substring(7);
        return jwtUtil.extractEmail(token);
    }
}