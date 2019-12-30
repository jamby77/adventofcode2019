const fs = require("fs");
const input = fs.readFileSync("./data1.txt", { encoding: "utf-8" });

const data = input.toString();
const masses = data.split(" ");

function calculateFuel(mass) {
  return Math.floor(mass / 3) - 2;
}

function calculateFuelFuel(fuelMass) {
  const fuel = calculateFuel(fuelMass);
  if (fuel <= 0) {
    return 0;
  }
  return fuel + calculateFuelFuel(fuel);
}

const modulesFuel = masses
  .map(calculateFuelFuel)
  .reduce((total, fuel) => total + fuel, 0);

console.log(modulesFuel);
