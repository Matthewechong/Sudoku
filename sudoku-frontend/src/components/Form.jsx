import React, { useRef }from 'react';
import Box from '@mui/material/Box';
import { Grid, Paper, Button, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {  useGridSolutionContext, useDifficultyContext, useGridContext } from '../contexts/CurrentGridContext'
import { SaveGame, LoadGame } from '../services/SudokuService';
import { SudokuStringToGrid, solveSudoku, printBoard } from '../utils/Util';
import SaveIcon from '@mui/icons-material/Save';
import CachedIcon from '@mui/icons-material/Cached';
import SendIcon from '@mui/icons-material/Send';

const styles = {
    toolbar_box: {
        padding: "10px", 
        height: "100px"
    },
    toolbar:{
        display: "flex", 
    }
    
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(26, 32, 39, 0)' : 'rgba(255, 255, 255, 0)',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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

    

    return (
        <Box style={styles.toolbar_box}  >
        <Stack spacing={0} style={{...styles.toolbar, border: 'none'}}>
            <TextField
            required
            id="outlined-required"
            label="ID Required"
            inputRef={idRef}
            // sx={{ height: '10px'}}
            />
            <Item elevation={0}>
                <Stack spacing={0} style={{flexDirection : "row"}}>
                    <Item elevation={0}>
                        <SaveIcon sx={{color : "#06f1e6"}} onClick={() => saveBoard()} variant="contained">Save</SaveIcon>
                    </Item>
                    <Item elevation={0}>
                        <SendIcon sx={{color : "#06f1e6"}} onClick={() => loadBoard()} variant="contained">Load</SendIcon>
                    </Item>
                    <Item elevation={0}>
                        <CachedIcon sx={{color : "#06f1e6"}} onClick={changeGrid} variant="contained">Generate Sudoku</CachedIcon>
                    </Item>
                    
                </Stack>
            </Item>

        </Stack>
        </Box>
    );
}