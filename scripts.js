const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
    "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const RestartButton = document.querySelector(
    "[data-restart-button]"
);

let isCircleTurn;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const StartGame = () => {
    isCircleTurn = false;
    
    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleclick);
        cell.addEventListener("click", handleclick, {once: true});
    }
    
    setboardHoverClass();
    winningMessage.classList.remove("show-winning-messsage");
};

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = "Deu velha!";
    } else {
        winningMessageTextElement.innerText = isCircleTurn 
        ? "Vitória do Bola!"
        : "Vitória do X!";
    }
    
    winningMessage.classList.add("show-winning-messsage");
};

const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [...cellElements].every(cell => {
       return cell.classList.contains("x") || cell.classList.contains("circle");
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setboardHoverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setboardHoverClass();
};

const handleclick = (e) =>  { 
    // colocar a marca (x ou circulo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';
   
    placeMark(cell, classToAdd);
    
    // verificar por vitoria
    const isWin = checkForWin(classToAdd);
    
    // verificar por empate
    const isDraw = checkForDraw();
    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true)
    } else {
        //mudar símbolo
        swapTurns();
    }
};

StartGame();

RestartButton.addEventListener("click", StartGame);
