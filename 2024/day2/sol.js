import fs from "fs";

function isLevelsOrdered(report: number[]): boolean {
  const isIncreasing = report.every(
    (val, index) => index === 0 || val >= report[index - 1]
  );
  const isDecreasing = report.every(
    (val, index) => index === 0 || val <= report[index - 1]
  );
  return isIncreasing || isDecreasing;
}

function checkAdjacentLevels(report: number[]): boolean {
  for (let i = 0; i < report.length - 1; i++) {
    const diff = Math.abs(report[i] - report[i + 1]);
    if (diff < 1 || diff > 3) {
      return false;
    }
  }
  return true;
}

fs.readFile("input.txt", "utf8", (err: any, data: string) => {
  if (err) {
    console.error(err);
  }
  let safeLevelsCount = 0;
  data.split("\n").forEach((line: string) => {
    let lineParts = line.split(" ").map(Number);
    const levelsIncreasing = lineParts.every(
      (val, index) => index === 0 || val >= lineParts[index - 1]
    );
    const levelsDecreasing = lineParts.every(
      (val, index) => index === 0 || val <= lineParts[index - 1]
    );

    // pt. 1
    // if (
    //   (levelsIncreasing || levelsDecreasing) &&
    //   checkAdjacentLevels(lineParts)
    // ) {
    //   safeLevelsCount++;
    // }

    // pt. 2
    if (
      (levelsIncreasing || levelsDecreasing) &&
      checkAdjacentLevels(lineParts)
    ) {
      safeLevelsCount++;
      return;
    }

    let potentiallySafe = false;
    for (let i = 0; i < lineParts.length; i++) {
      const modifiedReport = lineParts
        .slice(0, i)
        .concat(lineParts.slice(i + 1));

      if (
        isLevelsOrdered(modifiedReport) &&
        checkAdjacentLevels(modifiedReport)
      ) {
        potentiallySafe = true;
        break;
      }
    }
    if (potentiallySafe) {
      safeLevelsCount++;
    }
  });
  console.log(safeLevelsCount);
});
