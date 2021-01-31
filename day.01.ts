import fs from "fs";

function parseInput() {
  return fs
    .readFileSync("./day.01.input.txt", "utf-8")
    .split("\n")
    .filter((x) => x)
    .map((x) => Number(x));
}

function calculateFuel(value: number): number {
  const fuel = Math.floor(value / 3) - 2;
  return fuel > 0 ? fuel : 0;
}

function calculateFuelRecursive(value: number): number {
  const fuel = Math.floor(value / 3) - 2;
  return fuel > 0 ? fuel + calculateFuelRecursive(fuel) : 0;
}

function getTotalFuel(strategy: (value: number) => number): number {
  return parseInput().reduce((acc, cur) => ((acc += strategy(cur)), acc), 0);
}

export function part1() {
  return getTotalFuel(calculateFuel);
}

export function part2() {
  return getTotalFuel(calculateFuelRecursive);
}
