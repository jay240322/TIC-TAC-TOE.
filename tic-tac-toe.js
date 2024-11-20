let boxes = document.querySelectorAll(".container");
let winbox = document.querySelector('.winner');
let reset = document.querySelector('.reset'); // Select the reset button

// Player 1 turn which is O
let turno = true; // true for O, false for X
let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let gameActive = true; // Track if the game is still active

boxes.forEach((container) => {
    container.addEventListener("click", () => {
        if (container.innerText === "" && gameActive) { 
            if (turno) { // Player O's turn
                container.innerText = "O";
                container.style.color = "blue"; // Set color for O
            } else { // Player X's turn
                container.innerText = "X";
                container.style.color = "red"; // Set color for X
            }
            turno = !turno; 
            if (checkWinner()) { // Check winner
                gameActive = false; // Stop the game if there's a winner
            } else {
                checkTie(); // Check for a tie
            }
        }
    });
});

// Function for a winner
let checkWinner = () => {
    for (let pattern of win) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if (val1 !== "" && val1 === val2 && val1 === val3) {
            winbox.innerText = `${val1} is winner!`;
            winbox.style.display = "block";
            winbox.style.color = val1 === "O" ? "blue" : "red"; // Set winner color
            return false;
        }
    }
    return false; 
};

// Check for a tie
let checkTie = () => {
    let isTie = [...boxes].every(container => container.innerText !== "");
    if (isTie) {
        winbox.innerText = "It's a tie!";
        winbox.style.color = "black";
        winbox.style.display = "block"; // Optional: Set color for tie message
        gameActive = false; // Stop the game if it's a tie
    }
};

// Reset function
let resetGame = () => {
    boxes.forEach((container) => {
        container.innerText = ""; // Clear the text
        container.style.color = ""; // Clear the color
    });
    winbox.innerText = ""; // Clear winner box
    winbox.style.display = "none";
    turno = true; 
    gameActive = true; // Reset game status
};

// Reset button
reset.addEventListener("click", resetGame);