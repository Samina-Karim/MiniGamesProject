//Rock,paper, scissors
//For project Nov2, 2023
//getElementsById()
//getElementsByClassName()
//querySelector("p")
//  selects a tag; in this case will go for first p tag

//querySelectorAll()
//  selects all within that tag

//assign it to a variable & use document.
//const para = document.querySelector("p")
//place.addEventListener("click", function());
//document.getElementById("myspan").textContent="newtext"; change text

//Append to a paragraph
// document.getElementById("test").textContent+="Testing";

//could also set z factor to hide images behind background and create intro transition

////NON GAME FUNCTIONS///////
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


///FUNCTIONS////////////////////////////////////////////
// A function that determines the computer's choice randomly (rock paper or scissors)
function rando(){ 
    const any = Math.floor(Math.random()*3); //rando will be 0, 1, or 2
    
    //use switch cases
    switch(any){
        case 0:   
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}


// function that displays the computer and users choices as images in the playing field
function field_image(weapon_choice, player){
    var target_section = player=="userside"?document.getElementById("user_choice"):document.getElementById("comp_choice"); //will image append to user or computer side

    var play_container = document.createElement("div");
    play_container.style.textAlign = "center"; // Center-align the content

    //set playername
    var player_name = player=="userside"? "You":"Computer";
    var insert_name = document.createElement("p");
    insert_name.textContent = player_name;

    //create image element
    var display_choice = document.createElement("img");
    if (weapon_choice =="rock"){
        display_choice.setAttribute("src", "../img/rock.png");
    }
    else if (weapon_choice == "paper"){
        display_choice.setAttribute("src", "../img/paper.png");
    }
    else if (weapon_choice == "scissors"){
        display_choice.setAttribute("src", "../img/scissors.png");
    }

    //set size of image
    display_choice.setAttribute("width", "200px", "height", "200px");

    play_container.appendChild(insert_name);
    play_container.appendChild(display_choice);

    //append image to the element to field display section
    target_section.innerHTML= ""; //make sure inside is blank

    var status_change = document.getElementById("status");
     //if computer take a while to display
     if (player =="compside"){
        status_change.innerText= "Computer's Turn";

        setTimeout(function(){
            target_section.appendChild(play_container);
        }, 2000);
    }
    else{
        //status_change.innerText= "Your Turn";
        target_section.appendChild(play_container);
        //status_change.innerText= "Your Turn";
    }
    //target_section.appendChild(play_container);
    
}


// A function that determines who won the current round and updates score appropriately
function compare(user, comp){
    console.log(`You chose: ${user}, Computer chose: ${comp}`);

    let win_c; //store result in here
    var outcome_m;//store output message

    if ((user=="rock" && comp =="scissors") 
    || (user=="scissors" && comp=="paper")
    ||(user=="paper" &&comp=="rock")){ //Winning case
        outcome_m = "You won this round!"
        win_c = "user";
    } 
    else if (user == comp){ //tie
        outcome_m = "You got a tie this round!"
        
    }
    else{
        outcome_m = "You lost this round!"
        win_c = "comp";
    }

    setTimeout(function(){
        document.getElementById("outcome").style.backgroundColor=  "rgb(139, 246, 31)";
        document.getElementById("outcome").textContent =outcome_m
    }, 3000);

    var ur_status = document.getElementById("status");
    setTimeout(function(){
        ur_status.innerText= "Your Turn";
    },3000);

    return win_c; 
}

// A function that prints out the round score
function roundscore(Uscore, Cscore,ro){
    document.getElementById("D_Round").textContent=`ROUND ${ro} `;
    document.getElementById("D_Userscore").textContent=`You: ${Uscore} `
    document.getElementById("D_Cscore").textContent=`Computer: ${Cscore} `
    ro++;
    return ro;
}

function show_popup(){
    setTimeout(function (){
        document.getElementById("pop_over").style.display = "flex";
    }, 5000);
}

function hide_popup(){
    document.getElementById("pop_over").style.display = "none";
}

// A function that prints out the final score
function final(U_score, C_score){

    document.getElementById("pop_over").style.backgroundImage="url('../img/win-bg.gif')";
    document.getElementById("pop_over").style.backgroundSize="cover";

    if (U_score>C_score){
        document.getElementById("pop_m").textContent = "Congrats, you won! We've locked onto your location. Don't worry, we won't release the bees... yet";
        
        //document.getElementById("outcome").textContent= "Winner!";
    }
    else if (U_score<C_score){
        document.getElementById("pop_m").textContent = "Cong-- oh wait, you lost...LOL";
        //document.getElementById("outcome").textContent= "Loser!";
    }
    else{
        //document.getElementById("outcome").textContent= "Draw!";
        document.getElementById("pop_m").textContent = "A tie!?! Guess you could settle this by doing rock, paper, scissors...";
    }

    //update final score into score area
    document.getElementById("D_Round").textContent=`FINAL SCORE`;
    document.getElementById("D_Userscore").textContent=`You: ${Uscore} `
    document.getElementById("D_Cscore").textContent=`Computer: ${Cscore}`
}

function restart(){ 
    //clear scoreboard
    document.getElementById("D_Round").textContent=`ROUND ${1} `;
    document.getElementById("D_Userscore").textContent=`You: `;
    document.getElementById("D_Cscore").textContent=`Computer: `;
    document.getElementById("outcome").style.backgroundColor = "";//clear background color
    var reset_status = document.getElementById("status");
    reset_status.innerText= "CHOOSE YOUR WEAPON";
}


function clear(){ //clears images in playingfield
    document.getElementById("user_choice").textContent=``;
    document.getElementById("outcome").textContent=``;
    document.getElementById("outcome").style.backgroundColor="";//clear background color
    document.getElementById("comp_choice").textContent=``;
}




//////Click Events/////////////////////////////
const started = document.querySelectorAll(".clweapon"); //selecting all elements in clweapon class, stores all elements in started

////VARIABLES//////////////////////////
var uselected; //store value of button in selected
var play = true; //keep playing
let compchoice; //computer choice
let result;
let rounds = 1;
let uscore = 0; //user score
let cscore = 0;//computer score

/////ACTUAL GAME IN ACTION////////////////////
// //loop through each weapon for button inside class section clweapon
started.forEach(function(elem){
    const but = elem.querySelector("button"); //goes for each button tag
    but.addEventListener("click", function(){
        uselected =but.value;//store value of button

        if (uselected!="restart" && rounds<=6){//if they did not hit restart
            clear();
            if (uselected === "rock"){
                field_image(uselected,"userside");
            }
            else if (uselected === "paper"){
                field_image(uselected,"userside");
            }
            else if (uselected ==="scissors"){
                field_image(uselected,"userside");
            }

            
            compchoice = rando(); //get computer choice
            field_image(compchoice,"compside");
    
            result =compare(uselected, compchoice);

            if (result == "user"){
                uscore++;
            }
            else if (result =="comp"){
                cscore++;
            }
            rounds = roundscore(uscore, cscore, rounds);
            if (rounds ===6){ //check if rounds = 5 then end
                //show popup
                show_popup();

                final(uscore, cscore); //print final score
                //ask if user wants to play again
                //alert("Thanks for playing, if you want to play again,please hit the restart button");
            } 

        }

        else if (uselected ==="restart"){//restart the game
            rounds = 1;
            uscore = 0;
            cscore = 0;
            restart();//just replaces scoreboard text
            clear(); //clears images in playingfield

        }
        
    })
})

// //Closing the popup
const pop_click = document.getElementById("reset_pop"); //gets id of reset button in popup
pop_click.addEventListener("click", function(){

    hide_popup();
    //need to clear everything
    restart();//just replaces scoreboard text
    clear();
    rounds = 1;
    uscore = 0;
    cscore = 0;

});


const back_b = document.getElementById("back_again");
//back_again.addEventListener("click, function"())



