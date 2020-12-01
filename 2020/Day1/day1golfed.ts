import fs from "fs";
let nums=fs.readFileSync("nums.txt", "utf8").split("\n").map(Number);
nums.filter(a=>{nums.filter(b=> nums.filter(c=>{((a+b==2020)?console.log(a*b):0);(a+b+c==2020)?console.log(a*b*c):0}))});