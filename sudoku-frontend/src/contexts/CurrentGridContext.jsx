import React, { createContext, useContext, useState } from 'react';
import { GenerateSudoku } from '../services/SudokuGenerator';

const ButtonContext = React.createContext();
const DifficultyContext = React.createContext();
const BoardContext = React.createContext();
const GridContext = React.createContext();

// Call these hooks to access information from other components
export function useButtonContext(){
    return useContext(ButtonContext);
}

export function useDifficultyContext(){
    return useContext(DifficultyContext);
}

export function useBoardContext(){
    return useContext(BoardContext);
}

export function useGridContext(){
    return useContext(GridContext)
}

export default function SudokuProvider({children}){

    const [buttonName, setbuttonName] = useState("Generate Sudoku");
    const [difficulty, setDifficulty] = useState("Easy");
    const [board, setBoard] = useState("Welcome");
    const initialGrid = Array.from({length : 9}, () => Array(9).fill(0));
    const [grid, setGrid] = useState(initialGrid);
    
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
    return(
        <GridContext.Provider value={{ grid, setGrid, changeGrid }} >
        <BoardContext.Provider value={{ board, setBoard }}>
            <DifficultyContext.Provider value={{difficulty,setDifficulty}}>
                <ButtonContext.Provider value={buttonName}>
                    {children}
                </ButtonContext.Provider>
            </DifficultyContext.Provider>
        </BoardContext.Provider>
        </GridContext.Provider>
    )
}