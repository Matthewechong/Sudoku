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

const styles = {
    paper: {
      width: "100px",
      flexDirection: "row", 
      justifyContent: "center"
    },

    clock_block:{
      padding: "20px",
      width: "600px",
      flexDirection: "row", 
      justifyContent: "right"
    },
    clock:{
        width:"100px",
        height:"100px",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        // background-color: cyan;
        // border-radius: 5px;
    },
  };

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
        <Grid container style={styles.clock_block} >
            <Grid item xs={2} >
                <Typography style={styles.paper}>
                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </Typography>
            </Grid>

            <Grid item xs={2}>
                <Button sx={{ width: "75px" }} variant="contained" onClick={startStop}>
                    {isRunning ? "Stop" : "Start"}
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button sx={{ width: "75px" }} variant="contained" onClick={reset}>
                    Reset
                </Button>
            </Grid>
        </Grid>
    </>
);
}

export default Stopwatch;