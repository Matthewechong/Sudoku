import axios from 'axios';

let saveUrl = "http://localhost:8080/save";
let loadUrl = "http://localhost:8080/load";

export function SaveGame(board,difficulty){
    const jsonTemplate =
        {"gamestate" : board,
        "difficulty" : difficulty
        };
        
    axios.post(saveUrl,jsonTemplate)
        .then((response) =>{
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
}

export function LoadGame(){
    axios.get(loadUrl)
    .then((response) =>{
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    })
}