const isQueenIntersect = (position, c_row, c_col) => {
    const savedPositions = Object.keys(position);

    if(savedPositions.length === 0) return false;

    for(let i = 0 ; i < savedPositions.length; i++) {
        const {row, col} = position[i];

        // intersection guard
        if(col === c_col) return true; // up and down
        if(row === c_row) return true; // left and right
        if(Math.abs(row - c_row) === Math.abs(col - c_col)) return true; // diagonal
    }

    return false;
};

const queen = (n, m) => {    
    const board = Array(n)
        .fill(0)
        .map(() => Array(m).fill(0));
    const position = {};
    const hasQueen =  search(board, position, 0);

    return {
        hasQueen,
        board
    }
};

const search = (board, position, rowNumber) => {
    if (rowNumber >= board.length) return true;

    const row = board[rowNumber];
    for (let col = 0; col < row.length; col++) {
        if (!isQueenIntersect(position, rowNumber, col)) {
            position[rowNumber] = {
                row: rowNumber,
                col
            };
            board[rowNumber][col] = 1;
            board[rowNumber][col - 1] && (board[rowNumber][col - 1] = 0);

            if (search(board, position, rowNumber + 1)) {
                return true;
            } else {
                // if we dont find a solution, we need to remove current location from the position array
                // because we are moving to the next column
                delete position[rowNumber];
                board[rowNumber][col] = 0;
            }
        }
    }

    return false;
};

const result = queen(9, 9);

for (let i = 0; i < result.board.length; i++) {
    console.log(result.board[i].join('   '));
}