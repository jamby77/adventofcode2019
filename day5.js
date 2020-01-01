const { readDataToString, run } = require("./helpers");
const data = readDataToString("day5data.txt");
const input = data.split(",");

const [acCode] = run([...input], 0, 5);
console.log(acCode);
