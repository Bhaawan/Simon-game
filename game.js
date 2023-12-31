// alert("hello");

var userClickedPattern=[];
var gamePattern=[];
var buttonColors=["red", "blue", "green", "yellow"];
var level=0, started=false;

$(document).keypress(function () { 
    if(started==false)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(event){
    var userChosenColour=event.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
        console.log("wrong");
    }
}

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}

function nextSequence()
{
    userClickedPattern=[];

    level++;
    $("#level-title").text("Level "+level);

    var randnum=Math.random();
    randnum=Math.floor(randnum*4);
    var randomChosenColour=buttonColors[randnum];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
}


function playSound(name)
{
    var audio=new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("."+currentColour).addClass("pressed");
    
    setTimeout(function(){$("."+currentColour).removeClass("pressed");}, 100);
}



