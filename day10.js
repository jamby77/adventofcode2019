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
const targets = {};
const makeHash = ast => `y${ast.y}x${ast.x}`;
for (let i = 0; i < field.length; i++) {
  const a = field[i];
  const hash = makeHash(a);

  slopes[hash] = new Set();
  targets[hash] = [];
  for (let j = 0; j < field.length; j++) {
    const b = field[j];
    if (a === b) {
      continue;
    }
    const slope = getSlope(a, b);
    slopes[hash].add(slope);
    targets[hash].push({ target: makeHash(b), slope });
  }
}

let mostVisible = 0;
let laserStattion;
Object.keys(slopes).forEach(hash => {
  const hashSet = slopes[hash];
  if (hashSet.size > mostVisible) {
    mostVisible = hashSet.size;
    laserStattion = hash;
  }
});

// part 1, solved with help from https://www.reddit.com/r/adventofcode/comments/e8mj2w/2019_day_10_part_1_having_a_hard_time_understand/
console.log(mostVisible);

// part 2
laserStattion;
let laserTargets = targets[laserStattion];

const parseHash = hash => {
  const result = /y(\d+)x(\d+)/g.exec(hash);
  const [_, x, y] = result;
  return { x, y };
};

function distance(a, b) {
  const result = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  return result;
}

const hashDistance = (a, b) => {
  const astA = parseHash(a);
  const astB = parseHash(b);
  return distance(astA, astB);
};

laserTargets.sort((a, b) => {
  const aSlope = a.slope,
    bSlope = b.slope;
  if (aSlope > 0 && bSlope < 0) {
    return -1;
  }
  if (bSlope > 0 && aSlope < 0) {
    return 1;
  }

  if (aSlope === bSlope) {
    const ad = hashDistance(laserStattion, a.target);
    const bd = hashDistance(laserStattion, b.target);
    return ad > bd ? 1 : -1;
  }
  return aSlope - bSlope;
});

let targetNum = 0;
let lastSlope;
for (let i = 0; i < laserTargets.length; i++) {
    const target = laserTargets[i];
    if (lastSlope !== target.slope) {
        console.log(i, targetNum , target);
        lastSlope = target.slope;
        targetNum++;
        if (targetNum === 200) {
            console.log(target.target);
            break;
        }
    }
}
console.log(laserTargets);
