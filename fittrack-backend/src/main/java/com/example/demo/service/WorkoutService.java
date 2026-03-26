package com.example.demo.service;

import com.example.demo.config.JwtUtil;
import com.example.demo.model.Workout;
import com.example.demo.repository.WorkoutRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {

    private final WorkoutRepository repo;
    private final JwtUtil jwtUtil;

    public WorkoutService(WorkoutRepository repo, JwtUtil jwtUtil) {
        this.repo = repo;
        this.jwtUtil = jwtUtil;
    }

    // 🔥 GET USER WORKOUTS
    public List<Workout> getUserWorkouts(String token) {
        String email = jwtUtil.extractEmail(token);
        return repo.findByUserEmail(email);
    }

    // 🔥 SAVE WORKOUT WITH USER
    public Workout saveWorkout(Workout workout, String token) {
        String email = jwtUtil.extractEmail(token);
        workout.setUserEmail(email);
        return repo.save(workout);
    }
}