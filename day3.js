const { readDataToString } = require("./helpers");
const data = readDataToString("data3.txt").split("\n");

const wire1 = data[0].split(",");
const wire2 = data[1].split(",");

function distance(a, b) {
  const result = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  return result;
}
const wire1grid = {};
const w1steps = [];
const w2steps = [];
const wire1pos = { x: 0, y: 0 };
const wire2pos = { x: 0, y: 0 };
const wire2grid = {};
const origin = { x: 0, y: 0 };
const allIntersections = [];
let rowsPos = 0,
  colsPos = 0,
  rowsNeg = 0,
  colsNeg = 0;

// loop moves to find size of grids
for (const move of wire1) {
  const d = move[0];
  const l = parseInt(move.substring(1), 10);
  const { x, y } = wire1pos;
  let key;
  switch (d) {
    case "R":
      for (let i = x; i < x + l; i++) {
        // increment x axis, add to gried each position
        if (i === 0 && y === 0) {
          continue;
        }
        key = `${i}|${y}`;
        w1steps.push(key);
        const pos = { ...wire1pos, x: i, key, steps1: w1steps.length };
        wire1grid[key] = pos;
      }
      wire1pos.x += l;
      break;
    case "L":
      for (let i = x; i > x - l; i--) {
        // decrement x axis, add to gried each position
        if (i === 0 && y === 0) {
          continue;
        }
        key = `${i}|${y}`;
        w1steps.push(key);
        const pos = { ...wire1pos, x: i, key, steps1: w1steps.length };
        wire1grid[key] = pos;
      }
      wire1pos.x -= l;
      break;
    case "U":
      for (let i = y; i < y + l; i++) {
        if (x === 0 && i === 0) {
          continue;
        }
        // increment y axis, add to gried each position
        key = `${x}|${i}`;
        w1steps.push(key);
        const pos = { ...wire1pos, y: i, key, steps1: w1steps.length };
        wire1grid[key] = pos;
      }
      wire1pos.y += l;
      break;
    default:
      for (let i = y; i > y - l; i--) {
        if (x === 0 && i === 0) {
          continue;
        }
        // increment y axis, add to gried each position
        key = `${x}|${i}`;
        w1steps.push(key);
        const pos = { ...wire1pos, y: i, key, steps1: w1steps.length };
        wire1grid[key] = pos;
      }
      wire1pos.y -= l;
      break;
  }
}

for (const move of wire2) {
  const d = move[0];
  const l = parseInt(move.substring(1), 10);
  const { x, y } = wire2pos;
  let key;
  switch (d) {
    case "R":
      for (let i = x; i < x + l; i++) {
        // increment x axis, add to gried each position
        if (i === 0 && y === 0) {
          continue;
        }
        key = `${i}|${y}`;
        w2steps.push(key);
        const pos = { ...wire2pos, x: i, key, steps2: w2steps.length };
        wire2grid[key] = pos;
        if (wire1grid[key]) {
          // intersection found
          allIntersections.push({ ...pos, ...wire1grid[key] });
        }
      }
      wire2pos.x += l;
      break;
    case "L":
      for (let i = x; i > x - l; i--) {
        // decrement x axis, add to gried each position
        if (i === 0 && y === 0) {
          continue;
        }
        key = `${i}|${y}`;
        w2steps.push(key);
        const pos = { ...wire2pos, x: i, key, steps2: w2steps.length };
        wire2grid[key] = pos;
        if (wire1grid[key]) {
          // intersection found
          allIntersections.push({ ...pos, ...wire1grid[key] });
        }
      }
      wire2pos.x -= l;
      break;
    case "U":
      for (let i = y; i < y + l; i++) {
        if (x === 0 && i === 0) {
          continue;
        }
        // increment y axis, add to gried each position
        key = `${x}|${i}`;
        w2steps.push(key);
        const pos = { ...wire2pos, y: i, key, steps2: w2steps.length };
        wire2grid[key] = pos;
        if (wire1grid[key]) {
          // intersection found
          allIntersections.push({ ...pos, ...wire1grid[key] });
        }
      }
      wire2pos.y += l;
      break;
    default:
      for (let i = y; i > y - l; i--) {
        if (x === 0 && i === 0) {
          continue;
        }
        // increment y axis, add to gried each position
        key = `${x}|${i}`;
        w2steps.push(key);
        const pos = { ...wire2pos, y: i, key, steps2: w2steps.length };
        wire2grid[key] = pos;
        if (wire1grid[key]) {
          // intersection found
          allIntersections.push({ ...pos, ...wire1grid[key] });
        }
      }
      wire2pos.y -= l;
      break;
  }
}

let closest = Number.MAX_SAFE_INTEGER;
let minSteps = Number.MAX_SAFE_INTEGER;

allIntersections.forEach(intersection => {
  const result = distance(origin, intersection);

  const steps = intersection.steps2 + intersection.steps1;

  if (steps < minSteps) {
    minSteps = steps;
  }

  if (result < closest) {
    closest = result;
  }
});

console.log("closest: ", closest);
console.log("minSteps: ", minSteps);
