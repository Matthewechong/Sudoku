import React from 'react';
import Button from './Button';
import { useBoardContext, useButtonContext, useDifficultyContext } from '../contexts/CurrentGridContext'
import { SaveGame, LoadGame } from '../services/SudokuService';
function DisplayGrid(){
    const buttonName = useButtonContext();
    const difficulty = useDifficultyContext()
    const { board, changeBoard } = useBoardContext();
    return(
        <>
        <h1>{difficulty}</h1>
        <p>{board}</p>
        <button onClick={changeBoard}>
            {buttonName}
        </button>
        <button onClick={() => SaveGame(board,difficulty)}>
            Save
        </button>
        {/* <button onClick={LoadGame}>
            Load
        </button> */}

        </>
        
    );
  }

  export default DisplayGrid