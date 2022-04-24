let isDone = false;
function nextEmptyPosition(puzzle) {
    for (let row = 0; row < puzzle.length; row++) {
        for (let col = 0; col < puzzle[row].length; col++) {
            if (puzzle[row][col] === 0) {
                return {
                    row,
                    col,
                };
            }
        }
    }

    return {
        row: undefined,
        col: undefined,
    };
}

function isValid(puzzle, row, col, value) {
    for (let i = 0; i < puzzle.length; i++) {
        if (puzzle[row][i] === value) {
            return false;
        }

        if (puzzle[i][col] === value) {
            return false;
        }

        const rowIndex = Math.floor(row / 3) * 3 + Math.floor(i / 3);
        const colIndex = Math.floor(col / 3) * 3 + Math.floor(i % 3);

        if (puzzle[rowIndex][colIndex] === value) {
            return false;
        }
    }

    return true;
}

function solve(puzzle, rowNum, colNum) {
    if (rowNum === undefined || colNum === undefined) {
        isDone = true;
        return;
    }
    for (let i = 1; i <= 9; i++) {
        if (isValid(puzzle, rowNum, colNum, i)) {
            puzzle[rowNum][colNum] = i;
            const { row, col } = nextEmptyPosition(puzzle);
            solve(puzzle, row, col);
        }
    }

    if (isDone) return;
    puzzle[rowNum][colNum] = 0;
}

function sudoku(puzzle) {
    const { row, col } = nextEmptyPosition(puzzle);
    solve(puzzle, row, col);

    return [...puzzle];
}

const puzzle = [
    [0, 4, 6, 0, 0, 0, 0, 0, 0],
    [9, 0, 2, 0, 6, 0, 0, 0, 8],
    [0, 0, 8, 4, 0, 0, 2, 5, 0],
    [0, 0, 0, 8, 0, 0, 0, 7, 0],
    [5, 0, 0, 7, 0, 2, 0, 0, 3],
    [0, 1, 0, 0, 0, 6, 0, 0, 0],
    [0, 6, 4, 0, 0, 3, 9, 0, 0],
    [3, 0, 0, 0, 8, 0, 1, 0, 2],
    [0, 0, 0, 0, 0, 0, 7, 3, 0],
];

const result = sudoku(puzzle);

for (let i = 0; i < result.length; i++) {
    console.log(result[i].join("   "));
    console.log("===================================");
}
