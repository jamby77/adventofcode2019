const {
  readDataToString,
  run,
  permutationsWithoutRepetition
} = require("./helpers");
const data = readDataToString("day7data.txt");

const input = data.split(",");
const phaseInputs = [0, 1, 2, 3, 4];
var perms = permutationsWithoutRepetition(phaseInputs, 5);
let bestResult = 0;

perms.forEach(pi => {
  let ampInput = 0;
  let result;
  for (let i = 0; i < 5; i++) {
    result = run(input, pi[i], ampInput);
    ampInput = result;
  }
  if (result > bestResult) {
    bestResult = result;
  }
});

console.log("best: ", bestResult);
