import React, { useState, useEffect } from "react";
import { Button, Paper, Typography, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useGridNumberContext } from "../contexts/CurrentGridContext";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(26, 32, 39, 0)' : 'rgba(255, 255, 255, 0)',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50, // Set the desired height
    width: 45, // Set the desired width

  }));

function NumberBar() {
    const { numUsage, setNumUsage } = useGridNumberContext();
    const buttonStyle = {
        minWidth: '40px', // Adjust the minWidth to decrease the button size
        height : '50px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '34px'
    };
    return(
    <>
        <Grid container spacing={2} style={{flexDirection: "row"}}>
            {[1,2,3,4,5,6,7,8,9].map(number => (
                <Grid item key={number} >
                    <Item elevation={0}>
                        <Button 
                            disabled={numUsage[number] === 0}
                            style={buttonStyle}
                        >
                        {number}    
                        </Button>
                    </Item>
                    
                </Grid>
            ))}
        </Grid>
    </>
    );
}

export default NumberBar