import axios from 'axios';
import {printGrid} from './SudokuGenerator';
import { SudokuStringToGrid } from '../utils/Util';
// let saveUrl = "http://localhost:8080/api/save";
// let loadUrl = "http://localhost:8080/api/load";
let saveUrl = "http://ec2-18-222-136-174.us-east-2.compute.amazonaws.com:8080/api/save";
let loadUrl = "http://ec2-18-222-136-174.us-east-2.compute.amazonaws.com:8080/api/load";

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
