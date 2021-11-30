const fs = require("fs");

function parseInput() {
  return fs
    .readFileSync("src/day.1.input.txt", "utf-8")
    .split("\n")
    .filter((x) => x)
    .map((x) => Number(x));
}

function part1() {
  const input = parseInput();
  return input.reduce((sum, mass) => ((sum += getFuel(mass)), sum), 0);
}

function getFuel(mass) {
  return Math.floor(mass / 3) - 2;
}

function part2() {
  const input = parseInput();
  return input.reduce((sum, mass) => ((sum += getFuelRecursive(mass)), sum), 0);
}

function getFuelRecursive(mass) {
  const fuel = Math.floor(mass / 3) - 2;

  if (fuel <= 0) {
    return 0;
  }

  return fuel + getFuelRecursive(fuel);
}

module.exports.part1 = part1;
module.exports.part2 = part2;
