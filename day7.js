const {
  readDataToString,
  run,
  permutationsWithoutRepetition
} = require("./helpers");
const data = readDataToString("day7data.txt");

const input = data.split(",");
const phaseInputs = [0, 1, 2, 3, 4];
const perms = permutationsWithoutRepetition(phaseInputs, 5);
let bestResult = 0;
// part 1
perms.forEach(pi => {
  let ampInput = 0;
  let result;
  for (let i = 0; i < 5; i++) {
    [result] = run(input, 0, pi[i], ampInput);
    ampInput = result;
  }
  if (result > bestResult) {
    bestResult = result;
  }
});

console.log("Best part 1: ", bestResult);

// part 2
const phaseInputs2 = [5, 6, 7, 8, 9];
const perms2 = permutationsWithoutRepetition(phaseInputs2, 5);

const amps = [
  {
    order: 0,
    name: "A"
  },
  {
    order: 1,
    name: "B"
  },
  {
    order: 2,
    name: "C"
  },
  {
    order: 3,
    name: "D"
  },
  {
    order: 4,
    name: "E"
  }
];

function amplify(amps, initialInput, phases) {
  let nextInput = 0;
  let running = true;
  while (running) {
    amps.forEach(amp => {
      if (amp.finished) {
        running = false;
        return;
      }
      let started = true,
        result,
        idx;
      const phase = phases[amp.order];
      if (amp.input === null) {
        amp.input = [...initialInput];
        started = false;
      }
      if (!started) {
        [result, idx] = run(amp.input, amp.idx, phase, nextInput);
      } else {
        [result, idx] = run(amp.input, amp.idx, nextInput);
      }
      amp.idx = idx;
      nextInput = result;
      amp.output = result;
      if (idx === -1) {
        amp.finished = true;
      }
    });
  }
  return nextInput;
}

const base = {
  input: null,
  output: null,
  phase: null,
  finished: false,
  idx: undefined
};

bestResult = 0;
perms2.forEach(phases => {
  let runAmps = amps.map(amp => {
    return {
      ...amp,
      ...base
    };
  });
  let result = amplify(runAmps, [...input], [...phases]);
  if (result > bestResult) {
    bestResult = result;
  }
});
console.log("Best part 2: ", bestResult);
