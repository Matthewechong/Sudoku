package com.app.sudokubackend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class SudokuController {

    @PostMapping("/save")
    @CrossOrigin(origins = "http://localhost:5173")
    ResponseEntity<String> saveGame(@RequestBody Map<String, Object> gameState) {
        try {
            System.out.println(gameState);
            return ResponseEntity.ok("Game State Saved");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

}
