import fs from "fs";

function parseInput() {
  return fs
    .readFileSync("./day.02.input.txt", "utf-8")
    .split(",")
    .map((x) => Number(x));
}

function run(program: number[]): number {
  let position = 0;

  while (program[position] !== 99) {
    switch (program[position]) {
      case 1: {
        program[program[position + 3]] = program[program[position + 1]] + program[program[position + 2]];
        break;
      }

      case 2: {
        program[program[position + 3]] = program[program[position + 1]] * program[program[position + 2]];
        break;
      }

      default: {
        throw new Error("Unexpected opcode encountered.");
      }
    }

    position += 4;
  }

  return program[0];
}

export function part1() {
  const program = parseInput();

  program[1] = 12;
  program[2] = 2;

  return run(program);
}

export function part2() {
  const input = parseInput();

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const program = input.slice();

      program[1] = i;
      program[2] = j;

      if (run(program) === 19690720) {
        return 100 * i + j;
      }
    }
  }
}
