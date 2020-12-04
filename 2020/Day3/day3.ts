import fs from "fs";

let slopes: any;
let rowCount = 0;
let currentCol = 0;
let treeCount = 0;

function loadFile() {
  slopes = fs.readFileSync("input.txt", "utf8");
  let counter = 0;
  slopes = slopes.split("\n");
  for (let slope of slopes) {
    slopes[counter] = slope.repeat(70);
    counter++;
  }
}

function clearTrees() {
  console.log(treeCount);
  rowCount = 0;
  currentCol = 0;
  treeCount = 0;
}

function direction(row: number, col: number) {
  currentCol = currentCol + col;
  rowCount = rowCount + row;
}

function move() {
  for (let slope of slopes) {
    direction(1, 3);
    if (slopes[rowCount] == undefined) break;
    if (slopes[rowCount][currentCol] == "#") treeCount++;
  }

  clearTrees();
  for (let slope of slopes) {
    direction(1, 1);
    if (slopes[rowCount] == undefined) break;
    if (slopes[rowCount][currentCol] == "#") treeCount++;
  }

  clearTrees();
  for (let slope of slopes) {
    direction(1, 5);
    if (slopes[rowCount] == undefined) break;
    if (slopes[rowCount][currentCol] == "#") treeCount++;
  }

  clearTrees();
  for (let slope of slopes) {
    direction(1, 7);
    if (slopes[rowCount] == undefined) break;
    if (slopes[rowCount][currentCol] == "#") treeCount++;
  }

  clearTrees();
  for (let slope of slopes) {
    direction(2, 1);
    if (slopes[rowCount] == undefined) break;
    if (slopes[rowCount][currentCol] == "#") treeCount++;
  }
  clearTrees();
}

loadFile();
move();
