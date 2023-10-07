import React, { useState } from "react";
import DisplayGrid from "./components/DisplayGrid";
import SudokuProvider  from "./contexts/CurrentGridContext";
import Form from "./components/Form"
import { Container, CssBaseline, Typography } from "@mui/material";

function App(){
  return( 
      <>
  <SudokuProvider>
    <CssBaseline/>
    <Typography variant="h1" align="center" color="textPrimary" gutterBottom>Sudoku</Typography>
    <main>
      <div>
      <Container maxWidth="sm" align="center">
        <DisplayGrid />
        <div style={{ marginTop: "60px" }}>
          <Form/>
        </div>
        
      </Container>
      
      </div>
    </main>
  </SudokuProvider>
      </>
    )
}

export default App;