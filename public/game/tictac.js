document.addEventListener("DOMContentLoaded", () =>{
    const game = document.querySelector("game");
    const gameDropdownMenu = document.querySelector(".game-dropdown");

    // Show the dropdown menu when hovering over the "Games" link
    game.addEventListener("mouseenter", () => {
        gameDropdownMenu.style.display = "flex";
    });

    // Hide the dropdown menu when clicking outside of it
    game.addEventListener("mouseleave", function(event) {
        if (!game.contains(event.relatedTarget) && !gameDropdownMenu.contains(event.relatedTarget)) {
            gameDropdownMenu.style.display = "none";
        }
    });
});


////////////// Game Start ////////////////////////

// Initiate for popout msg

const startButton = document.getElementById("start-button");
const choicePopup = document.getElementById("choice-popup");
const xImage = document.getElementById("x-image");
const oImage = document.getElementById("o-image");
const cells = document.querySelectorAll("#cell");
const computerChoosingPopup = document.getElementById("computer-choosing-popup");
const resultPopup = document.getElementById("gameover");
const gameoverWin = document.querySelector('.gameover-winner');
const playAgainButton = document.getElementById("gameover-button");


let playerChoice = null; // To store the user's choice ('X' or 'O')
let cpuChoice = null; // to set cpu choice
let currentPlayer = null;
let rounds =1 ;
let winnerIndex = [];

// Prepare gameboard cells 
// Initialize the game board
// just define it here and give initial value but every time we will reset insideafter click on srat or restart button 

const gameBoard = ["", "", "", "", "", "", "", "", ""];
let userScore = 0;
let computerScore = 0;


///////////// Start with popout functions////////////////////

startButton.addEventListener("click", () => {
    choicePopup.style.display = "block";
    if(startButton.textContent == "Restart")
    {
        rounds =1;
        userScore = 0;
        computerScore = 0;
        console.log(startButton.textContent);
    }
    
});

// user choose option X

xImage.addEventListener("click", () => {
    playerChoice = 'X';
    cpuChoice = 'o';
    currentPlayer = 'X';
    choicePopup.style.display = "none";

    // Initialize the game board
    gameBoard.fill(''); //clear game board
    console.log(playerChoice,cpuChoice);

    // reset board from any images
    cells.forEach((cell) => {
        cell.style.backgroundImage = 'none'; // Clear the background image
        cell.style.backgroundColor = 'transparent';
    });

    // Display scores on the score display
    UpdateScore();
    document.querySelector('.result').innerHTML = 'Game is running!!!!!';

    // Change start button to restart
    startButton.innerHTML = "Restart";
    console.log(gameBoard);
    console.log(currentPlayer);
});

// user choose option O

oImage.addEventListener("click", () => {
    playerChoice = 'o';
    cpuChoice = 'X';
    currentPlayer = 'o';
    choicePopup.style.display = "none";

    // Initialize the game board
    gameBoard.fill(''); //clear game board
    console.log(playerChoice,cpuChoice);

    // reset board from any images
    cells.forEach((cell) => {
        cell.style.backgroundImage = 'none'; // Clear the background image
        cell.style.backgroundColor = 'transparent';
    });

    // Now you can start the game with 'O'
    
    UpdateScore();
    document.querySelector('.result').innerHTML = ' Game is running!!!!!';

    // Change start button to restart
    startButton.innerHTML = "Restart";
    
});

//////////////// check for win or loose //////////////

// Function to check for a win
function checkWin() 
{
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    
    for(let win=0 ; win < winCombinations.length ; win++)
    {   
        let [a,b,c] = winCombinations[win];
        console.log(winCombinations[win]);

        if(gameBoard[a] && gameBoard[a]===gameBoard[b] && gameBoard[a]===gameBoard[c])
        {
            // console.log(a,b,c);
            winnerIndex = [a,b,c];
            console.log(winnerIndex);
            return true;
        }
    }
    return false;
}

///////////////////////Coputer choose a cell /////////////

async function computerChooseCell() 
{
    emptyIndexes = [];
    gameBoard.forEach((value, index)=>{
        if(value == '')
        {
            emptyIndexes.push(index);
        }
    }
    );

    computerChoosingPopup.style.display = 'block'; /// to let user know that computer choose a cell
    await new Promise(resolve => // used to pause the execution of the function until the Promise 
                                //inside the setTimeout resolves after 0.5 second
        {
            setTimeout(() => {
                computerChoosingPopup.style.display = 'none';
                resolve();
            }, 500); // 500 milliseconds (1 seconds)
        })


    const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
       
    // Update the game board and display the computer's choice
    
    gameBoard[emptyIndexes[randomIndex]] = currentPlayer;
    console.log(gameBoard[emptyIndexes[randomIndex]]);
    cells[emptyIndexes[randomIndex]].style.backgroundImage = `URL("../img/${currentPlayer}.png")`;
    cells[emptyIndexes[randomIndex]].style.backgroundRepeat = 'no-repeat';
    cells[emptyIndexes[randomIndex]].style.backgroundPosition = 'center';

    // Check for a win or tie after the computer's move
    if (checkWin()) 
    {
        // Computer wins
        computerScore++;
        rounds++;
        checkGameOver();

        UpdateScore();
        document.querySelector('.result').innerHTML = "Computer Wins !!!";

        displayRoundResultPopup(rounds);
        resetGame();
    
    } 
    else if (!gameBoard.includes(''))
    {
        // The game is a tie
        rounds++;
        checkGameOver();

        document.querySelector('.round').innerHTML = `Round: ${rounds}`;
        document.querySelector('.result').innerHTML = 'It\'s a Tie!';

        displayRoundResultPopup(rounds);
        resetGame();
    }

    // Switch back to the user for the next move
    currentPlayer = playerChoice;
}


///////////////////////// Function of user choice ///////////////

function userChoice(index)
{
    if (gameBoard[index] === '') 
    {
        gameBoard[index] = currentPlayer;
        cells[index].style.backgroundImage = `URL("../img/${currentPlayer}.png")`;
        cells[index].style.backgroundRepeat = 'no-repeat';
        cells[index].style.backgroundPosition = 'center';

        // Check for a win or tie after the user's move
        if (checkWin()) 
        {
            // User wins
            userScore++;
            rounds++;
            checkGameOver();

            UpdateScore();
            document.querySelector('.result').innerHTML = "!!!!! You Win !!!!!" ;

            displayRoundResultPopup(rounds);
            resetGame();
        } 
        else if (!gameBoard.includes('')) 
        {
            // The game is a tie
            rounds++;
            checkGameOver();
            document.querySelector('.round').innerHTML = `Round: ${rounds}`;
            document.querySelector('.result').innerHTML = 'It\'s a tie!';

            displayRoundResultPopup(rounds);
            resetGame();
        } 
        else 
        {
            // Continue with the computer's move
            currentPlayer = cpuChoice;
            computerChooseCell();
        }
    }
    else
    {
        cells[index].style.cursor = 'not-allowed';
    }
}
////////////////// rounds popup msg ////////////////

function displayRoundResultPopup(round) 
{
    const roundResultPopup = document.getElementById("round-popup");
    roundResultPopup.innerHTML = document.querySelector('.result').innerHTML;
    roundResultPopup.style.display = "block";
    if(roundResultPopup.innerHTML == 'It\'s a tie!')
    {
        // cells[winnerIndex[0]].style.backgroundColor = "transparent";
        // cells[winnerIndex[1]].style.backgroundColor = "transparent";
        // cells[winnerIndex[2]].style.backgroundColor = "transparent";
    }
    else
    {
        cells[winnerIndex[0]].style.backgroundColor = "#ff8400";
        cells[winnerIndex[1]].style.backgroundColor = "#ff8400";
        cells[winnerIndex[2]].style.backgroundColor = "#ff8400";
    }


    // After a delay, hide the popup
    setTimeout(() => {
        roundResultPopup.style.display = "none";
        cells[winnerIndex[0]].style.backgroundColor = "transparent";
        cells[winnerIndex[1]].style.backgroundColor = "transparent";
        cells[winnerIndex[2]].style.backgroundColor = "transparent";
    }, 2000); // Adjust the delay time as needed

    console.log(roundResultPopup.style.display);

}


////////////// Reset game ///////////////

// Reset the game board and scores for a new round

function resetGame() {
    gameBoard.fill(''); // Clear the game board
    
    currentPlayer = playerChoice; // Set the current player to the user

    // After a delay, hide the popup
    setTimeout(() => {
        cells.forEach((cell) => 
        {
            cell.style.backgroundImage = 'none';
            cell.style.backgroundColor = 'transparent';
            cell.style.cursor = 'pointer'; // Make cells clickable
        });
        document.querySelector('.result').innerHTML = 'Game is running!!!!!';
    }, 1000); // Adjust the delay time as needed

    

}


/////////////////// Update score function /////////////////

function UpdateScore()
{
    document.querySelector('.round').innerHTML = `Round: ${rounds}`;
    document.querySelector('.game-status').innerHTML = `
    User Score&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Computer Score<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${userScore}
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${computerScore}`; 
    
}


//////////////// Function to check if the game is over ////////////////

function checkGameOver() {
    rounds -=1;
    console.log(rounds);
    if (rounds == 3) {
        if (userScore > computerScore) {
            displayResultPopup("You are the winner!");
            rounds -=1;
        } else if (userScore < computerScore) {
            displayResultPopup("Computer is the winner!");
            rounds -=1;
        } else {
            displayResultPopup("It's a tie!");
            rounds -=1;
        }
    }
    rounds ++;
}


//////////////////// Gameover popup  /////////////////


function displayResultPopup(resultText) {
    
    gameoverWin.textContent = resultText;
    resultPopup.style.display = "block";

    // Add a click event listener for the "Play Again" button
    
    playAgainButton.addEventListener("click", () => {
        resultPopup.style.display = "none";
        resetGame();
        rounds = 1;
        userScore = 0;
        computerScore = 0;
        UpdateScore();
    });
}


////////////////// Click listeners ////////////////

// Add click event listeners for game cells
cells.forEach((cell, index) => 
{
    cell.addEventListener('click', () => 
    {
        if(startButton.textContent == "Restart")
        {
            userChoice(index);
        }
        
    });
});



/////////////////// Back arrow setup ////////////////

const backButton = document.getElementById('back-image');
const popupBack = document.getElementById('back-arrow');
const yes = document.getElementById("yes");
const no = document.getElementById("no");

backButton.addEventListener('click',(e)=>{
    e.preventDefault();

    console.log(popupBack);

    // Show popup msg
    popupBack.style.display = "block";

    //handle yes button
    yes.addEventListener("click",()=>{
        window.location.href = backButton.getAttribute('href'); // Redirect to the link
    });

    //handle no button
    no.addEventListener("click",()=>{
        popupBack.style.display = 'none';
    });
});


