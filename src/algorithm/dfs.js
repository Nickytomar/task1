export const dfs = (maze, start, end) => {
  const rows = maze.length;
  const cols = maze[0].length;

  const visited = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  const parent = {};
  let found = false;

  const directions = [
    [0, 1],   // right
    [1, 0],   // down
    [0, -1],  // left
    [-1, 0],  // up
  ];

  const dfsHelper = (row, col) => {
    if (row === end.row && col === end.col) {
      found = true;
      return;
    }

    visited[row][col] = true;

    for (let [dr, dc] of directions) {
      const nr = row + dr;
      const nc = col + dc;

      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < rows &&
        nc < cols &&
        maze[nr][nc] === 0 &&
        !visited[nr][nc] &&
        !found
      ) {
        parent[`${nr},${nc}`] = { row, col };
        dfsHelper(nr, nc);
      }
    }
  };

  dfsHelper(start.row, start.col);

  return {
    parent: found ? parent : null,
    visited,
  };
};
