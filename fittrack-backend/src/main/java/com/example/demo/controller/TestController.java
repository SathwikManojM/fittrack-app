package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    // public endpoint
    @GetMapping("/")
    public String home() {
        return "FitTrack Backend Running 🚀";
    }

    // 🔐 protected endpoint
    @GetMapping("/secure")
    public String secure() {
        return "You are authenticated 🔐";
    }
}