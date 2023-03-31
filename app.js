/* State */
const state = {};

const resetState = () => {
state.gameBoard = ['', '', '', '', '', '', '', '', ''];
state.players = ['🛸', '👽'];
state.currentPlayer;
state.winner = "";
state.gameBoardElem;
};


/* DOM Elements */
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('restart');
let bannerTwo = document.getElementById('bannerTwo');
let gameBoardElem = document.createElement('div');


/* Main Element */
const renderBoard = () => {
    while (gameBoardElem.firstChild) {
        gameBoardElem.removeChild(gameBoardElem.firstChild);
    };
    // resetState();
    resetButton.style.display = "none";
    startButton.style.display = "block";
    
    gameBoardElem.classList.add('game-board');
    // return gameBoardElem;

    // state.currentplayer.value ===  
    };


const makeSquareElem = (squareNumber) => {
    const squareElem = document.createElement('div');
    squareElem.classList.add('game-square');

    squareElem.addEventListener('click', (event) => {
        const { target } = event;
        target.textContent = state.currentPlayer;
        state.gameBoard[squareNumber] = state.currentPlayer;
        
        checkBoard();
        if(!state.winner) {
          switchPlayer();  
        }
        
        
    }, 
        { once:true }
    );
    return squareElem;
};

const switchPlayer = () => {
    // state.currentplayer = getPlayerIdx(0, 1);
    // console.log(state.currentPlayer);
    if(state.currentPlayer === state.players[0]) {
        state.currentPlayer = state.players[1];
    } else {
        state.currentPlayer = state.players[0];
    }
    bannerTwo.textContent = `${state.currentPlayer}'s Turn`;
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
            state.winner = state.gameBoard[position1];
            completeGame(`${state.gameBoard[position1]} wins!`);
        }
    }

    const allSquaresUsed = state.gameBoard.every(square => square !== '');
    if(allSquaresUsed) {
        alert(`No more moves!`);
        resetGame();
    }
};

const completeGame = (message) => {
        resetButton.style.display = "block";
        startButton.style.display = "none"
        bannerTwo.textContent = message; 
        resetButton.addEventListener('click', () => {
            resetGame();
            bannerTwo.textContent = "☆ Tic - Tac - Toe ☆"
        })
}

const resetGame = () => {
    resetState();
    renderBoard();

    for (let square = 0; square < 9; square++) {
        gameBoardElem.appendChild(makeSquareElem(square));
    }


    const getPlayerIdx = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
        // console.log(Math.floor(Math.random() * (max - min + 1) + min));
    };
    

    let i = getPlayerIdx(0, 1);
    state.currentPlayer = state.players[i];
    document.body.appendChild(gameBoardElem);
};

/* Event Listener */
startButton.addEventListener('click', () => {
    bannerTwo.textContent = `${state.currentPlayer}'s Turn`;
});

resetState();
resetGame();





