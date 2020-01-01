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
function buildTree(tree, pairs, root) {
  // console.log(tree, pairs, root);
  const descendants = pairs.filter(c => c.head === root);
  const rest = pairs.filter(c => c.head !== root);
  if (descendants.length > 0) {
    tree[root] = {};
  }

  descendants.forEach(item => {
    const { tail } = item;
    buildTree(tree[root], rest, tail);
  });
}

buildTree(tree, input, root);
console.log(tree);
