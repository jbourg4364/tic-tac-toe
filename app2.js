const state = {};

const resetState = () => {
  state.board = [
    { value: 'car', isTurned: false },
    { value: 'bus', isTurned: false },
    { value: 'bat', isTurned: false },
    { value: 'cat', isTurned: false },
    { value: 'dog', isTurned: false },
    { value: 'hat', isTurned: false },
    { value: 'car', isTurned: false },
    { value: 'bus', isTurned: false },
    { value: 'bat', isTurned: false },
    { value: 'cat', isTurned: false },
    { value: 'dog', isTurned: false },
    { value: 'hat', isTurned: false },
  ];
  state.currentPlayerIdx = 0;
  state.getCurrentPlayer = () => state.players[state.currentPlayerIdx];
  state.players = ['', ''];
  state.score = [0, 0];
  state.lastTurnedIdx = -1;
};

/***********DOM Selectors***********/
const body = document.querySelector('body');
const board = document.createElement('main');
const scoreElem = document.createElement('p');

// Title element below
const titleH1 = document.createElement('h1');
titleH1.id = 'title';
titleH1.innerText = 'This is the Game of Memory';

body.appendChild(titleH1);

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//Main element below
const renderBoard = () => {
  removeChildNodes(board);

  board.id = 'board';
  for (let i = 0; i < state.board.length; i++) {
    const card = state.board[i];
    const cellElem = document.createElement('div');
    cellElem.className = 'cell'; // adds className of cell to each element.
    cellElem.dataset.index = i; // adds an index to check against state.

    if (card.isTurned) cellElem.innerText = card.value;
    if (card.owner) cellElem.classList.add('owner');
    board.appendChild(cellElem);
  }

  body.appendChild(board);
};

// Player element below
const playerElem = document.createElement('p');

const renderPlayer = () => {
  playerElem.id = 'playerNameElem';
  let playerElemHTML;
  if (!state.players[0] || !state.players[1]) {
    playerElemHTML = `<input type="text" name="player1" placeholder="Enter Player 1 Name" />
    <input type="text" name="player2" placeholder="Enter Player 2 Name" />
    <button id="start">Start Game</button>`;
  } else if (state.winner) {
    playerElemHTML = `<h1>${state.winner} has won!</h1>
    <button id="reset">Reset Game</button>`;
  } else {
    playerElemHTML = `It's currently ${state.getCurrentPlayer()}'s turn.`;
  }

  playerElem.innerHTML = playerElemHTML;

  body.appendChild(playerElem);
};

const renderScore = () => {
  scoreElem.innerHTML = `<div>${state.players[0]} : ${state.score[0]}</div>
  <div>${state.players[1]} : ${state.score[1]}</div>`;
  body.appendChild(scoreElem);
};

function render() {
  // renderScore();
  renderBoard();
  renderPlayer();
  console.log('state is: ', state);
}

function checkBoard() {
  console.log('the board was checked!');
  renderScore();
  const cardsWithoutOwners = state.board.filter((card) => !card.owner);
  if (cardsWithoutOwners.length) return;
  state.winner = getWinner();
}

function getWinner() {
  let player1Score = state.score[0];
  let player2Score = state.score[1];
  let winnerIdx = player1Score > player2Score ? 0 : 1;
  return state.players[winnerIdx];
}

const takeTurn = (index) => {
  const card = state.board[index];
  if (card.isTurned) return;
  card.isTurned = true;
  console.log(state.lastTurnedIdx);
  let lastTurnedCard = state.board[state.lastTurnedIdx] || {};

  if (lastTurnedCard.value === card.value) {
    console.log('they are the same increase score!');
    state.score[state.currentPlayerIdx] += 1; //increases Score
    state.lastTurnedIdx = -1;
    lastTurnedCard.owner = state.getCurrentPlayer();
    card.owner = state.getCurrentPlayer();
    setTimeout(() => {
      lastTurnedCard.isTurned = false;
      card.isTurned = false;
      render();
    }, 1000);
    // How will we know that a player has the cards in hand
  } else if (lastTurnedCard.isTurned) {
    console.log("Whoops you didn't find a match...");
    setTimeout(() => {
      lastTurnedCard.isTurned = false;
      card.isTurned = false;
      state.lastTurnedIdx = -1;
      state.currentPlayerIdx = Math.abs(state.currentPlayerIdx - 1);
      render();
    }, 1000);
  } else {
    state.lastTurnedIdx = index;
    console.log(state.lastTurnedIdx);
  }
  checkBoard();
  console.log(card);
};

/***********Event Listeners***********/
board.addEventListener('click', (event) => {
  if (!event.target.classList.contains('cell')) return;
  if (!state.players[0] || !state.players[1]) return;
  // console.log(event.target.dataset);
  let cellIdx = event.target.dataset.index;
  takeTurn(cellIdx);

  render();
});

playerElem.addEventListener('click', (event) => {
  if (event.target.id === 'start') {
    const player1Input = document.querySelector('input[name="player1"]');
    state.players[0] = player1Input.value;

    const player2Input = document.querySelector('input[name="player2"]');
    state.players[1] = player2Input.value;
    console.log('in the if and click!');
    renderScore();
    render();
  }
  if (event.target.id === 'reset') {
    resetState();
    render();
  }
});

resetState();
render();
