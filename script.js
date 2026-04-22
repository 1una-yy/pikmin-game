// Game Logic for Pikmin Game

let board = [...Array(4)].map(() => Array(4).fill(0)); // 4x4 Grid
let score = 0;

// Initialize Game
function startGame() {
    board = [...Array(4)].map(() => Array(4).fill(0));
    score = 0;
    generateTile();
    generateTile();
    updateBoard();
}

// Generate a new tile (2 or 4)
function generateTile() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) emptyCells.push({x: i, y: j});
        }
    }
    const {x, y} = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[x][y] = Math.random() < 0.9 ? 2 : 4;
}

// Move function
function move(direction) {
    let moved = false;
    switch(direction) {
        case 'up':
            for (let j = 0; j < 4; j++) {
                let column = [];
                for (let i = 0; i < 4; i++) {
                    if (board[i][j] !== 0) column.push(board[i][j]);
                }
                let newColumn = merge(column);
                for (let i = 0; i < 4; i++) {
                    if (i < newColumn.length) {
                        board[i][j] = newColumn[i];
                    } else {
                        board[i][j] = 0;
                    }
                }
                if (JSON.stringify(column) !== JSON.stringify(newColumn)) moved = true;
            }
            break;
        case 'down':
            for (let j = 0; j < 4; j++) {
                let column = [];
                for (let i = 3; i >= 0; i--) {
                    if (board[i][j] !== 0) column.push(board[i][j]);
                }
                let newColumn = merge(column);
                for (let i = 3; i >= 0; i--) {
                    if (i >= 4 - newColumn.length) {
                        board[i][j] = newColumn[3 - (4 - i)];
                    } else {
                        board[i][j] = 0;
                    }
                }
                if (JSON.stringify(column) !== JSON.stringify(newColumn)) moved = true;
            }
            break;
        case 'left':
            for (let i = 0; i < 4; i++) {
                let row = board[i].filter(val => val);
                let newRow = merge(row);
                board[i] = newRow.concat(Array(4 - newRow.length).fill(0));
                if (JSON.stringify(row) !== JSON.stringify(newRow)) moved = true;
            }
            break;
        case 'right':
            for (let i = 0; i < 4; i++) {
                let row = board[i].filter(val => val);
                let newRow = merge(row);
                board[i] = Array(4 - newRow.length).fill(0).concat(newRow);
                if (JSON.stringify(row) !== JSON.stringify(newRow)) moved = true;
            }
            break;
    }
    if (moved) {
        generateTile();
        checkGameState();
        updateBoard();
    }
}

// Merge tiles
function merge(tiles) {
    let newTiles = [];
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] === tiles[i + 1]) {
            newTiles.push(tiles[i] * 2);
            score += tiles[i] * 2;
            i++; // move to next
        } else {
            newTiles.push(tiles[i]);
        }
    }
    return newTiles;
}

// Check game state
function checkGameState() {
    if (board.flat().includes(2048)) {
        alert('You win!');
        startGame();
    }
    if (!board.flat().includes(0) && !canMove()) {
        alert('Game over!');
        startGame();
    }
}

// Check if moves are available
function canMove() {
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            if (board[i][j] === 0) return true;
            if (i < 3 && board[i][j] === board[i + 1][j]) return true;
            if (j < 3 && board[i][j] === board[i][j + 1]) return true;
        }
    }
    return false;
}

// Keyboard event handling
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            event.preventDefault();
            move('up');
            break;
        case 'ArrowDown':
            event.preventDefault();
            move('down');
            break;
        case 'ArrowLeft':
            event.preventDefault();
            move('left');
            break;
        case 'ArrowRight':
            event.preventDefault();
            move('right');
            break;
    }
});

// Update the game board UI
function updateBoard() {
    // Code to update the user interface
    // E.g., render the board and score on the webpage.
}

startGame();