var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var progress = true;
$(document).keydown(function(){
    if (!started) {
        $("h1").text("Level "+level);
        newSequence();
        started= true;
    }

})

function newSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    
    var randomNumber = Math.floor(4*Math.random());
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
   
}

$(".btn").click(function(event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
    animatePress(event.target.id);
    playSound(event.target.id);
})

function animatePress(color) {
    $("#"+color).addClass("pressed");
    setTimeout(() => {$("#"+color).removeClass("pressed")
     
    }, 100);
}

function handler(event) {
    
}

function playSound(color){
    var audio = new Audio('sounds/'+color+'.mp3');
    audio.play();
}

function checkAnswer(a) {
        if (gamePattern[a] == userClickedPattern[a]){
            console.log("right");
        }
        else{
            console.log("wrong");
            progress = false;
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over")
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver()
        }
        if (a == gamePattern.length-1 && progress) {
            console.log("right");
            setTimeout(() => {
                newSequence()
            }, 1000);
        }    
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    setTimeout(() => {
        $("h1").text("Press A Key to Start");
    }, 3000);
}
