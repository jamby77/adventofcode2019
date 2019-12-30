const program = [
  1,
  12,
  2,
  3,
  1,
  1,
  2,
  3,
  1,
  3,
  4,
  3,
  1,
  5,
  0,
  3,
  2,
  13,
  1,
  19,
  1,
  19,
  10,
  23,
  1,
  23,
  13,
  27,
  1,
  6,
  27,
  31,
  1,
  9,
  31,
  35,
  2,
  10,
  35,
  39,
  1,
  39,
  6,
  43,
  1,
  6,
  43,
  47,
  2,
  13,
  47,
  51,
  1,
  51,
  6,
  55,
  2,
  6,
  55,
  59,
  2,
  59,
  6,
  63,
  2,
  63,
  13,
  67,
  1,
  5,
  67,
  71,
  2,
  9,
  71,
  75,
  1,
  5,
  75,
  79,
  1,
  5,
  79,
  83,
  1,
  83,
  6,
  87,
  1,
  87,
  6,
  91,
  1,
  91,
  5,
  95,
  2,
  10,
  95,
  99,
  1,
  5,
  99,
  103,
  1,
  10,
  103,
  107,
  1,
  107,
  9,
  111,
  2,
  111,
  10,
  115,
  1,
  115,
  9,
  119,
  1,
  13,
  119,
  123,
  1,
  123,
  9,
  127,
  1,
  5,
  127,
  131,
  2,
  13,
  131,
  135,
  1,
  9,
  135,
  139,
  1,
  2,
  139,
  143,
  1,
  13,
  143,
  0,
  99,
  2,
  0,
  14,
  0
];

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
