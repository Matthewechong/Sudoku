package com.app.sudokubackend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sudoku_games")
public class SudokuEntity {

    @Id
    private long id;

    @Column(columnDefinition = "TEXT")
    private String gamestate;

    @Column(columnDefinition = "TEXT")
    private String difficulty;

    @Column(columnDefinition = "TEXT")
    private String username;

    public SudokuEntity() {

    }

    public SudokuEntity(long id, String gamestate, String difficulty, String username) {
        this.id = id;
        this.gamestate = gamestate;
        this.difficulty = difficulty;
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGamestate() {
        return gamestate;
    }

    public void setGamestate(String gamestate) {
        this.gamestate = gamestate;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
