import React, { useState } from "react";
import {Typography} from "@mui/material";
import { useDifficultyContext } from "../contexts/CurrentGridContext";



function DiffStat() {
    const {difficulty, setDifficulty} = useDifficultyContext();
    return (
        <>
            <Typography sx={{color : "#06f1e6"}}>
                Difficulty: {difficulty}
            </Typography>
        </>
    );
}

export default DiffStat