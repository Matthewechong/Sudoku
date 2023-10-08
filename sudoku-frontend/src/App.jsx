import React, { useState } from "react";
import DisplayGrid from "./components/DisplayGrid";
import SudokuProvider  from "./contexts/CurrentGridContext";
import Form from "./components/Form"
import { Container, CssBaseline, Typography, Grid, Paper, Button } from "@mui/material";
import ResponsiveAppBar from "./components/MenuBar";
import Stopwatch from "./components/StopWatch";
function App(){
  return( 
      <>
  <SudokuProvider>
    <CssBaseline></CssBaseline>
    <ResponsiveAppBar></ResponsiveAppBar>
    <main>
    <Grid container spacing={2}>
      <Grid item xs={6} style={{ padding: "40px", marginTop: "40px" }}>
        <Paper elevation={0} style={{ height : "650px"}} >
          <Container maxWidth="sm" align="center" style={{  }} >
            <DisplayGrid />
          </Container>
        </Paper>
      </Grid>
      <Grid item xs={6} style={{ padding: "0px", marginTop: "80px" }}>
          <Container maxWidth="sm" align="center" >
            <Stopwatch></Stopwatch>
            <Form />
          </Container>
      </Grid>
    </Grid>
    </main>
  </SudokuProvider>
      </>
    )
}

export default App;