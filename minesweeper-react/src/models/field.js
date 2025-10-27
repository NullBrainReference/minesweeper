export function createField(rows, cols, mines) {
    const field = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        isMine: false,
        isOpen: false,
        adjacentMines: 0,
      }))
    );
  
    let placed = 0;
    while (placed < mines) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (!field[r][c].isMine) {
        field[r][c].isMine = true;
        placed++;
      }
    }
  
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!field[r][c].isMine) {
          field[r][c].adjacentMines = countMinesAround(field, r, c);
        }
      }
    }
    return field;
  }
  
  export function countMinesAround(field, x, y) {
    const dirs = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];
    return dirs.reduce((count, [dx, dy]) => {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && nx < field.length && ny >= 0 && ny < field[0].length) {
        if (field[nx][ny].isMine) count++;
      }
      return count;
    }, 0);
  }
  