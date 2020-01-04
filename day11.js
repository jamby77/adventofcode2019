const { intComp, readDataToString } = require("./helpers");
const data = readDataToString("day11data.txt");
const programData = data.split(",");
const computer = intComp(programData);
let result;
let breakp = 0;
const painted = new Set();
const hull = {};
const [up, right, down, left] = [0, 1, 2, 3];
const [turnLeft, turnRight] = [0, 1];
const panel = { x: undefined, y: undefined, visited: false, color: 0, dir: up };
let currentPanel;
let shouldOutputColor = true;
let topX = 0,
  topY = 0,
  botX = 0,
  botY = 0;

function changeDirection(currentDirection, turn) {
  switch (currentDirection) {
    case up:
      if (turn === turnLeft) {
        return left;
      } else if (turn === turnRight) {
        return right;
      }
      break;

    case down:
      if (turn === turnRight) {
        return left;
      } else if (turn === turnLeft) {
        return right;
      }
      break;
    case left:
      if (turn === turnRight) {
        return up;
      } else if (turn === turnLeft) {
        return down;
      }
      break;
    case right:
      if (turn === turnRight) {
        return down;
      } else if (turn === turnLeft) {
        return up;
      }
      break;
  }
  throw "Unknown direction";
}

function makeHash(panel) {
  const { x, y } = panel;
  return `x${x}y${y}`;
}

do {
  if (!currentPanel) {
    currentPanel = { ...panel, x: 0, y: 0, color: 1 };
    hull[makeHash(currentPanel)] = currentPanel;
  }
  result = computer.next();
  const { value, done } = result;
  if (value === Infinity) {
    computer.input(currentPanel.color);
  }
  if (value === 0 || value === 1) {
    if (shouldOutputColor) {
      // value is current panel's color
      currentPanel.color = value;
      currentPanel.visited = true;

      painted.add(makeHash(currentPanel));
    } else {
      // value is direction
      // get current position
      let { x, y, dir } = currentPanel;
      const newDir = changeDirection(dir, value);
      if (newDir === up) {
        y += 1;
      } else if (newDir === down) {
        y -= 1;
      } else if (newDir === left) {
        x -= 1;
      } else if (newDir === right) {
        x += 1;
      }
      const hash = makeHash({ x, y });
      if (hull[hash]) {
        currentPanel = { ...hull[hash], dir: newDir };
      } else {
        currentPanel = { ...panel, x, y, dir: newDir };
      }
      hull[hash] = currentPanel;
      if (x > topX) {
        topX = x;
      }
      if (x < botX) {
        botX = x;
      }
      if (y > topY) {
        topY = y;
      }
      if (y < botY) {
        botY = y;
      }
    }
    shouldOutputColor = !shouldOutputColor;
  }
  if (done === true) {
    console.log("done");
    break;
  }
} while (result.done !== true);
// part 1
console.log(painted.size);

// part 2
topX += 1;
topY += 1;
botX -= 1;
botY -= 1;
let txt = "";

for (let j = botY; j <= topY; j++) {
  for (let i = topX; i >= botX; i--) {
    const hash = makeHash({ x: i, y: j });
    const panel = hull[hash];
    txt += panel ? (panel.color === 0 ? " " : "#") : ".";
  }
  txt += "\n";
}

console.log(
  txt
    .split("")
    .reverse()
    .join("")
);
