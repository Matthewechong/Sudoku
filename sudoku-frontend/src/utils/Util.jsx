
export function SudokuStringToGrid(sudokuString) {
    console.log("Sudoku String is")
    const result = sudokuString.replace(/\s+/g, "");
    const sudokuArray = [];
    for (let i = 0; i < 9; i++) {
        sudokuArray.push(result.slice(i * 9, (i + 1) * 9).split(""));
    }
    return sudokuArray;
  }