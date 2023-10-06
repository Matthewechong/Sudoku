package com.app.sudokubackend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.app.sudokubackend.models.SudokuEntity;
import com.app.sudokubackend.services.GameService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class SudokuController {

    @Autowired
    GameService gameService;

    @PostMapping("/api/save")
    ResponseEntity<String> saveGame(@RequestBody Map<String, Object> gameState) {
        try {
            System.out.println(gameState.toString());
            gameService.saveGame(gameState);
            return ResponseEntity.ok("Game State Saved");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

    @GetMapping("/api/load/{id}")
    ResponseEntity<Object> loadGame(@PathVariable Long id) {
        try {
            SudokuEntity sudokuEntity = gameService.loadGame(id);
            return ResponseEntity.ok(sudokuEntity);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

}
