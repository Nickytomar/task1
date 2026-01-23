// 0 = walkable, 1 = wall
export const maze = [
  [0, 0, 1, 0],
  [1, 0, 1, 0],
  [0, 0, 0, 0],
  [0, 1, 1, 0],
];

export const START = { row: 0, col: 0 };
export const END = { row: 3, col: 3 };
export const buildPath = (parent, start, end) => {
  const path = [];
  let current = end;

  while (
    current.row !== start.row ||
    current.col !== start.col
  ) {
    path.push(current);
    current = parent[`${current.row},${current.col}`];
    if (!current) return [];
  }

  path.push(start);
  return path.reverse();
};
