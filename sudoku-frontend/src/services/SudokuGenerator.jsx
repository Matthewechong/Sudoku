import axios from 'axios';
const url = "https://sudoku-api.vercel.app/api/dosuku"
    // Define your GraphQL query
    const graphqlQuery = `
    query {
        newboard(limit=10) {
        grids {
            value
        }
        }
    }
    `;

    // Set up the GraphQL request headers
    const headers = {
        'Content-Type': 'application/json',
    };
let grid = [[]];
let solution = [[]];
let rowString = '';
let difficulty = '';

export default function GenerateSudoku(){
    
    
    // Send the GraphQL POST request
    axios.post(url)
    .then(response => {

        const data = response.data.newboard;
        grid = data.grids[0].value;
        solution = data.grids[0].solution;
        difficulty = data.grids[0].difficulty;


    })
        .catch(error => {
        console.error('GraphQL Error:', error);
    });
    return [
        printGrid(grid),
        difficulty
    ]
}


export function printGrid(grid){
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
