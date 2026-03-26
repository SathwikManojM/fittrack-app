package com.example.demo.repository;

import com.example.demo.model.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WorkoutRepository extends MongoRepository<Workout, String> {

    List<Workout> findByUserEmail(String userEmail); // 🔥 ADD THIS
}