import axios from 'axios';
const url = "https://sudoku-api.vercel.app/api/dosuku"
let grid = [[]];
let solution = [[]];
let rowString = '';
let difficulty = '';

export async function GenerateSudoku(){
    try{
        const response = await axios.post(url)
        const data = response.data.newboard;
        grid = data.grids[0].value;
        solution = data.grids[0].solution;
        difficulty = data.grids[0].difficulty;
        console.log("Generated Board")
        console.log(grid)
        console.log(solution)
        return [grid, difficulty]
    }
    catch (err) {
        console.error(err);
      }
}


export function printGrid(grid){
    console.log("Printing Board...")
    rowString = '';
    let countCol = 0;
    let countRow = 0
    grid.forEach((row,indexRow) => {
        row.forEach((value,indexCol) =>{
            rowString+=value;
            countCol+=1;
            if(countCol >= 3){
                countCol = 0
                rowString+=' ';
            }
        });
        rowString+='\n';
        countRow+=1;
        if(countRow >= 3){
            countRow=0;
            rowString+='\n';

        }
    });
    return rowString;
}
