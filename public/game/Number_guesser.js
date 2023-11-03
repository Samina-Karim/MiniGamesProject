document.addEventListener("DOMContentLoaded", function() {
    const game = document.querySelector("game");
    const gameDropdownMenu = document.querySelector(".game-dropdown");

    // Show the dropdown menu when hovering over the "Games" link
    game.addEventListener("mouseenter", function() {
        gameDropdownMenu.style.display = "flex";
    });

    // Hide the dropdown menu when clicking outside of it
    game.addEventListener("mouseleave", function(event) {
        if (!game.contains(event.relatedTarget) && !gameDropdownMenu.contains(event.relatedTarget)) {
            gameDropdownMenu.style.display = "none";
        }
    });
});

let msg1 = document.getElementById('message1');
let msg2 = document.getElementById('message2');
let msg3 = document.getElementById('message3');

var answer = Math.floor(Math.random() * 50) + 1;
var no_of_guesses = 0;
var guessed_nums = [];

function play() {
    var user_guess = document.getElementById('guess').value;

    if (user_guess < 1 || user_guess > 50) {
        alert('Please choose another number between 1 to 50');
    } else {
        guessed_nums.push(user_guess);
        no_of_guesses += 1;

        if (user_guess < answer ) {
            msg1.textContent = 'Your guess is too cold';    
        }  else if (user_guess > answer ) {
            msg1.textContent = 'Your guess is too hot';
        }else if (user_guess == answer) {
            msg1.textContent = 'Congrats, you have won!';
            document.getElementById("my_btn").disabled = true;
        }

        msg2.textContent = 'No. of guesses: ' + no_of_guesses;
        msg3.textContent = 'Guessed numbers are: ' + guessed_nums;
    }
}
