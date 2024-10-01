const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const resetButton = document.getElementById('resetGame');
const twoPlayerButton = document.getElementById('twoPlayer');
const aiPlayerButton = document.getElementById('aiPlayer');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isAI = false;
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
twoPlayerButton.addEventListener('click', startTwoPlayerGame);
aiPlayerButton.addEventListener('click', startAIPlayerGame);
resetButton.addEventListener('click', resetGame);

// Functions
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    checkResult();
    
    if (isGameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateTurnMessage();
        
        if (isAI && currentPlayer === 'O') {
            setTimeout(() => aiMove(), 500);
        }
    }
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.innerText = `Player ${currentPlayer} Wins!`;
        isGameActive = false;
        resetButton.classList.remove('hidden');
        return;
    }

    if (!board.includes('')) {
        message.innerText = "It's a Tie!";
        isGameActive = false;
        resetButton.classList.remove('hidden');
    }
}

function aiMove() {
    const emptyCells = board.map((cell, index) => (cell === '' ? index : null)).filter(index => index !== null);
    
    if (emptyCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const aiCellIndex = emptyCells[randomIndex];

    board[aiCellIndex] = currentPlayer;
    cells[aiCellIndex].innerText = currentPlayer;

    checkResult();

    if (isGameActive) {
        currentPlayer = 'X'; // Switch back to the human player
        updateTurnMessage();
    }
}

function startTwoPlayerGame() {
    resetGame();
    isAI = false;
    currentPlayer = 'X'; // Start with player X
    message.innerText = "Player X's turn";
    resetButton.classList.add('hidden');
}

function startAIPlayerGame() {
    resetGame();
    isAI = true;
    currentPlayer = 'X'; // Start with player X
    message.innerText = "Player X's turn (You)";
    resetButton.classList.add('hidden');
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X'; // Reset to X
    cells.forEach(cell => {
        cell.innerText = '';
    });
    message.innerText = "Player X's turn"; // Reset turn message
    resetButton.classList.add('hidden');
}

function updateTurnMessage() {
    message.innerText = `Player ${currentPlayer}'s turn`;
}

