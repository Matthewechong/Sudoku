import React, { useState } from "react";
import DisplayGrid from "./components/DisplayGrid";
import SudokuProvider  from "./contexts/CurrentGridContext";
import Form from "./components/Form"

function App(){
  return( 
      <>
        <SudokuProvider>

          <h1>Sudoku</h1>
          <DisplayGrid/>
          <Form/>
        </SudokuProvider>
      </>
    )
}

export default App;