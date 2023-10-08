import { Button, Paper, Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ width:"50px"}}>
        <Paper style={{width: "150px",height: "150px",borderRadius: "50%", border : "4px", backgroundColor: "transparent" }} elevation={3}>
            <Typography style={{ padding:"60px"}}>
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}  
            </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper style={{width: "200px"}}elevation={3}>
            <Item>
                <Button variant="contained" onClick={startStop}>{isRunning ? "Stop" : "Start"}</Button>
            </Item>
            <Item>
                <Button variant="contained" onClick={reset}>Reset</Button>
            </Item>
        </Paper>
        </Grid>
      </Grid>
    </>
      
    
  );
}

export default Stopwatch;