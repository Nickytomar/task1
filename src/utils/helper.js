export const generateRandomMaze = (
  rows,
  cols,
  wallProbability = 0.3
) => {
  const maze = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () =>
      Math.random() < wallProbability ? 1 : 0
    )
  );

  // Ensure start & end are always open
  maze[0][0] = 0;
  maze[rows - 1][cols - 1] = 0;

  return maze;
};