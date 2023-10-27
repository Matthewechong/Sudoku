import React, { useState } from "react";
import DisplayGrid from "./components/DisplayGrid";
import SudokuProvider  from "./contexts/CurrentGridContext";
import Form from "./components/Form"
import { Container, createTheme, Grid, Paper, Button, ThemeProvider, colors, CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./components/MenuBar";
import Stopwatch from "./components/StopWatch";
import DiffStat from "./components/DifficultyStatus";
import Tools from "./components/ToolPad";
import NumberBar from "./components/NumberBar";
import videoBg from './assets/ConstBg.mp4'
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const theme = createTheme({
  palette: {
    primary: {
      main: "#06f1e6",
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
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/" element={<SudokuGame />}/>
        
      </Routes>
    </BrowserRouter>
    
  );
}

function SudokuGame(){
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SudokuProvider>
        <video className="video-background" src={videoBg} autoPlay loop muted> </video>
        <ResponsiveAppBar/>
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
              <Container maxWidth="sm" sx={{height: "575px"}} align="center">
                <DisplayGrid/>
              </Container>
            </Grid>
            <Grid item>
              <Container maxWidth="sm" align="center">
                <Tools/>
              </Container>
            </Grid>
            <Grid item>
              <Container maxWidth="sm" align="center">
                <NumberBar/>
              </Container>
            </Grid>
          </Grid>
        </main>
      </SudokuProvider>
    </ThemeProvider>)
}

export default App;
