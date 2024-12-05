import fs from "fs";

function nextCoord({ y, x }: Position, line: Los): Position {
  const crossing: Record<Los, Position> = {
    tm: { y: y - 1, x },
    tr: { y: y - 1, x: x + 1 },
    mr: { y, x: x + 1 },
    br: { y: y + 1, x: x + 1 },
    bm: { y: y + 1, x },
    bl: { y: y + 1, x: x - 1 },
    ml: { y, x: x - 1 },
    tl: { y: y - 1, x: x - 1 },
  };
  return crossing[line] || { y, x };
}

function getCharAtCoordinate(grid: string[], { y, x }: Position) {
  return grid[y]?.[x];
}

function isMasOrSamShared(grid: string[], position: Position): boolean {
  const { y, x } = position;
  const getLOSChar = (line: Los) => getCharAtCoordinate(grid, nextCoord(position, line));
  const [mid, tl, tr, bl, br] = [
    grid[position.y][position.x],
    getLOSChar("tl"),
    getLOSChar("bl"),
    getLOSChar("tr"),
    getLOSChar("br"),
  ];

  return (
    mid === "A" &&
    ((tl === "M" && br === "S") || (tl === "S" && br === "M")) &&
    ((tr === "M" && bl === "S") || (tr === "S" && bl === "M"))
  );
}

type Position = { y: number; x: number };
const LOS = ["tl", "tm", "tr", "ml", "mr", "bl", "bm", "br"] as const;
type Los = (typeof LOS)[number];
fs.readFile("input.txt", "utf8", (err: any, data: string) => {
  if (err) {
    console.error(err);
  }
  const lines = data.split("\n");
  let count = 0;
  count = 0;
  for (let y = 1; y < lines.length - 1; y++) {
    for (let x = 1; x < lines[y].length - 1; x++) {
      if (isMasOrSamShared(lines, { y, x })) count++;
    }
  }
  console.log(count);
});
