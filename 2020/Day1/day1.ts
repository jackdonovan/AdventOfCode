import fs from "fs";

let nums;
function addsToValue(num1: number, num2: number, expected: number, num3:number=0): number {
  if (num1 + num2 == expected) return num1 * num2;
  if(num3 != 0 && num1 + num2 + num3 == expected) return num1 * num2 * num3;
  else return 0;
}


function calculate() {
  nums = fs.readFileSync("nums.txt", "utf8");
  nums = nums.split("\n").map(Number);
  let multiplierNums = nums;
  nums.forEach((multiplicand) => {
    multiplierNums.forEach((multiplier) => {
      let result = addsToValue(multiplicand, multiplier, 2020);
      if (result != 0) console.log("Possible result? ", result);
    });
  });

  let additionalMultiplierNums = multiplierNums;

  nums.forEach((multiplicand) => {
    multiplierNums.forEach((multiplier) => {
      additionalMultiplierNums.forEach((inner) => {
        let result = addsToValue(multiplicand, multiplier, 2020, inner);
        if (result != 0) console.log("Possible result? ", result);
      });
    });
  });
}

calculate();
