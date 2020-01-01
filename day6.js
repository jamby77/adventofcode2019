const { readDataToString } = require("./readData");
const data = readDataToString("day6data.txt");

const input = data
  .split("\n")
  .filter(Boolean)
  .map(line => {
    const [head, tail] = line.split(")");
    return { head, tail };
  });

const tree = {};
const pairs = {};
const centers = input.map(item => {
  const { head } = item;
  return head;
});
const leafs = input.map(item => item.tail);

const root = centers.find(center => leafs.indexOf(center) === -1);
let total = 0;
function buildTree(tree, pairs, root, level = 0) {
  // console.log(tree, pairs, root);
  const descendants = pairs.filter(c => c.head === root);
  const rest = pairs.filter(c => c.head !== root);
  tree[root] = { level, name: root, descendants: [] };
  total += level;

  descendants.forEach(item => {
    const { tail } = item;
    tree[root].descendants.push(tail);
    buildTree(tree[root], rest, tail, level + 1);
  });
}

function findNode(tree = {}, search = "") {
  const { level, name, descendants, ...rest } = tree;
  if (name === search) {
    return { ...tree, ancestors: [] };
  }
  if (!rest) {
    return null;
  }

  for (let i = 0; i < descendants.length; i++) {
    const descName = descendants[i];
    const found = findNode(rest[descName], search);
    if (found) {
      found.ancestors.unshift(name);
      return found;
    }
  }

  return null;
}

buildTree(tree, input, root);
// part 1 answer
console.log(total);

const you = findNode(tree["COM"], "YOU");
const san = findNode(tree["COM"], "SAN");
if (you && san) {
  let commonName;
  const c =
    you.ancestors.length > san.ancestors.length
      ? san.ancestors.length
      : you.ancestors.length;
  for (let i = 0; i < c; i++) {
    if (you.ancestors[i + 1] !== san.ancestors[i + 1]) {
      commonName = you.ancestors[i];
      break;
    }
  }
  const common = findNode(tree["COM"], commonName);
  // part 2 answer
  console.log(you.level - 1 - common.level + san.level - 1 - common.level);
}
