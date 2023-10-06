import React, { useRef }from 'react';
import Box from '@mui/material/Box';
import { Grid, Paper, Button, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useBoardContext, useButtonContext, useDifficultyContext, useGridContext } from '../contexts/CurrentGridContext'
import { SaveGame, LoadGame } from '../services/SudokuService';
import { SudokuStringToGrid } from '../utils/Util';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicStack() {
    const {grid, setGrid, changeGrid} = useGridContext();
    const {difficulty, setDifficulty} = useDifficultyContext()
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
        <Box sx={{ width: '25%' }}>
        <Stack spacing={2}>
            <Item>
                <TextField
            required
            id="outlined-required"
            label="Required"
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
        </Stack>
        </Box>
    );
}