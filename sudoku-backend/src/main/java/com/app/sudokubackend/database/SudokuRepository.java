package com.app.sudokubackend.database;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.sudokubackend.models.SudokuEntity;

public interface SudokuRepository extends JpaRepository<SudokuEntity, Long> {

}
