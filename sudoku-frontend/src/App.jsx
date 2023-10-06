import React, { useState } from "react";
import DisplayGrid from "./components/DisplayGrid";
import SudokuProvider  from "./contexts/CurrentGridContext";
import Form from "./components/Form"
import { Container } from "@mui/material";

function App(){
  return( 
      <>
        <SudokuProvider>
            <Container fixed className="center-container">
              <h1>Sudoku</h1>
              <DisplayGrid/>
              <Form/>
            </Container>
            
          
        </SudokuProvider>
      </>
    )
}

export default App;