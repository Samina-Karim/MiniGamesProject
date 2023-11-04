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


// Get a reference to the select element
const selectElement = document.getElementById("select");
const options = document.getElementsByClassName("options");

selectElement.addEventListener("mouseenter", function () {
    options[3].style.backgroundColor= "black";
    console.log(options[3].style);
    
  });


///////// Form submit ////////////////
//////// including validation //////////

const form = document.getElementById('myform');
const nameInput = document.getElementById('name-box');
const emailInput = document.getElementById('email-box');
const thanksmsg = document.getElementById('thankmsg');

////////// Name validation ////////////
nameInput.addEventListener("input",()=>
{
    const pattern = /^[A-Za-z]+$/ ;
    console.log("Name validation");

    if(!pattern.test(nameInput.value))
    {
        nameInput.setCustomValidity("Please enter a valid name with only alphabets and spaces.");
        console.log("Unvalid name");
    }
    else
    {
        // Capitalize the first letter of the name
        const name = nameInput.value;
        nameInput.value = name.charAt(0).toUpperCase() + name.slice(1);
        nameInput.setCustomValidity("");
        console.log("Valid name");
    }
});

////////// Email validation ////////////
emailInput.addEventListener("input",()=>
{
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log("Email validation");

    if(!emailPattern.test(emailInput.value))
    {
        emailInput.setCustomValidity("Please enter a valid Email format!!");
        console.log("Unvalid email");
    }
    else
    {
        emailInput.setCustomValidity("");
        console.log("Valid email");
    }
});

form.addEventListener("submit",function(e)
{
    e.preventDefault();

    // Check if both name and email are entered

    if (nameInput.value!='' && emailInput.value!='') 
    {
        console.log("inside form")
        thanksmsg.style.display = "block";
        thanksmsg.querySelector('p').textContent = `Thank you ${nameInput.value}, your request has been received.`;

        // Set a timeout to hide the message after 3 seconds (3000 milliseconds)
        setTimeout(function() {
            thanksmsg.style.display = "none";
        }, 3000);
    }
    else
    {
        console.log('name and eamail missing');
        if(nameInput.value=='')
        {
            thanksmsg.style.display = "block";
            thanksmsg.querySelector('p').textContent = `Please fill your name before submitting the form`;
            // Set a timeout to hide the message after 1 seconds (1000 milliseconds)
            setTimeout(function() {
                thanksmsg.style.display = "none";
            }, 1500);

        }
        else
        {
            thanksmsg.style.display = "block";
            thanksmsg.querySelector('p').textContent = `Please fill your email before submitting the form`;
            // Set a timeout to hide the message after 1 seconds (1000 milliseconds)
            setTimeout(function() {
                thanksmsg.style.display = "none";
            }, 1500);
            
        }
        
    }
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




