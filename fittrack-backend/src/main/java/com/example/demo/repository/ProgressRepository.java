package com.example.demo.repository;

import com.example.demo.model.Progress;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProgressRepository extends MongoRepository<Progress, String> {

    List<Progress> findByUserEmail(String userEmail); // 🔥 ADD THIS
}