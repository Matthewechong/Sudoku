import React, { useState } from "react";
import DisplayGrid from "./components/DisplayGrid";
import SudokuProvider  from "./contexts/CurrentGridContext";
import Form from "./components/Form"
import { Container, createTheme, Grid, Paper, Button, ThemeProvider, colors, CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./components/MenuBar";
import Stopwatch from "./components/StopWatch";
import DiffStat from "./components/DifficultyStatus";
import Tools from "./components/ToolPad";
const theme = createTheme({
  palette: {
    primary: {
      main: "#47CBD4",
    },
    secondary: {
      main: "#d45047",
    },
  },
});

// Style object for grid items and paper
const styles = {
  gridItem: { 
    marginTop: "0px",
    border : "none",
  },
  clock:{
    height: "50px",
    align:"right",
    padding:"10px"
  }
};

function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SudokuProvider>
        <ResponsiveAppBar />
        <main>
          <Grid container spacing={1} direction="column" >
            <Grid item >
              <Container maxWidth="sm" align="center">
                <Form />
              </Container>
            </Grid>
            <Grid item >
              <Container maxWidth="sm" align="center">
                <Stopwatch/>
              </Container>
            </Grid>
            <Grid item>
              <Container maxWidth="sm" sx={{height: "600px"}} align="center">
                <DisplayGrid/>
              </Container>
            </Grid>
            <Grid item>
              <Container maxWidth="sm" align="center">
                <Tools/>
              </Container>
            </Grid>
          </Grid>
        </main>
      </SudokuProvider>
    </ThemeProvider>
  );
}

export default App;
