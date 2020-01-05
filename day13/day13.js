const { intComp, readDataToString } = require("../helpers");
const path = require("path");
const data = readDataToString(path.join(__dirname, "data.txt"), true);
const programData = data.split(",").map(ch => parseInt(ch, 10));
const computer = intComp(programData);

let result = computer.next();
let instNum = 1;
const tiles = [];
let x = null,
  y = null,
  id = null;
while (result.done !== true) {
  const { value } = result;
  result = computer.next();
  if (!value) {
    continue;
  }
  const mod = instNum % 3;
  if (mod === 1) {
    x = value;
    console.log("x", x);
  } else if (mod === 2) {
    y = value;
    console.log("y", y);
  } else if (mod === 0) {
    id = value;
    console.log("id", id);
  } else {
    console.log("wtf");
  }
  if (x && y && id) {
    tiles.push({ x, y, id });
    (x = null), (y = null), (id = null);
  }
  instNum++;
}

console.log(tiles.length, instNum);
