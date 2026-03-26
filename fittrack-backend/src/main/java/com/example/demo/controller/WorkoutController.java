package com.example.demo.controller;

import com.example.demo.model.Workout;
import com.example.demo.service.WorkoutService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    // ✅ GET USER WORKOUTS
    @GetMapping
    public List<Workout> getWorkouts(@RequestHeader("Authorization") String header) {

        String token = extractToken(header);

        return workoutService.getUserWorkouts(token);
    }

    // ✅ ADD WORKOUT
    @PostMapping
    public Workout addWorkout(@RequestBody Workout workout,
                             @RequestHeader("Authorization") String header) {

        String token = extractToken(header);

        return workoutService.saveWorkout(workout, token);
    }

    // 🔥 COMMON TOKEN EXTRACTOR
    private String extractToken(String header) {
        if (header == null || !header.startsWith("Bearer ")) {
            throw new RuntimeException("Missing token");
        }

        return header.substring(7);
    }
}