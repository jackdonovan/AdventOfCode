import fs from 'fs';

fs.readFile('input.txt', 'utf8', (err: any, data: string) => {
  if (err) {
    console.error(err)
  }
    let totalDiff: number = 0
    let leftList: number[] = []
    let rightList: number[] = []
    
    data.split('\n').forEach((line: string) => {
      let lineParts = line.split('   ');
      leftList.push(parseInt(lineParts[0]))
      rightList.push(parseInt(lineParts[1]))
    });
    leftList = leftList.sort().filter(val => !isNaN(val));
    rightList = rightList.sort().filter(val => !isNaN(val));
    
    // Pt. 1
    for (const [index, leftVal] of leftList.entries()) {
      const rightVal = rightList[index];
      totalDiff += Math.abs(leftVal - rightVal);
    }
    console.log(totalDiff);
  
    // Pt. 2
    for (const leftVal of leftList) {
      let multiplier = rightList.filter(num => num === leftVal).length;
      totalDiff += leftVal * multiplier
    }
    console.log(totalDiff);
});