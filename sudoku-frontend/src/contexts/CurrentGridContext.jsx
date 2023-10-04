import React, { createContext, useContext, useState } from 'react';

const ButtonContext = React.createContext();
const DifficultyContext = React.createContext();
const BoardContext = React.createContext();

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

export default function SudokuProvider({children}){

    // Default values in useState parameter
    const [buttonName, setbuttonName] = useState("Generate Sudoku");
    const [difficulty, setDifficulty] = useState("Easy");
    const [board, setBoard] = useState("Welcome");

    function changeBoard(board){
        console.log("Board is: ")
        console.log(board)
        board.then(result =>{
            console.log(result[0]);
            console.log(result[1]);
            setBoard(result[0]);
            setDifficulty(result[1]);
        });
    }

    return(
        <BoardContext.Provider value={{ board, changeBoard, setBoard }}>
            <DifficultyContext.Provider value={difficulty}>
                <ButtonContext.Provider value={buttonName}>
                    {children}
                </ButtonContext.Provider>
            </DifficultyContext.Provider>
        </BoardContext.Provider>
    )
}