package com.example.demo.repository;

import com.example.demo.model.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MealRepository extends MongoRepository<Meal, String> {

    List<Meal> findByUserEmail(String userEmail); // ✅ correct
}