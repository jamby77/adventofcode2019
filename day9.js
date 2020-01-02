const {
  readDataToString,
  run
} = require("./helpers");

const data = readDataToString('day9data.txt');
const input = data.split(',');//.map(d => parseInt(d, 10))

run(input, 0, 1);
