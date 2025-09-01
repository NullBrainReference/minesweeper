const gridContainer = document.getElementById("grid-container");
const minesCounter = document.getElementById("mines-counter");

const rows = 24;
const cols = 24;

const cellSize = 18; // Size of each cell in pixels
const gapSize = 2;

const gridWidth = cols * cellSize + (cols - 1) * gapSize;
const gridHeight = rows * cellSize + (rows - 1) * gapSize;

gridContainer.style.maxWidth = `${gridWidth}px`;
gridContainer.style.maxHeight = `${gridHeight}px`;

gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

const minesCount = 50;
let openCells = 0;

function createField(rows, cols, minesCount) {
    // Initialize the field with no mines
    const field = Array.from({ length: rows }, () => Array(cols).fill(0));

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < minesCount) {
        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * cols);

        // Place a mine if the cell is not already a mine
        if (field[randomRow][randomCol] === 0) {
            field[randomRow][randomCol] = 1; // 1 represents a mine
            minesPlaced++;
        }
    }

    return field;
}

function countMinesAround(field, x, y) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    let mineCount = 0;

    for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX >= 0 && newX < field.length && newY >= 0 && newY < field[0].length) {
            if (field[newX][newY] === 1) {
                mineCount++;
            }
        }
    }

    return mineCount;
}

function checkWinCondition() {
    if ((rows * cols) - openCells === minesCount) {
        alert("Congratulations! You win!");
    }
}

function updateMinesLeft() {
    const minesRemaining = minesCount - openCells;
    minesCounter.textContent = `Mines Left: ${minesRemaining}`;
}

function openSafe(field, clickedX, clickedY) {
    const rows = field.length;
    const cols = field[0].length;

    // Base case: If the cell is out of bounds or already opened, return
    if (clickedX < 0 || clickedX >= rows || clickedY < 0 || clickedY >= cols) {
        return;
    }

    const cell = gridContainer.children[clickedX * cols + clickedY];

    // If the cell is already opened, return
    if (cell.classList.contains("opened")) {
        return;
    }

    // Mark the cell as opened
    cell.classList.add("opened");
    cell.style.backgroundColor = "#ddd"; // Change the background to indicate it's opened
    openCells++;

    // Count mines around the current cell
    const minesAround = countMinesAround(field, clickedX, clickedY);

    // If there are mines around, display the count and stop recursion
    if (minesAround > 0) {
        cell.textContent = minesAround;
        return;
    }

    // Recursively open neighboring cells
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (const [dx, dy] of directions) {
        openSafe(field, clickedX + dx, clickedY + dy);
    }
}

function drawField(field) {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            // Optionally, add a data attribute to indicate if the cell is a mine
            if (field[row][col] === 1) {
                cell.dataset.mine = "true";
            }

            gridContainer.appendChild(cell);

            cell.addEventListener("click", (event) => {
                if (cell.dataset.mine === "true") {
                    cell.style.backgroundColor = "red"; // Indicate a mine was clicked
                    alert("Game Over! You clicked on a mine.");
                } else {
                    openSafe(field, row, col);
                    updateMinesLeft();
                    checkWinCondition();
                    // alert(openCells);
                }
            });
        }
    }
}

const field = createField(rows, cols, minesCount);
drawField(field);

