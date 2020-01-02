const { readDataToString } = require("./helpers");
const data = readDataToString("day10data.txt");

const emptyMark = ".";
const astMark = "#";
// const baseAst = { x: 0, y: 0 };
const dataLines = data.split("\n");
let field = [];
dataLines.forEach((line, y) => {
  line.split("").forEach((char, x) => {
    if (char === emptyMark) {
      return;
    }
    field.push({ x, y });
  });
});

function getSlope(a, b) {
  return Math.atan2(a.x - b.x, a.y - b.y);
}

const slopes = {};

for (let i = 0; i < field.length; i++) {
  const a = field[i];
  const hash = `y${a.y}x${a.x}`;

  slopes[hash] = new Set();
  for (let j = 0; j < field.length; j++) {
    const b = field[j];
    if (a === b) {
      continue;
    }
    const slope = getSlope(a, b);
    slopes[hash].add(slope);
  }
}
let mostVisible = 0;
Object.keys(slopes).forEach(hash => {
  const hashSet = slopes[hash];
  if (hashSet.size > mostVisible) {
    mostVisible = hashSet.size;
  }
});
// part 1, solved with help from https://www.reddit.com/r/adventofcode/comments/e8mj2w/2019_day_10_part_1_having_a_hard_time_understand/
console.log(mostVisible);
