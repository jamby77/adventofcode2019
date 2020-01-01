const fs = require("fs");

function readDataToString(fileName) {
  const input = fs.readFileSync(`./${fileName}`, { encoding: "utf-8" });

  const data = input.toString();
  return data;
}

module.exports = { readDataToString };
