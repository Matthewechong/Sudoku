import React, { useState, useEffect } from "react";
import ReplayIcon from '@mui/icons-material/Replay';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { Button, Paper, Typography, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import {  useGridSolutionContext, useDifficultyContext, useGridContext } from '../contexts/CurrentGridContext'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '50%', // Make the border radius 50% to create a circle
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50, // Set the desired height
    width: 50, // Set the desired width
    margin: 5, // Add some margin to separate the items
  }));

  function Tools() {
    const {grid, setGrid, changeGrid} = useGridContext();
    const { gridSol } = useGridSolutionContext();
    
    function solveBoard(){
        setGrid(gridSol);
    }

    return (
        <Grid container style={{ flexDirection: "row" }}>
            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center' }}>
                <Item>
                    <ReplayIcon style={{ fontSize: 40 }} />
                </Item>
            </Grid>
            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center' }}>
                <Item>
                    <ModeEditIcon style={{ fontSize: 40 }} />
                </Item>
            </Grid>
            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center' }}>
                <Item>
                    <AutoFixNormalIcon style={{ fontSize: 40 }} />
                </Item>
            </Grid>
            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center' }}>
                <Item>
                    <LightbulbOutlinedIcon  onClick={() => solveBoard()} style={{ fontSize: 40 }} />
                </Item>
            </Grid>
        </Grid>
    )
}

export default Tools