package com.example.demo.controller;

import com.example.demo.service.AIService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/workouts")
    public String getWorkouts(
            @RequestParam String goal,
            @RequestParam String level,
            @RequestParam int days
    ) {
        return aiService.getWorkoutPlan(goal, level, days);
    }

    @GetMapping("/meals")
    public Map<String, Object> getMeals(
            @RequestParam String goal,
            @RequestParam String diet,
            @RequestParam int weight
    ) {
        return aiService.getMealPlan(goal, diet, weight);
    }

    @GetMapping("/weekly-meals")
    public Map<String, Object> getWeeklyMeals(
            @RequestParam String goal,
            @RequestParam String diet,
            @RequestParam int weight
    ) {
        return aiService.getWeeklyMeals(goal, diet, weight);
    }
}