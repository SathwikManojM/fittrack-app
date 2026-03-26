package com.example.demo.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AIService {

    private final Random random = new Random();

    /* 🏋️ WORKOUT (UNCHANGED STYLE) */
    public String getWorkoutPlan(String goal, String level, int days) {

        StringBuilder plan = new StringBuilder();

        plan.append("🔥 ").append(days).append("-Day ")
                .append(goal.toUpperCase())
                .append(" Plan (").append(level).append(")\n\n");

        for (int i = 1; i <= days; i++) {
            plan.append("Day ").append(i).append(":\n");
            plan.append("- Bench Press 4x8\n");
            plan.append("- Pull Ups 3x10\n");
            plan.append("- Squats 4x8\n\n");
        }

        return plan.toString();
    }

    /* 🍗 SMART MEALS */
    public Map<String, Object> getMealPlan(String goal, String diet, int weight) {

        int baseCalories = weight * 30;

        if (goal.equals("fatloss")) baseCalories -= 400;
        if (goal.equals("muscle")) baseCalories += 300;

        List<Map<String, Object>> meals = new ArrayList<>();

        String[] veg = {"Paneer", "Tofu", "Dal", "Chickpeas"};
        String[] nonveg = {"Chicken", "Eggs", "Fish"};

        int totalCalories = 0;
        int totalProtein = 0;

        for (int i = 0; i < 5; i++) {

            int calories = baseCalories / 5 + random.nextInt(100);
            int protein = 15 + random.nextInt(15);

            String food = diet.equals("veg")
                    ? veg[random.nextInt(veg.length)]
                    : nonveg[random.nextInt(nonveg.length)];

            meals.add(Map.of(
                    "name", food + " Meal",
                    "calories", calories,
                    "protein", protein
            ));

            totalCalories += calories;
            totalProtein += protein;
        }

        return Map.of(
                "meals", meals,
                "totalCalories", totalCalories,
                "totalProtein", totalProtein,
                "targetCalories", baseCalories
        );
    }

    /* 📅 WEEKLY PLAN */
    public Map<String, Object> getWeeklyMeals(String goal, String diet, int weight) {

        Map<String, Object> week = new LinkedHashMap<>();

        String[] days = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};

        for (String day : days) {
            week.put(day, getMealPlan(goal, diet, weight));
        }

        return week;
    }
}