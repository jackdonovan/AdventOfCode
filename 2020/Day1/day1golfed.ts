import fs from "fs";
let nums=fs.readFileSync("nums.txt", "utf8").split("\n").map(Number);
nums.forEach(a=>{nums.filter((b)=>(a+b==2020)?console.log(a*b):0)});
nums.forEach(a=>{nums.forEach(b=> nums.filter(c=>{(a+b+c==2020)?console.log(a*b*c):0}))});
