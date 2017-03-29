EASYDIFFICULTY = 0;
MEDIUMDIFFICULTY = 1;
HARDDIFFICULTY = 2;

FILE_EXTENSION = ".png"

EASYCLOCKS = ["120.png","215.png","230.png","255.png","355.png","515.png","540.png","640.png","745.png","1025.png"];
MEDIUMCLOCKS = ["250.png","325.png","615.png","720.png","835.png","940.png","1000.png","1035.png","1120.png","1205.png"]
HARDCLOCKS = ["219.png", "303.png", "317.png", "514.png", "657.png", "713.png", "833.png", "842.png", "909.png", "1152.png"]

QUESTIONSPERROUND = 10;
TOTALQUESTIONS = 30;


var lifeTotal = 3;
var clockDiv = document.getElementById('clockDiv');
var score = 0;
var playerName;
var fileName;
var difficultyIndex = 0;
var questionsAnswered = 0;

function Game(name,score){
  playerName = name;
  playerScore = score;
}

var games = [];

//BLOCK ENTER KEY
function stopRKey(evt) {
  var evt = (evt) ? evt : ((event) ? event : null);
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
}

document.onkeypress = stopRKey;


function quit(){
  
}

function startNewGame(){
  // playerName= prompt("Enter your Full Name Please:", "");
  // document.getElementById("nameLabel").type = playerName;

  document.getElementById("nextButton").type = "button";
  difficultyIndex = 0;
  clockDiv.removeChild(document.getElementById('instructionImage'))

  questionsAnswered++;

  showImage();
}

function next(){

  var userInput = document.getElementById('userInput').value;

  if(!userInput){
    alert("Please make sure you input your guess.")
    console.log("No Input");
    return false;
  }

  if(userInput.search(":") == -1){
    alert("You're Missing a Colon. Please make sure your input looks like this 2:30.")
    console.log("No Colon");
    return false;
  }

  checkInput(userInput,fileName);

  document.getElementById('userInput').value='';

  if(document.getElementById('clockImage')){
    clockDiv.removeChild(document.getElementById('clockImage'))
  }
  console.log("Questions Answerd: " + questionsAnswered);
  questionsAnswered++;

  if(questionsAnswered == 10){
    //CHANGE TO MEDIUM
  } else if(questionsAnswered == 20){
    //CHANGE TO HARD
  } else if(questionsAnswered == 30){
    //FINISH
    saveGame();
  } else {
    showImage();
  }

}

function showImage(){

  var randomNumber = Math.floor(Math.random() * 10);

  if (difficultyIndex == EASYDIFFICULTY){
    fileName = "EASY/" + EASYCLOCKS[randomNumber];
  } else if (difficultyIndex == MEDIUMDIFFICULTY) {
    fileName = "MEDIUM/" + MEDIUMCLOCKS[randomNumber];
  } else {
    fileName = "HARD/" +HARDCLOCKS[randomNumber];
  }

  var image = document.createElement("IMG");
  image.setAttribute("src", fileName);
  image.setAttribute("id", "clockImage");
  image.setAttribute("width", "300");
  image.setAttribute("height", "220");

  clockDiv.appendChild(image);

  return false;
}

function checkInput(input,expected){
  var formattedInput = input.replace(':',"");

  console.log(formattedInput);
  console.log(expected);

  if(expected.search(formattedInput) != -1){
    rightAnswer();
  } else {
    wrongAnswer();
  }

}


function wrongAnswer(){
  console.log("incorrect");
  lifeTotal--;

  if(lifeTotal == 2){

  } else if(lifeTotal == 1) {

  } else {
    saveGame();
  }
}

function rightAnswer(){
  console.log("correct");
  if (difficultyIndex == EASYDIFFICULTY){
    score += 1000;
  } else if (difficultyIndex == MEDIUMDIFFICULTY) {
    score += 2000;
  } else {
    score += 5000;
  }

  document.getElementById('scoreLabel').innerHTML = "Score: " + score;

}

function saveGame(){

}

startNewGame();
