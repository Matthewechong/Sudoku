package com.app.sudokubackend.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.sudokubackend.database.SudokuRepository;
import com.app.sudokubackend.models.SudokuEntity;

@Service
public class GameService {

    @Autowired
    public SudokuRepository sudokuRepository;

    public GameService(SudokuRepository sudokuRepository) {
        this.sudokuRepository = sudokuRepository;
    }

    public void saveGame(Map<String, Object> gameMap) {
        String gamestate = (String) gameMap.get("gamestate");
        String difficulty = (String) gameMap.get("difficulty");
        SudokuEntity gameEntity = new SudokuEntity(gamestate, difficulty);
        sudokuRepository.save(gameEntity);
    }
}
