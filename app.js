/* State */
const state = {};

const resetState = () => {
state.gameBoard = ['', '', '', '', '', '', '', '', ''];
state.players = ['🛸', '👽'];
state.currentPlayer;
state.gameOver = false;
state.winner = "";
state.gameBoardElem;
};


/* DOM Elements */
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('restart');
let bannerTwo = document.getElementById('bannerTwo');


/* Main Element */
const renderBoard = () => {
    resetState();
    bannerTwo.textContent = '☆ Tic - Tac - Toe ☆';
    resetButton.style.display = "none";
    startButton.style.display = "block";

    state.gameBoardElem = document.createElement('div');
    state.gameBoardElem.classList.add('game-board');
    return state.gameBoardElem;
    };


const makeSquareElem = (squareNumber) => {
    const squareElem = document.createElement('div');
    squareElem.classList.add('game-square');

    squareElem.addEventListener('click', (event) => {
        const { target } = event;
        target.textContent = state.currentPlayer;
        state.gameBoard[squareNumber] = state.currentPlayer;
        checkBoard();
        switchPlayer();
    }, 
        { once:true }
    );
    return squareElem;
};

const switchPlayer = () => {git
    if(state.currentPlayer === state.players[0]) {
        state.currentPlayer = state.players[1];
    } else {
        state.currentPlayer = state.players[0];
    }
}

const checkBoard = () => {
    const winningStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4 ,8],
    ];

    for (let winState of winningStates) {
        const [position1, position2, position3] = winState;

        if(
            state.gameBoard[position1] !== '' && 
            state.gameBoard[position1] === state.gameBoard[position2] && 
            state.gameBoard[position1] === state.gameBoard[position3]) 
            {
            completeGame(`${state.gameBoard[position1]} wins!`);
        }
    }

    const allSquaresUsed = state.gameBoard.every(square => square !== '');
    if(allSquaresUsed) {
        alert(`No more moves!`);
    }
};

const completeGame = (message) => {
        resetButton.style.display = "block";
        startButton.style.display = "none"
        bannerTwo.textContent = message; 
        state.gameBoardElem.style.display = "none";
        resetButton.addEventListener('click', () => {
            resetGame();
        })
}

const resetGame = () => {
    state.gameBoardElem = renderBoard();

    for (let square = 0; square < 9; square++) {
        state.gameBoardElem.appendChild(makeSquareElem(square));
    }

    state.currentPlayer = state.players[0];


    document.body.appendChild(state.gameBoardElem);
};

resetState();
resetGame();





