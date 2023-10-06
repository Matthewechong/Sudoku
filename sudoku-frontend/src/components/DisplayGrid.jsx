import React, {useState} from 'react';
import { useBoardContext, useButtonContext, useDifficultyContext } from '../contexts/CurrentGridContext'
import { SaveGame, LoadGame } from '../services/SudokuService';
import { GenerateSudoku } from '../services/SudokuGenerator';
import { Grid, Paper, Button } from '@mui/material';
import { SudokuStringToGrid } from '../utils/Util';



function DisplayGrid(){
    const buttonName = useButtonContext();
    const {difficulty, setDifficulty} = useDifficultyContext()
    const { board, changeBoard } = useBoardContext();
    const initialGrid = Array.from({length : 9}, () => Array(9).fill(0));
    const [grid, setGrid] = useState(initialGrid);

    const handleCellClick = (row, col) => {
        // Handle cell click logic here
      };

    function changeGrid(){
      GenerateSudoku()
        .then((response) =>{
          setGrid(response[0]);
          setDifficulty(response[1])
        })
        .catch(err => {
          // Handle errors
          console.error(err);
      });
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

      <div>
      <Button onClick={changeGrid} variant="contained">Generate Sudoku</Button>
      <Button onClick={() => SaveGame(grid, difficulty)} variant="contained">Save</Button>
      <Button onClick={() => loadBoard(LoadGame(1))} variant="contained">Load</Button>
      
      </div>

      
      </>
      );
    };

  export default DisplayGrid