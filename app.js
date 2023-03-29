// const state = {};

/* Player Variables */
let playerOne = document.getElementById("player-one");
let playerTwo = document.getElementById("player-two");
const spacePlayer = "🛸"
const alienPlayer = "👽"
let currentPlayer = spacePlayer;


/* Global Variables */
const board = document.getElementById("board");
const header = document.querySelector("#banner");
board.style.display = "none";
let cells = Array.from(document.getElementsByClassName("cell"));
let spaces = Array(9).fill(null);
const startButton = document.getElementById("input start-button");
const winner = [
    /* Row */
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    /* Column */
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    /* Across */
    [0, 4, 8],
    [2, 4, 6]
];

/* Functions */
    /* Starts Game */   
function renderGame() {
    board.style.display = "flex";
    header.innerText = "SAFE TRAVELS!"
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
};

function cellClicked(event) {
    const id = event.target.id;
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        event.target.innerText = currentPlayer;
        currentPlayer = currentPlayer == spacePlayer ? alienPlayer : spacePlayer;
    }
}


/* Event Listeners */
board.addEventListener("click", (event) => {
    if(!event.target.classList.contains("cell")) return;
});
