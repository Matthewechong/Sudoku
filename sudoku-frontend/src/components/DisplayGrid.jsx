import React, {useState} from 'react';
import { useBoardContext, useButtonContext, useDifficultyContext, useGridContext, useGridSolutionContext, useMistakesCountContext } from '../contexts/CurrentGridContext'
import { Grid, Paper, Button, TextField, Container } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

function DisplayGrid(){
    const buttonName = useButtonContext();
    const {difficulty, setDifficulty} = useDifficultyContext()
    const {grid, setGrid, changeGrid} = useGridContext();
    const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
    const {gridSol, setGridSol} = useGridSolutionContext();
    const [open, setOpen] = React.useState(false);
    const { mistakes, setMistakes} = useMistakesCountContext();

    const handleCellClick = (row, col) => {
        setSelectedCell({ row, col });
      };

    const handleInputChange = (event, row, col) => {
        const newValue = parseInt(event.target.value, 10);
        console.log("Current Grid is: ")
        console.log(grid)
        if((newValue >= 0 && newValue <= 9) ){
            const newGrid = [...grid];
            console.log(isInputValid(newValue,row,col))
            if(isInputValid(newValue,row,col)){
            newGrid[row][col] = newValue;
            console.log("New Grid")
            console.log(newGrid)
            setGrid(newGrid);
            }
            else{
              handleClickOpen()
            }
          
        }
        
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    function isInputValid(newValue,row, col){
      let isValid = parseInt(gridSol[row][col],10) === newValue
      if(isValid){
        console.log("Correct")
      }
      else{
        console.log("Incorrect")
        setMistakes(mistakes + 1);
        return
      }
      return isValid
      
    }

   

    return (
      <>
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
                  value={cell === 0 ? "" : cell}
                  className={`input-cell ${cell != 0 ? 'sudoku-cell-valid-num' : ""}`}
                  onChange={(e) => handleInputChange( e, rowIndex, colIndex)}
                   />
                  
                </Paper>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" align='center'>
            Incorrect
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
    );
    }

  export default DisplayGrid