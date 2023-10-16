import React, { useState } from "react";
import DisplayGrid from "./components/DisplayGrid";
import SudokuProvider  from "./contexts/CurrentGridContext";
import Form from "./components/Form"
import { Container, createTheme, Grid, Paper, Button, ThemeProvider, colors, CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./components/MenuBar";
import Stopwatch from "./components/StopWatch";

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
    marginTop: "0px" 
  },
  paper: {
    height: "550px"
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
          <Grid spacing={0}>
            <Grid>
              <Container maxWidth="sm" align="center">
                <Stopwatch></Stopwatch>
              </Container>
            </Grid>
            <Grid>
              <Paper elevation={0} style={styles.paper}>
                <Container maxWidth="sm" align="center">
                  <DisplayGrid/>
                </Container>
              </Paper>
            </Grid>
            <Grid >
              <Paper>
              <Container maxWidth="sm" align="center">
                <Form />
              </Container>
              </Paper>
            </Grid>
          </Grid>
        </main>
      </SudokuProvider>
    </ThemeProvider>
  );
}

export default App;
