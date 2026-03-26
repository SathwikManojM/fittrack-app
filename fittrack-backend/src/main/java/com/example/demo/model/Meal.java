package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "meals")
public class Meal {

    @Id
    private String id;

    private String name;
    private int calories;

    private String userEmail; // ✅ consistent

    public Meal() {}

    public Meal(String name, int calories, String userEmail) {
        this.name = name;
        this.calories = calories;
        this.userEmail = userEmail;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public int getCalories() { return calories; }
    public String getUserEmail() { return userEmail; }

    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setCalories(int calories) { this.calories = calories; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
}