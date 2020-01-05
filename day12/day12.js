const { readDataToString } = require("../helpers");
const path = require("path");
const data = readDataToString(path.join(__dirname, "data.txt"), true);
const scan = data.split("\n").map(line => {
  const regex = /<x=([^,]*),\s*y=([^,]*),\s*z=([^,]*)>/;
  const matches = regex.exec(line);
  const [_, x, y, z] = matches;
  return {
    x: parseInt(x, 10),
    y: parseInt(y, 10),
    z: parseInt(z, 10),
    pot: 0,
    kin: 0,
    total: 0
  };
});

const absSum = ({ x, y, z }) => {
  return Math.abs(x) + Math.abs(y) + Math.abs(z);
};

function updateVelocities(scan = [], steps = 0) {
  let idx = 0;
  const velocities = [
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 }
  ];
  const makeSnapShot = () => {
    return scan.reduce((snap, moon, idx) => {
      const vel = velocities[idx];
      return `${snap}${moon.x}${moon.y}${moon.z}${vel.x}${vel.y}${vel.z}\n`;
    }, "");
  };
  const initialSnapshot = makeSnapShot();
  const universeMatches = () => {
    const snapshot = makeSnapShot();

    return snapshot === initialSnapshot;
  };
  const getVelUpdate = (a, b, axis) => {
    let update;
    if (a[axis] > b[axis]) {
      update = -1;
    } else if (a[axis] < b[axis]) {
      update = 1;
    } else {
      update = 0;
    }
    return update;
  };
  while (true) {
    if (idx >= steps) {
      break;
    }
    if (idx % 1000000 === 0) {
      console.log(idx);
    }
    if (idx > 0 && universeMatches()) {
      console.log(idx);
      break;
    }
    scan.forEach((moon, idx) => {
      const vel = velocities[idx];
      for (const pairMoon of scan) {
        if (pairMoon === moon) {
          continue;
        }
        const x = getVelUpdate(moon, pairMoon, "x"),
          y = getVelUpdate(moon, pairMoon, "y"),
          z = getVelUpdate(moon, pairMoon, "z");
        vel.x += x;
        vel.y += y;
        vel.z += z;
      }
    });
    scan.forEach((moon, idx) => {
      const vel = velocities[idx];
      moon.x += vel.x;
      moon.y += vel.y;
      moon.z += vel.z;

      const pot = absSum(moon);
      const kin = absSum(vel);
      moon.pot = pot;
      moon.kin = kin;
      moon.total = pot * kin;
    });
    idx++;
  }
}

// part 1
const testScan1 = [
  { x: -1, y: 0, z: 2, pot: 0, kin: 0, total: 0 },
  { x: 2, y: -10, z: -7, pot: 0, kin: 0, total: 0 },
  { x: 4, y: -8, z: 8, pot: 0, kin: 0, total: 0 },
  { x: 3, y: 5, z: -1, pot: 0, kin: 0, total: 0 }
];
// updateVelocities(testScan1, 10);
// let total = 0;
// testScan1.forEach(moon => (total += moon.total));
// console.log(total, testScan1);

const testScan2 = [
  { x: -8, y: -10, z: 0, pot: 0, kin: 0, total: 0 },
  { x: 5, y: 5, z: 10, pot: 0, kin: 0, total: 0 },
  { x: 2, y: -7, z: 3, pot: 0, kin: 0, total: 0 },
  { x: 9, y: -8, z: -3, pot: 0, kin: 0, total: 0 }
];
// updateVelocities(testScan2, 100);
// total = 0;
// testScan2.forEach(moon => (total += moon.total));
// console.log(total, testScan2);

// updateVelocities(scan, 1000);
// total = 0;
// scan.forEach(moon => (total += moon.total));
// console.log(total, scan);

// part 2
updateVelocities(testScan1, Infinity);
updateVelocities(testScan2, Infinity);
