import React, { useState } from "react";
import DisplayGrid from "./components/DisplayGrid";
import SudokuProvider  from "./contexts/CurrentGridContext";
import { Button } from "@mui/material";

function App(){
  return( 
      <>
        <SudokuProvider>

          <h1>Sudoku</h1>
          <DisplayGrid/>
        </SudokuProvider>
      </>
    )
}

export default App;