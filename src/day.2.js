const fs = require("fs");

const { clone } = require("./utils/misc");

function parseInput() {
  return fs
    .readFileSync("src/day.2.input.txt", "utf-8")
    .split(",")
    .map((x) => Number(x));
}

function part1() {
  const program = parseInput();

  program[1] = 12;
  program[2] = 2;

  return executeProgram(program);
}

function part2() {
  const input = parseInput();

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const program = clone(input);

      program[1] = i;
      program[2] = j;

      const result = executeProgram(program);

      if (result === 19690720) {
        return 100 * i + j;
      }
    }
  }
}

function executeProgram(program) {
  let currentPosition = 0;

  loop: while (true) {
    switch (program[currentPosition]) {
      case 1: {
        program[program[currentPosition + 3]] =
          program[program[currentPosition + 1]] + program[program[currentPosition + 2]];
        break;
      }

      case 2: {
        program[program[currentPosition + 3]] =
          program[program[currentPosition + 1]] * program[program[currentPosition + 2]];
        break;
      }

      case 99: {
        break loop;
      }
    }

    currentPosition += 4;
  }

  return program[0];
}

module.exports.part1 = part1;
module.exports.part2 = part2;
