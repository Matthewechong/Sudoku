import React from 'react';
import Button from './Button';
import { useBoardContext, useButtonContext, useDifficultyContext } from '../contexts/CurrentGridContext'
import { SaveGame, LoadGame } from '../services/SudokuService';
import { GenerateSudoku } from '../services/SudokuGenerator';
function DisplayGrid(){
    const buttonName = useButtonContext();
    const difficulty = useDifficultyContext()
    const { board, changeBoard } = useBoardContext();
    return(
        <>
        <h1>{difficulty}</h1>
        <p>{board}</p>
        <button onClick={() => changeBoard(GenerateSudoku())}>
            {buttonName}
        </button>
        <button onClick={() => SaveGame(board,difficulty)}>
            Save
        </button>
        <button onClick={() => changeBoard(LoadGame(1))}>
            Load
        </button>

        </>
        
    );
  }

  export default DisplayGrid