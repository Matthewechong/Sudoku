import React, {useState} from 'react';
import { useBoardContext, useButtonContext, useDifficultyContext, useGridContext } from '../contexts/CurrentGridContext'
import { GenerateSudoku } from '../services/SudokuGenerator';
import { Grid, Paper, Button, TextField } from '@mui/material';
import { SudokuStringToGrid } from '../utils/Util';


function DisplayGrid(){
    const buttonName = useButtonContext();
    const {difficulty, setDifficulty} = useDifficultyContext()
    const {grid, setGrid, changeGrid} = useGridContext();
    const [selectedCell, setSelectedCell] = useState({ row: null, col: null });

    const handleCellClick = (row, col) => {
        setSelectedCell({ row, col });
      };

    // const handleInputChange = (event) => {
    //   const newValue = event.target.value;
    //   if (selectedCell.row !== null && selectedCell.col !== null) {
    //     // Update the grid with the new value
    //     const newGrid = [...grid];
    //     newGrid[selectedCell.row][selectedCell.col] = newValue;
    //     setGrid(newGrid);
    // }
    // }

    function loadBoard(board){
      board.then((response) =>{
        console.log("Retrieved Board")
        setGrid(SudokuStringToGrid(response[0]));
        setDifficulty(response[1])
      }
      )
    }

    return (
      <>
      <div className='center-container'>
      <h1>{difficulty}</h1>
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
                    {cell}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </div>     
      </>
      );
    };

  export default DisplayGrid