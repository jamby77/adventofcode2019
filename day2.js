const { readDataToString } = require("./readData");
const data = readDataToString("data2.txt");
const program = data.split(",");
program[1] = 12;
program[2] = 2;

function runProgram(program) {
  for (let i = 0, c = program.length - 4; i < c; i += 4) {
    const operation = program[i];
    if (operation === 99) {
      break;
    }
    const op1idx = program[i + 1];
    const op2idx = program[i + 2];
    const residx = program[i + 3];

    const op1 = program[op1idx];
    const op2 = program[op2idx];
    let result;
    if (operation === 1) {
      result = op1 + op2;
    } else if (operation === 2) {
      result = op1 * op2;
    }
    program[residx] = result;
  }
  return program;
}

const expected = 19690720;

for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    const iterationProgram = [...program];
    iterationProgram[1] = i;
    iterationProgram[2] = j;
    runProgram(iterationProgram);
    if (iterationProgram[0] === expected) {
      console.log(
        iterationProgram[0],
        iterationProgram[1],
        iterationProgram[2]
      );
    }
  }
}
