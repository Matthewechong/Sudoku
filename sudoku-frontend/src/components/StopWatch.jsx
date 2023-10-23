import { Button, Paper, Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import DiffStat from "./DifficultyStatus";
import MistakesCount from "./MistakesCount";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,

  }));

const styles = {
    paper: {
      flexDirection: "row", 
      justifyContent: "center",
      
    },

    clock_block:{
      padding: "0px",
      width: "550px",
      flexDirection: "row", 
      justifyContent: "center"
    },
    clock:{
        width:"100px",
        height:"100px",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
    },
    diffStat:{
      flexDirection: "row", 
      justifyContent: "left",
      display: "flex",
    }
    
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
          
            <Grid item xs={4} >
                <DiffStat ></DiffStat>
            </Grid>
            <Grid item xs={4} >
                <MistakesCount></MistakesCount>
            </Grid>
            <Grid item xs={4} container justifyContent="flex-end" alignItems="center">
                <Typography >
                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </Typography>
                {isRunning ? (
                  <PauseCircleOutlineOutlinedIcon sx={{ width: "50px" }} variant="contained" onClick={startStop} />
                  ) : (
                      <PlayCircleFilledOutlinedIcon sx={{ width: "50px" }} variant="contained" onClick={startStop} />
                  )}
            </Grid>
        </Grid>
    </>
);
}

export default Stopwatch;