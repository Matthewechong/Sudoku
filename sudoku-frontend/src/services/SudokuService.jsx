import axios from 'axios';

let saveUrl = "http://localhost:8080/api/save";
let loadUrl = "http://localhost:8080/api/load";

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
