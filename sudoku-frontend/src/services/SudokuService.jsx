import axios from 'axios';
import {printGrid} from './SudokuGenerator';
let baseUrl = import.meta.env.VITE_BASEURL
let saveUrl = baseUrl + import.meta.env.VITE_SAVEURL
let loadUrl = baseUrl + import.meta.env.VITE_LOADURL

export function SaveGame(board,difficulty,username, id){
    const jsonTemplate =
    {
    "id" : id,
    "gamestate" : printGrid(board).replace(/\s+/g, ""),
    "difficulty" : difficulty,
    "username" : username,
    };
    console.log("Json Sent: ")
    console.log(jsonTemplate)
    console.log(saveUrl)
    axios.post(saveUrl,jsonTemplate)
        .then((response) =>{
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })


}

export async function LoadGame(id) {
    try {
      const response = await axios.get(loadUrl + '/' + id);
      const gamestate = response.data["gamestate"];
      console.log(gamestate);
      const difficulty = response.data["difficulty"];
      console.log("GameState and Difficulty: ");
      console.log(gamestate);
      console.log(difficulty);
      
      return [gamestate, difficulty]
  
    } catch (err) {
      console.error(err);
    }

  }
