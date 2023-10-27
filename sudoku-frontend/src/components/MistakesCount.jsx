import { Typography } from "@mui/material"
import { useMistakesCountContext } from "../contexts/CurrentGridContext"


function MistakesCount(){
    const {mistakes, setMistakes} = useMistakesCountContext();
    return(
        <>
            <Typography sx={{color : "#06f1e6"}}>Mistakes {mistakes}/3 </Typography>
        </>
    )
}

export default MistakesCount