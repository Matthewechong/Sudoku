package com.app.sudokubackend.services;

import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import com.app.sudokubackend.database.SudokuRepository;
import com.app.sudokubackend.models.SudokuEntity;

import jakarta.persistence.EntityNotFoundException;

@Service
public class GameService {

    private static final Logger logger = LoggerFactory.getLogger(GameService.class);

    @Autowired
    public SudokuRepository sudokuRepository;

    public GameService(SudokuRepository sudokuRepository) {
        this.sudokuRepository = sudokuRepository;
    }

    public void saveGame(Map<String, Object> gameMap) {
        long id = Integer.valueOf((String) gameMap.get("id"));
        String gamestate = (String) gameMap.get("gamestate");
        String difficulty = (String) gameMap.get("difficulty");
        String username = (String) gameMap.get("username");
        SudokuEntity gameEntity = new SudokuEntity(id, gamestate, difficulty, username);
        sudokuRepository.save(gameEntity);
    }

    public SudokuEntity loadGame(Long id) {
        Optional<SudokuEntity> currentEntity = sudokuRepository.findById(id);
        if (currentEntity.isPresent()) {
            logger.info(currentEntity.get().getGamestate());
            logger.info(currentEntity.get().getDifficulty());
            return currentEntity.get();
        } else {
            throw new EntityNotFoundException("Entity with ID " + id + " not found");
        }
    }

}
