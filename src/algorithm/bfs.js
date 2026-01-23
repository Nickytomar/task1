export const bfs = (maze, start, end) => {
  const rows = maze.length;
  const cols = maze[0].length;

  const queue = [];
  const visited = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  const parent = {}; // for reconstructing path

  const directions = [
    [0, 1],   // right
    [1, 0],   // down
    [0, -1],  // left
    [-1, 0],  // up
  ];

  queue.push(start);
  visited[start.row][start.col] = true;

  while (queue.length) {
    const { row, col } = queue.shift();

    if (row === end.row && col === end.col) {
      return { parent, visited };
    }

    for (let [dr, dc] of directions) {
      const nr = row + dr;
      const nc = col + dc;

      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < rows &&
        nc < cols &&
        maze[nr][nc] === 0 &&
        !visited[nr][nc]
      ) {
        visited[nr][nc] = true;
        parent[`${nr},${nc}`] = { row, col };
        queue.push({ row: nr, col: nc });
      }
    }
  }

  return { parent: null, visited };
};
