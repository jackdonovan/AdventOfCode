import fs from "fs";

fs.readFile("input.txt", "utf8", (err: any, data: string) => {
  if (err) {
    console.error(err);
  }
  // pt. 1 regex
  // const regex = /mul\((\d{1,3}),\s?(\d{1,3})\)/g;
  const regex = /(mul\((\d{1,3}),\s?(\d{1,3})\))|(do\(\))|(don\'t\(\))/g;
  let match;
  let mulEnabled = true;
  let totalSum = 0;

  // pt. 1
  // while((match = regex.exec(data)) !== null) {
  //   totalSum += parseInt(match[1]) * parseInt(match[2]);
  // }

  while ((match = regex.exec(data)) !== null) {
    if (match[0] == "do()") {
      mulEnabled = true;
    }
    if (match[0] == "don't()") {
      mulEnabled = false;
    }
    if (!match[0].includes("do") && mulEnabled) {
      totalSum += parseInt(match[2]) * parseInt(match[3]);
    }
  }
  console.log(totalSum);
});
