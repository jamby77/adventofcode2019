const { readDataToString } = require("./helpers");
const data = readDataToString("day8data.txt");
const rawImageData = data.split("").map(char => parseInt(char, 10));
const w = 25,
  h = 6,
  l = w * h;

const image = rawImageData.reduce((acc, current, idx) => {
  let lastRow;
  const mod = idx % l;
  if (mod === 0) {
    // add new row
    lastRow = [];
    acc.push(lastRow);
  } else {
    lastRow = acc[acc.length - 1];
  }
  lastRow.push(current);
  return acc;
}, []);

let numZeros = l,
  product;

image.forEach(row => {
  const temp = row.filter(digit => digit === 0);
  if (temp.length < numZeros) {
    const ones = row.filter(digit => digit === 1);
    const twos = row.filter(digit => digit === 2);
    numZeros = temp.length;
    product = ones.length * twos.length;
  }
});

console.log(product);
