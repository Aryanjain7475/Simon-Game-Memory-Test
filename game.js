var gamePattern = [];

var buttonColours = ["red","blue","green","yellow"];

var userClickedPattern = [];

var started = false ;

var level = 0 ;

var score = 0 ;

var highScore = 0;

window.onload = function(){
  let scoreFromBrowser = localStorage.getItem("highScore");
  if (scoreFromBrowser != undefined) {
    highScore = scoreFromBrowser ;
  }

}

$(document).keypress(function(){

  if (!started){
    $("#level-title").text("Level "+ level);
    $("#score").text("Score : "+ score);
    nextSequence();
    started = true;
  }

});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Sucess");

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else {
    console.log("Wrong");

    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over ! Press Any Key To Restart");

    startOver();
  }
}

$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){

  var audio = new Audio ("sounds/"+name+".mp3");
  audio.play();

};

function animatePress(currentColour){

  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);

}

function nextSequence(){

  userClickedPattern = [];
  level++;
  if (level===1){
    score = 0 ;
  }else {
    score +=10 ;
  }

  if ( score > highScore ){
    highScore = score ;
  }
  localStorage.setItem("highScore",highScore);

  $("#level-title").text("Level "+level);
  $("#highScore").text("High Score :  "+highScore);
  $("#score").text("Score      :  "+score);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function startOver(){
  level=0;
  score=0;
  gamePattern=[];
  started=false;
}
