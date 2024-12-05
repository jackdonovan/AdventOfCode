function searchForXMAS(grid, target) {
  const rows = grid.split("\n");
  const numRows = rows.length;
  const numCols = rows[0].length;

  const directions = [
    { row: 0, col: 1 }, 
    { row: 0, col: -1 },
    { row: 1, col: 0 }, 
    { row: -1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: -1 },
    { row: -1, col: 1 }, 
    { row: -1, col: -1 },
  ];

  function isValidSearch(row, col, direction) {
    for (let i = 0; i < target.length; i++) {
      const newRow = row + i * direction.row;
      const newCol = col + i * direction.col;

      if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols) {
        return false;
      }

      if (rows[newRow][newCol] !== target[i]) {
        return false;
      }
    }
    return true;
  }

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      for (const direction of directions) {
        if (isValidSearch(row, col, direction)) {
          totalXmas++;
        }
      }
    }
  }
}
let totalXmas = 0
import fs from "fs";

fs.readFile("input.txt", "utf8", (err: any, data: string) => {
  if (err) {
    console.error(err);
  }
  searchForXMAS(data, 'SAMX');
  console.log(totalXmas)
});
