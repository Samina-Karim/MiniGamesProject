/********************* NAVBAR RELATED EVENTS *********************/
document.addEventListener("DOMContentLoaded", function () {
  const game = document.querySelector("game");
  const gameDropdownMenu = document.querySelector(".game-dropdown");

  // Show the dropdown menu when hovering over the "Games" link
  game.addEventListener("mouseenter", function () {
    gameDropdownMenu.style.display = "flex";
  });

  // Hide the dropdown menu when clicking outside of it
  game.addEventListener("mouseleave", function (event) {
    if (
      !game.contains(event.relatedTarget) &&
      !gameDropdownMenu.contains(event.relatedTarget)
    ) {
      gameDropdownMenu.style.display = "none";
    }
  });
});

/******************** HANGMAN SCRIPT STARTS HERE  ************************/
const secretWordList = [
  "APPLE",
  "BANANA",
  "ORANGE",
  "DATE",
  "KIWI",
  "GRAPE",
  "MANGO",
  "PEACH",
  "CHERRY",
  "GUAVE",
  "LEMON",
  "PAPAYA",
];
let secretWord = "";
let remainingGuesses = 6;
let correctGuesses = 0;
let wrongGuesses = [];
const wordDisplayContainer = "";
const wrongGuessesContainer = "";
const alphabetContainer = "";
const gameStatusContainer = "";
const message=document.getElementById("popMessage");

//*********************************************************************
// RESTARTING THE GAME
//*********************************************************************
document.getElementById("resetID").addEventListener("click", function () {
  // Reload the page
  location.reload();

  // Initialize game status
  initializeGame();
});

//*********************************************************************
// DRAWS HANGMAN DEPENDING ON THE NUMBER OF WRONG GUESSES MADE
//*********************************************************************
function drawHangman() {
  const imageElement = document.getElementById("hangmanID");
  console.log("Drawing Hangman on Stage ", remainingGuesses);
  switch (remainingGuesses) {
    case 0:
      imageElement.innerHTML = '<img src="../img/6.png" alt="Stage 6">';
      break;

    case 1:
      imageElement.innerHTML = '<img src="../img/5.png" alt="Stage 5">';
      break;

    case 2:
      imageElement.innerHTML = '<img src="../img/4.png" alt="Stage 4">';
      break;

    case 3:
      imageElement.innerHTML = '<img src="../img/3.png" alt="Stage 3">';
      break;
    case 4:
      imageElement.innerHTML = '<img src="../img/2.png" alt="Stage 2">';
      break;
    case 5:
      imageElement.innerHTML = '<img src="../img/1.png" alt="Stage 1">';
      break;
    default:
      imageElement.innerHTML = '<img src="../img/0.png" alt="Stage 0">';
      break;
  }
}

/********************************************************************/
// Function to pick a random word from the secretWordList
/********************************************************************/
function pickRandomWord() {
  return secretWordList[Math.floor(Math.random() * secretWordList.length)];
}
/********************************************************************/
/*               Function to initialize the game                    */
/********************************************************************/
function initializeGame() {
  // Initialize Variables

  secretWord = "";
  wrongGuesses = [];
  correctGuesses = 0;
  remainingGuesses = 6;

  // Get a Random Secret Word and Display underscores for each letter in the secret word
  const wordDisplayContainer = document.getElementById("wordDisplayID");
  secretWord = pickRandomWord();
  wordDisplayContainer.textContent = secretWord
    .split("")
    .map(() => "_")
    .join(" ");
  console.log("wordDisplay", wordDisplayContainer.textContent);

  // Resetting Status of Alphabets on Keyboard & Add Eventlistener to Each
  const alphabetContainer = document.getElementById("alphabetID");
  for (let i = 65; i <= 90; i++) {
    let letter = String.fromCharCode(i);
    let button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", handleGuess);
    alphabetContainer.appendChild(button);
  }

  const keyboardKeys = document.querySelectorAll(".alphabet");
  keyboardKeys.forEach((alphabet) => {
    alphabet.classList.remove("clicked");
  });

  // Resetting Wrong Guess Display
  wrongGuessesContainer = document.getElementById("wrongGuessesID");
  wrongGuessesContainer.textContent = "";

  gameStatusContainer = document.getElementById("gameStatusID");
  gameStatusContainer.textContent = "";
}
/**********************************************************************/
// This function handles user's guess through mouse clicks
/**********************************************************************/
function handleGuess(event) {
  if (remainingGuesses > 0 && correctGuesses < secretWord.length) {
    let clickedLetter = event.target.textContent;

      // If SecretWord includes the letter clicked then
      // Replace _ with the clicked letter in the display
    if (secretWord.includes(clickedLetter)) {
      const wordDisplayContainer = document.getElementById("wordDisplayID");
      let wordArray = wordDisplayContainer.textContent.split(" ");
      for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === clickedLetter) {
          wordArray[i] = clickedLetter;
          correctGuesses++;
        }
      }
      wordDisplayContainer.textContent = wordArray.join(" ");

      // Game Status Update 
      const wrongGuessesContainer = document.getElementById("wrongGuessesID");
    
      if (correctGuesses === secretWord.length) { // All alphabets guessed
        wrongGuessesContainer.textContent ="You guessed the secret word !";
        message.querySelector('p').textContent= "  YOU WON !!!";
        message.style.display="block";
        
        // const playAgain=message.querySelector('button');
        // playAgain.addEventListener("click",()=>{
        // location.reload();
        // initializeGame();
        // });

      }
    } else { // If wrong guess made
      remainingGuesses--;
      wrongGuesses.push(clickedLetter);
      const wrongGuessesContainer = document.getElementById("wrongGuessesID");
      wrongGuessesContainer.textContent = `Wrong Guesses: ${wrongGuesses.join(", ")}`;
      if (remainingGuesses === 0) { //If no more guesses allowed
        wrongGuessesContainer.textContent = `The secret word was ${secretWord}`;
        message.querySelector('p').textContent= "YOU LOST !!!";
        message.style.display="block";
        const playAgain=message.querySelector('button');
        
        // playAgain.addEventListener("click",()=>{
        //   location.reload();
        // //Initialize game status
        //   initializeGame();
        // });
      
      }

    }

    // Disable clicked button
    event.target.disabled = true;
    event.target.style.cursor="not-allowed";
    event.target.style.backgroundColor= "#b9b9b9";
   

  }
  drawHangman();
}

/*****************************************************************
//  Initiazlize Game 
/*****************************************************************/
initializeGame();
