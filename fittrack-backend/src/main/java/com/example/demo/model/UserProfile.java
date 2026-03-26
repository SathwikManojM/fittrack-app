package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "profiles")
public class UserProfile {

    @Id
    private String id;

    private String email;
    private double weight;
    private double height;
    private int age;
    private String goal;

    public String getId() { return id; }
    public String getEmail() { return email; }
    public double getWeight() { return weight; }
    public double getHeight() { return height; }
    public int getAge() { return age; }
    public String getGoal() { return goal; }

    public void setId(String id) { this.id = id; }
    public void setEmail(String email) { this.email = email; }
    public void setWeight(double weight) { this.weight = weight; }
    public void setHeight(double height) { this.height = height; }
    public void setAge(int age) { this.age = age; }
    public void setGoal(String goal) { this.goal = goal; }
}