var buttonColors = ["red", "green", "yellow", "blue"];
var gamePattern = []
var userClickedPattern = [];
var level = 0;



function nextSequence(){
    
    userClickedPattern = [];
    level++
    $("#level-title").text("Level "+level)
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber]
    console.log(randomNumber);
    gamePattern.push(randomChosenColor)
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor)
    // return randomNumber;
}

// var randomColorStatic = randomChosenColor;

// gamePattern.push(randomChosenColor);


// console.log("random static " + randomColorStatic)



$("div[type='button']").click(function(e){
    var userChoseColor = e.target.id;
    userClickedPattern.push(userChoseColor);
    playSound(userChoseColor)
    animatePress(userChoseColor)

    checkAnswer(userClickedPattern.length-1)
    
})

$(document).keypress(function(e){
    if(level == 0 ){
        nextSequence();
    }
    $("#level-title").text("Level "+level)
    
})

function playSound(name){
    var colorNoise = new Audio("./sounds/" + name + ".mp3");
    colorNoise.play();

}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");

    setTimeout(function() { 
        $("#"+currentColor).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel){
    console.log("Game Pattern : " + gamePattern)
    console.log("User Pattern : " + userClickedPattern)
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success")
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
        
    } else  {
    
        console.log("wrong")
        $("body").addClass("game-over");
        setTimeout(function() { 
            $("body").removeClass("game-over");
            var wrongAnswer = new Audio("./sounds/wrong.mp3");
            wrongAnswer.play();
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver()        
        }, 200);

    }

}

function startOver(){
    level = 0;
    gamePattern = [];;
    
}