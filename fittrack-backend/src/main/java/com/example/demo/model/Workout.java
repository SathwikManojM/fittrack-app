package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "workouts")
public class Workout {

    @Id
    private String id;

    private String name;
    private String userEmail; // 🔥 ADD THIS

    public Workout() {}

    public Workout(String name, String userEmail) {
        this.name = name;
        this.userEmail = userEmail;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getUserEmail() { return userEmail; }

    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
}