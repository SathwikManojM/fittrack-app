package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "progress")
public class Progress {

    @Id
    private String id;

    private String userEmail; // 🔥 FIXED
    private double weight;
    private double bodyFat;
    private LocalDate date;

    public Progress() {}

    public String getId() { return id; }
    public String getUserEmail() { return userEmail; }
    public double getWeight() { return weight; }
    public double getBodyFat() { return bodyFat; }
    public LocalDate getDate() { return date; }

    public void setId(String id) { this.id = id; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public void setWeight(double weight) { this.weight = weight; }
    public void setBodyFat(double bodyFat) { this.bodyFat = bodyFat; }
    public void setDate(LocalDate date) { this.date = date; }
}