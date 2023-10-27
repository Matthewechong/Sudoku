import React, { createContext, useContext, useState, useEffect } from 'react';
import { GenerateSudoku } from '../services/SudokuGenerator';
import { solveSudoku, printBoard } from '../utils/Util';
import { GetUser } from '../services/ProfileService';

const ButtonContext = React.createContext();
const DifficultyContext = React.createContext();
const BoardContext = React.createContext();
const GridContext = React.createContext();
const GridSolutionContext = React.createContext();
const GridNumberContext = React.createContext();
const MistakesCountContext = React.createContext();
const ProfileContext = React.createContext();
// Call these hooks to access information from other components
export function useProfileContext(){
    return useContext(ProfileContext);
}

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

export function useGridSolutionContext(){
    return useContext(GridSolutionContext)
}

export function useGridNumberContext(){
    return useContext(GridNumberContext)
}

export function useMistakesCountContext(){
    return useContext(MistakesCountContext)
}

export default function SudokuProvider({children}){

    const [buttonName, setbuttonName] = useState("Generate Sudoku");
    const [difficulty, setDifficulty] = useState("Easy");
    const [board, setBoard] = useState("Welcome");
    const initialGrid = Array.from({length : 9}, () => Array(9).fill(0));
    const [grid, setGrid] = useState(initialGrid);
    const [gridSol, setGridSol] = useState('');
    const [numUsage, setNumUsage] = useState({
        '1': 9,
        '2': 9,
        '3': 9,
        '4': 9,
        '5': 9,
        '6': 9,
        '7': 9,
        '8': 9,
        '9': 9,
    });
    const [mistakes, setMistakes] = useState(0);
    const [profile, setProfile] = useState("None");

    useEffect(() => {
        console.log("Grid Solution has changed: ", gridSol);
    }, [gridSol]);


    function changeGrid(){
        GenerateSudoku()
          .then((response) =>{
            setGrid(response[0]);
            setDifficulty(response[1])
            const solution = response[0].map((row) => [...row]);
            solveSudoku(solution)
            setGridSol(solution)
          })
          .catch(err => {
            console.error(err);
        });
      }
    return(
        <ProfileContext.Provider value={{ profile, setProfile}}>
        <MistakesCountContext.Provider value={{ mistakes, setMistakes }}>
        <GridNumberContext.Provider value={{numUsage, setNumUsage}}>
        <GridSolutionContext.Provider value={{ gridSol, setGridSol }}>
        <GridContext.Provider value={{ grid, setGrid, changeGrid }} >
        <BoardContext.Provider value={{ board, setBoard }}>
            <DifficultyContext.Provider value={{difficulty,setDifficulty}}>
                <ButtonContext.Provider value={buttonName}>
                    {children}
                </ButtonContext.Provider>
            </DifficultyContext.Provider>
        </BoardContext.Provider>
        </GridContext.Provider>
        </GridSolutionContext.Provider>
        </GridNumberContext.Provider>
        </MistakesCountContext.Provider>
        </ProfileContext.Provider>
    )
}