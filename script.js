let board = [...Array(4)].map(() => Array(4).fill(0));
let score = 0;

function startGame() {
    board = [...Array(4)].map(() => Array(4).fill(0));
    score = 0;
    generateTile();
    generateTile();
    updateBoard();
}

function generateTile() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) emptyCells.push({r: i, c: j});
        }
    }
    if (emptyCells.length > 0) {
        const {r, c} = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

function merge(tiles) {
    let newTiles = [];
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] === tiles[i + 1]) {
            newTiles.push(tiles[i] * 2);
            score += tiles[i] * 2;
            i++;
        } else {
            newTiles.push(tiles[i]);
        }
    }
    return newTiles;
}

function move(direction) {
    let moved = false;
    let oldBoard = JSON.stringify(board);
    
    // 這裡是你原本的移動邏輯 (保持不變)
    // ... (維持你原本的 switch(direction) 判斷)
    // 記得如果 board 有變，moved = true;

    if (moved) {
        generateTile();
        updateBoard();
    }
}

// *** 這才是最關鍵的顯示功能 ***
function updateBoard() {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = ''; // 清空畫面重新繪製
    document.getElementById('score').innerText = 'Score: ' + score;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (board[i][j] !== 0) {
                tile.innerText = board[i][j];
                tile.classList.add('tile-' + board[i][j]);
            }
            boardElement.appendChild(tile);
        }
    }
}

// 鍵盤監聽事件 (記得保留你的 switch)
document.addEventListener('keydown', function(event) {
    // 你的控制邏輯
});

startGame();
