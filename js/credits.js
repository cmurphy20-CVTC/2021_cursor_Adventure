
$(document).ready(function(){

    // Getting the score
    var highScore = parseInt(sessionStorage.getItem("score"));

    // Getting the difficulty
    var difficulty = sessionStorage.getItem("difficulty");

    // Calculating multipliers based off of difficulty selected
    if (difficulty == "easy") {
        highScore = highScore * 1.0;
    } else if (difficulty == "normal") {
        highScore = highScore * 1.2;
    } else if (difficulty == "hard") {
        highScore = highScore * 1.5;
    }

    // Showing the calculated score, rounded
    $(".score-text").text("Congrats! You got a high score of " + Math.round(highScore) + " points");
    $('.score-text').css("visibility", "visible");

    console.log("Credits Score: " + highScore);
    console.log("difficulty: " + difficulty);

});