const min = 193651;
const max = 649729;

const validNumbers = [];
function isValid(num) {
  const digits = num.toString().split("");
  let same = false;
  let increase = true;
  for (let j = 1; j < digits.length; j++) {
    const a = parseInt(digits[j]);
    const b = parseInt(digits[j - 1]);
    const c = j >= 2 && parseInt(digits[j - 2]);
    const d = j <= digits.length && parseInt(digits[j + 1]);
    if (a < b) {
      increase = false;
      break;
    }
    if (a === b && a !== c && b !== d) {
      same = true; // has at least 2 adjacent digits same
    }
  }
  return same && increase;
}

for (let i = min; i <= max; i++) {
  if (isValid(i)) {
    validNumbers.push(i);
  }
}

console.log(validNumbers.length);
