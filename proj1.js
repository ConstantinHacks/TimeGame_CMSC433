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
var difficultyIndex;

function Game(name,score){
  playerName = name;
  playerScore = score;
}

var games = [];

function quit(){

}

function startNewGame(){
  // var name = prompt("Enter your Full Name Please:", "");
  difficultyIndex = 0;
  clockDiv.removeChild(document.getElementById('instructionImage'))

  showImage();
}

function next(){



  if(!document.getElementById('userInput').value){
    console.log("No Input");
    return false;
  }

  document.getElementById('userInput').value='';


  if(document.getElementById('clockImage')){
    clockDiv.removeChild(document.getElementById('clockImage'))
  }

  showImage();
}

function showImage(){

  var fileName;

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
