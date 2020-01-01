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

// part 1
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

// part 2

const flatImage = Array(l);

// fill in the pixels in the flat image layer
for (let i = 0; i < l; i++) {
  for (let j = 0; j < image.length; j++) {
    // get the pixel at pos #I in layer #J
    const pixel = image[j][i];
    if (pixel === 1 || pixel === 0) {
      flatImage[i] = pixel;
      break;
    }
  }
  if (flatImage[i] === undefined) {
    flatImage[i] = 2;
  }
}

let imageText = "".padStart(w + 1, "*");
for (let i = 0; i < l; i++) {
  const pixel = flatImage[i];
  if (i % w === 0) {
    imageText += "*\n*";
  }
  imageText += pixel === 0 ? "*" : " ";
}
imageText += "\n" + "".padStart(w + 1, "*");

console.log(imageText);
