const heuristic = (a, b) =>
  Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

export const aStar = (maze, start, end) => {
  const rows = maze.length;
  const cols = maze[0].length;

  const openSet = [start];
  const cameFrom = {};

  const gScore = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );
  const fScore = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );

  gScore[start.row][start.col] = 0;
  fScore[start.row][start.col] = heuristic(start, end);

  const visited = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (openSet.length) {
    // node with lowest fScore
    openSet.sort(
      (a, b) =>
        fScore[a.row][a.col] - fScore[b.row][b.col]
    );

    const current = openSet.shift();
    visited[current.row][current.col] = true;

    if (
      current.row === end.row &&
      current.col === end.col
    ) {
      return {
        parent: cameFrom,
        visited,
      };
    }

    for (let [dr, dc] of directions) {
      const nr = current.row + dr;
      const nc = current.col + dc;

      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < rows &&
        nc < cols &&
        maze[nr][nc] === 0
      ) {
        const tentativeG =
          gScore[current.row][current.col] + 1;

        if (tentativeG < gScore[nr][nc]) {
          cameFrom[`${nr},${nc}`] = current;
          gScore[nr][nc] = tentativeG;
          fScore[nr][nc] =
            tentativeG + heuristic({ row: nr, col: nc }, end);

          if (
            !openSet.some(
              n => n.row === nr && n.col === nc
            )
          ) {
            openSet.push({ row: nr, col: nc });
          }
        }
      }
    }
  }

  return { parent: null, visited };
};
