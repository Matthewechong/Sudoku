import React, {useState} from 'react';
import { useBoardContext, useButtonContext, useDifficultyContext, useGridContext } from '../contexts/CurrentGridContext'
import { GenerateSudoku } from '../services/SudokuGenerator';
import { Grid, Paper, Button, TextField, Container } from '@mui/material';
import { SudokuStringToGrid } from '../utils/Util';


function DisplayGrid(){
    const buttonName = useButtonContext();
    const {difficulty, setDifficulty} = useDifficultyContext()
    const {grid, setGrid, changeGrid} = useGridContext();
    const [selectedCell, setSelectedCell] = useState({ row: null, col: null });

    const handleCellClick = (row, col) => {
        setSelectedCell({ row, col });
      };

    const handleInputChange = (event) => {
      const newValue = event.target.value;
      if (selectedCell.row !== null && selectedCell.col !== null) {
        // Update the grid with the new value
        const newGrid = [...grid];
        newGrid[selectedCell.row][selectedCell.col] = newValue;
        setGrid(newGrid);
    }
    }

    function loadBoard(board){
      board.then((response) =>{
        console.log("Retrieved Board")
        setGrid(SudokuStringToGrid(response[0]));
        setDifficulty(response[1])
      }
      )
    }

    return (
        <Grid container spacing={0} className="sudoku-grid">
          {grid.map((row, rowIndex) => (
            <Grid container item key={rowIndex}>
              {row.map((cell, colIndex) => (
                <Grid item key={colIndex}>
                  <Paper
                    elevation={10}
                    className="sudoku-cell"
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {selectedCell.row === rowIndex && selectedCell.col === colIndex ? 
                    (<TextField 
                      className='input-cell'
                      type="number"
                      value={cell}
                      onChange={handleInputChange}
                      autoFocus
                    />
                    ) : 
                    (
                      cell
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid> 
      );
    };

  export default DisplayGrid