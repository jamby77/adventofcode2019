const {
  readDataToString,
  run
} = require("./helpers");

const data = readDataToString('day9data.txt');
const input = data.split(',');//.map(d => parseInt(d, 10))

// part 1
run([...input], 0, 1);

// part 2
run([...input], 0, 2);
