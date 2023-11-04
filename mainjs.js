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

