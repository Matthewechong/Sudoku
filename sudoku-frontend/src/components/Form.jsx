import React, { useRef }from 'react';
import Box from '@mui/material/Box';
import { Grid, Paper, Button, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {  useGridSolutionContext, useDifficultyContext, useGridContext } from '../contexts/CurrentGridContext'
import { SaveGame, LoadGame } from '../services/SudokuService';
import { SudokuStringToGrid, solveSudoku, printBoard } from '../utils/Util';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: "200px",
  boxShadow: theme.shadows[0]
}));

const styles = {
    toolbar_box: {
        width: "500px", 
        padding: "50px", 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "center"
    },
    toolbar:{
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "center"
    }
    
}

export default function BasicStack() {
    const {grid, setGrid, changeGrid} = useGridContext();
    const {difficulty, setDifficulty} = useDifficultyContext();
    const { gridSol } = useGridSolutionContext();
    const idRef = useRef("");

    function loadBoard(){
        const idValue = idRef.current.value;
        if(idValue != ""){
            var board = LoadGame(idValue);
            board.then((response) =>{
            console.log("Retrieved Board")
            setGrid(SudokuStringToGrid(response[0]));
            setDifficulty(response[1])
        }
        )
        }
        else{
            console.log("No Id in text field")
        }
    }

    function saveBoard(){
        const idValue = idRef.current.value;
        SaveGame(grid, difficulty, "Matthew", idValue);
    }

    function solveBoard(){
        setGrid(gridSol);
    }

    return (
        <Box className="form" style={styles.toolbar_box}  >
        <Stack spacing={0} style={styles.toolbar}>
            <Item>
                <TextField
            required
            id="outlined-required"
            label="ID Required"
            inputRef={idRef}
            />
            </Item>
            <Item>
                <Button onClick={() => saveBoard()} variant="contained">Save</Button>
            </Item>
            <Item>
                <Button onClick={() => loadBoard()} variant="contained">Load</Button>
            </Item>
            <Item>
                <Button onClick={changeGrid} variant="contained">Generate Sudoku</Button>
            </Item>
            <Item>
                <Button onClick={() => solveBoard()} variant="contained">Solve</Button>
            </Item>
        </Stack>
        </Box>
    );
}