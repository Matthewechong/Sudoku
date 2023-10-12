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
        const newValue = parseInt(event.target.value, 10);
        if(newValue >= 0 && newValue <= 9){
          const newGrid = [...grid];
          newGrid[row][col] = newValue;
          console.log(newGrid)
          setGrid(newGrid);
        }
        
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
                  <input
                  value={cell}
                  className={`input-cell ${cell ? 'sudoku-cell-valid-num' : 'sudoku-cell-invalid-num'}`}
                  onChange={(e) => handleInputChange( e, rowIndex, colIndex)}
                   />
                  
                </Paper>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    );
                }

  export default DisplayGrid