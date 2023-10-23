import { Typography } from "@mui/material"
import { useMistakesCountContext } from "../contexts/CurrentGridContext"


function MistakesCount(){
    const {mistakes, setMistakes} = useMistakesCountContext();
    return(
        <>
            <Typography>Mistakes {mistakes}/3 </Typography>
        </>
    )
}

export default MistakesCount