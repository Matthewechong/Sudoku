import React, { useState } from "react";
import DisplayGrid from "./components/DisplayGrid";
import SudokuProvider  from "./contexts/CurrentGridContext";
import { LoadGame, SaveGame } from "./services/SudokuService";


function App(){
  return( 
      <>
        <SudokuProvider>
          <DisplayGrid/>
        </SudokuProvider>
      </>
    )
}

export default App;