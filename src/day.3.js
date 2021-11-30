const fs = require("fs");

const { clone } = require("./utils/misc");

function parseInput() {
  return fs
    .readFileSync("src/day.3.input.txt", "utf-8")
    .split("\n")
    .filter((x) => x)
    .map((x) =>
      x.split(",").reduce(
        (points, step, idx) => {
          const direction = step[0];
          const distance = Number(step.slice(1));

          const point = clone(points[idx]);

          switch (direction) {
            case "R": {
              point.x += distance;
              break;
            }

            case "L": {
              point.x -= distance;
              break;
            }

            case "U": {
              point.y += distance;
              break;
            }

            case "D": {
              point.y -= distance;
              break;
            }
          }

          points.push(point);

          return points;
        },
        [{ x: 0, y: 0 }]
      )
    );
}

function part1() {
  const wires = parseInput();

  const segments1 = getSegments(wires[0]);
  const segments2 = getSegments(wires[1]);

  const intersections = [];

  for (let i = 0; i < segments1.length; i++) {
    for (let j = 0; j < segments2.length; j++) {
      const intersection = intersect(segments1[i], segments2[j]);

      if (intersection) {
        intersections.push(intersection);
      }
    }
  }

  return Math.min(...intersections.slice(1).map(({ x, y }) => Math.abs(x) + Math.abs(y)));
}

function part2() {}

function getSegments(points) {
  const segments = [];

  for (let i = 1; i < points.length; i++) {
    const segment = {
      x1: points[i - 1].x,
      x2: points[i].x,
      y1: points[i - 1].y,
      y2: points[i].y,
    };

    segments.push(segment);
  }

  return segments;
}

function intersect({ x1, x2, y1, y2 }, { x1: x3, x2: x4, y1: y3, y2: y4 }) {
  const t_num = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
  const u_num = (x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2);
  const D = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  if (D === 0) {
    return null;
  }

  const t = t_num / D;
  const u = u_num / D;

  if (t < 0 || t > 1 || u < 0 || u > 1) {
    return null;
  }

  return {
    x: Math.round(x1 + t * (x2 - x1)),
    y: Math.round(y1 + t * (y2 - y1)),
  };
}

module.exports.part1 = part1;
module.exports.part2 = part2;
