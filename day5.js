const { readDataToString } = require("./readData");
const data = readDataToString("day5data.txt");
const input = data.split(",");

const ocAdd = 1;
const ocAddLen = 4;
const ocMul = 2;
const ocMulLen = 4;
const ocIn = 3;
const ocInLen = 2;
const ocOut = 4;
const ocOutLen = 2;
const ocHalt = 99;
const parModePos = 0;
const parModeImm = 1;
const ocJumpTrue = 5;
const ocJumpFalse = 6;
const ocLessThan = 7;
const ocLessThanLen = 4;
const ocEquals = 8;
const ocEqualsLen = 4;
const ocJumpFalseLen = 3;

const Op = {
  ocAdd,
  ocAddLen,
  ocMul,
  ocMulLen,
  ocIn,
  ocInLen,
  ocOut,
  ocOutLen,
  ocHalt,
  parModePos,
  parModeImm,
  ocJumpFalse,
  ocJumpTrue,
  ocLessThan,
  ocEquals,
  ocLessThanLen,
  ocEqualsLen
};

function parseOpcode(code, idx) {
  const numcode = parseInt(code, 10);
  const op = numcode % 100;
  const param1 = Math.floor(numcode / 100) % 10;
  const param2 = Math.floor(numcode / 1000) % 10;
  const param3 = Math.floor(numcode / 10000) % 10;
  let step = 0;

  switch (op) {
    case ocIn:
    case ocOut:
      step = ocInLen;
      break;
    case ocJumpTrue:
    case ocJumpFalse:
      step = ocJumpFalseLen;
      break;
    case ocEquals:
    case ocLessThan:
    default:
      step = ocAddLen;
  }
  return { op, param1, param2, param3, step, idx };
}

function run(commands, input) {
  function getInt(idx) {
    return parseInt(commands[idx]);
  }

  function getVal(mode = 0, fromIndex = 0, step = 1) {
    let val, dest;
    if (mode === Op.parModeImm) {
      val = getInt(fromIndex + step);
    } else {
      dest = getInt(fromIndex + step);
      val = getInt(dest);
    }
    return val;
  }
  let val1;
  let val2;
  let dest1;
  let result;
  let store;
  let output;
  for (let i = 0; i < commands.length; ) {
    let movePointer = true;
    const code = commands[i];
    const parsed = parseOpcode(code, i);
    const { op, step, param1, param2 } = parsed;
    switch (op) {
      case ocJumpTrue:
        val1 = getVal(param1, i, 1);
        if (val1 !== 0) {
          i = getVal(param2, i, 2);
          movePointer = false;
        }
        break;
      case ocJumpFalse:
        val1 = getVal(param1, i, 1);
        if (val1 === 0) {
          i = getVal(param2, i, 2);
          movePointer = false;
        }
        break;
      case ocLessThan:
        val1 = getVal(param1, i, 1);
        val2 = getVal(param2, i, 2);
        dest1 = getInt(i + 3);
        commands[dest1] = val1 < val2 ? 1 : 0;
        break;
      case ocEquals:
        val1 = getVal(param1, i, 1);
        val2 = getVal(param2, i, 2);
        dest1 = getInt(i + 3);
        commands[dest1] = val1 === val2 ? 1 : 0;
        break;
      case ocIn:
        val1 = input; // only input is 1
        dest1 = getInt(i + 1);
        commands[dest1] = val1;
        break;
      case ocOut:
        output = getVal(param1, i, 1);
        console.log(output);
        break;
      case ocAdd:
        val1 = getVal(param1, i, 1);
        val2 = getVal(param2, i, 2);
        result = val1 + val2;
        store = getInt(i + 3);
        commands[store] = result;
        break;
      case ocMul:
        val1 = getVal(param1, i, 1);
        val2 = getVal(param2, i, 2);
        result = val1 * val2;
        store = getInt(i + 3);
        commands[store] = result;
        break;
      case ocHalt:
        console.log("Halt!");
        return output;
      default:
        console.log("Unknown operation");
        break;
    }
    if (movePointer) {
      i += step;
    }
  }
}

const acCode = run([...input], 5);
acCode;
