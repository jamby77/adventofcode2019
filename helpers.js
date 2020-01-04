// if (!require) {
//   function require() {}
// }
// const module = {};
const fs = require("fs");

function readDataToString(fileName) {
  const input = fs.readFileSync(`./${fileName}`, { encoding: "utf-8" });

  const data = input.toString();
  return data;
}

const ocAdd = 1;
const ocMul = 2;
const ocIn = 3;
const ocOut = 4;
const ocJumpTrue = 5;
const ocJumpFalse = 6;
const ocLessThan = 7;
const ocEquals = 8;
const ocBase = 9;
const ocHalt = 99;

const ocInLen = 2;
const ocOutLen = 2;
const ocAddLen = 4;
const ocMulLen = 4;
const ocLessThanLen = 4;
const ocEqualsLen = 4;
const ocJumpFalseLen = 3;

const parModePos = 0;
const parModeImm = 1;
const parModeRel = 2;

const Op = {
  ocAdd,
  ocMul,
  ocIn,
  ocOut,
  ocHalt,
  ocJumpFalse,
  ocJumpTrue,
  ocLessThan,
  ocEquals,
  ocBase,
  ocAddLen,
  ocMulLen,
  ocInLen,
  ocOutLen,
  ocLessThanLen,
  ocEqualsLen,
  parModePos,
  parModeImm,
  parModeRel
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
    case ocBase:
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

function intComp(inputProgram = []) {
  const commands = [...inputProgram];
  let relativeBase = 0;
  let i = 0;
  let val1;
  let val2;
  let writeToIdx;
  let result;
  let store;
  let output;
  let _input;

  function getInt(idx) {
    return parseInt(commands[idx] || 0);
  }

  function getVal(mode = 0, fromIndex = 0, step = 1) {
    let val, dest;
    if (mode === Op.parModeImm) {
      val = getInt(fromIndex + step);
    } else if (mode === Op.parModeRel) {
      dest = relativeBase + getInt(fromIndex + step);
      val = getInt(dest);
    } else {
      dest = getInt(fromIndex + step);
      val = getInt(dest);
    }
    return val;
  }

  function getDest(mode = 0, fromIndex = 0, step = 1) {
    let dest;
    if (mode === Op.parModeRel) {
      dest = relativeBase + getInt(fromIndex + step);
    } else {
      dest = getInt(fromIndex + step);
    }
    return dest;
  }

  function setVal(pos, value) {
    while (commands.length < pos) {
      commands.push(0);
    }
    commands[pos] = value;
  }

  function input(value) {
    _input = value;
  }

  function next() {
    let movePointer = true;
    const code = commands[i];
    const parsed = parseOpcode(code, i);
    const { op, step, param1, param2, param3 } = parsed;
    switch (op) {
      case ocBase:
        val1 = getVal(param1, i, 1);
        relativeBase = relativeBase + val1;
        break;
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
        writeToIdx = getDest(param3, i, 3);
        setVal(writeToIdx, val1 < val2 ? 1 : 0);
        break;
      case ocEquals:
        val1 = getVal(param1, i, 1);
        val2 = getVal(param2, i, 2);
        writeToIdx = getDest(param3, i, 3);
        setVal(writeToIdx, val1 === val2 ? 1 : 0);
        break;
      case ocIn:
        if (typeof _input === "undefined") {
          return { value: Infinity, done: false };
        }
        writeToIdx = getDest(param1, i, 1);
        setVal(writeToIdx, _input);
        _input = undefined;
        break;
      case ocOut:
        output = getVal(param1, i, 1);
        if (movePointer) {
          i += step;
        }
        return { value: output, done: false };
        break;
      case ocAdd:
        val1 = getVal(param1, i, 1);
        val2 = getVal(param2, i, 2);
        result = val1 + val2;
        store = getDest(param3, i, 3);
        setVal(store, result);
        break;
      case ocMul:
        val1 = getVal(param1, i, 1);
        val2 = getVal(param2, i, 2);
        result = val1 * val2;
        store = getDest(param3, i, 3);
        setVal(store, result);
        break;
      case ocHalt:
        // console.log("Halt!");
        return { value: null, done: true };
      default:
        console.log(`Unknown operation: ${op}`);
        break;
    }
    if (movePointer) {
      i += step;
    }
    return { value: null, done: false };
  }

  return {
    next,
    input
  };
}

function permutationsWithRepetition(src = [], len = 1) {
  const K = len - 1,
    N = src.length;

  let n = 0,
    stack = [],
    out = [],
    k = 0;
  function next() {
    while (true) {
      while (n < src.length) {
        out[k] = src[n++];
        if (k == K) {
          return out.slice(0);
        } else {
          if (n < src.length) {
            stack.push(k);
            stack.push(n);
          }
          k++;
          n = 0;
        }
      }
      if (stack.length == 0) break;

      n = stack.pop();
      k = stack.pop();
    }
    return false;
  }

  function rewind() {
    k = 0;
    n = 0;
    out = [];
    stack = [];
  }

  function each(cb) {
    rewind();
    let v;
    while ((v = next())) if (cb(v) === false) return;
  }

  return {
    next,
    each,
    rewind
  };
}

function permutationsWithoutRepetition(src = [], len = 1) {
  const result = [];
  const perms = permutationsWithRepetition(src, len);
  perms.each(function(permutation) {
    const set = new Set(permutation);
    if (set.size === permutation.length) {
      result.push(permutation);
    }
  });
  return result;
}

module.exports = {
  readDataToString,
  parseOpcode,
  Op,
  intComp,
  permutationsWithoutRepetition
};
