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

    const handleInputChange = (event, row, col) => {
      const newValue = event.target.value;
      if (row !== null && col !== null) {
        // Update the grid with the new value
        const newGrid = [...grid];
        newGrid[row][col] = newValue;
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
              <Grid item key={colIndex} style={{ textAlign: "center" }}>
                <Paper
                  elevation={0}
                  className={`sudoku-cell 
                  ${rowIndex % 3 === 2 && "sudoku-cell-bottom-border"
                  } 
                  ${colIndex % 3 === 2 && "sudoku-cell-right-border"}`
                }
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  <TextField 
                  value={cell}
                  size='large'
                  variant="outlined"
                  onChange={(e) => handleInputChange( e, rowIndex, colIndex)}/>
                  
                </Paper>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    );
                }

  export default DisplayGrid