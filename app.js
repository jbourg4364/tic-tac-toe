let playerOne = document.getElementById("player-one");


/* Global Variables */
const board = document.getElementById("board");
const cell = document.getElementsByClassName("cell");
const cellArr = [].slice.call(cell);
cellArr.forEach((cell) => {
    cell.addEventListener('click', () => {
        cell.innerText = "🛸";
    })
});
