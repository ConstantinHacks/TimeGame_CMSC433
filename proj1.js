EASYDIFFICULTY = "EASY";
MEDIUMDIFFICULTY = "MEDIUM";
HARDDIFFICULTY = "HARD";

EASYCLOCKS = ["120.jpg","215.jpg","230.jpg","255.png","355.jpg","515.png","540.jpg","640.jpg,","745.jpg","1025.jpg"];
MEDIUMCLOCKS = ["250.png","325.png","615.png","720.png","835.png","940.png","1000.png","1035.png","1120.png","1205.png"]
HARDCLOCKS = ["219.png", "303.png", "317.png", "514.png", "657.png", "713.png", "833.png", "842.png", "909.png", "1152.png"]

NUMQUESTIONS = 10;

difficulties = [EASYDIFFICULTY,MEDIUMDIFFICULTY,HARDDIFFICULTY];


lifeTotal = 3;

var clockDiv = document.getElementById('clockDiv');

function Game(name,score){
  playerName = name;
  playerScore = score;
}

var games = [];

function startNewGame(){
  // var name = prompt("Enter your Full Name Please:", "");
  var difficultyIndex = 0;
  clockDiv.removeChild(document.getElementById('instructionImage'))


  runGame(difficultyIndex);
}

function runGame(difficultyIndex){

  var x = document.createElement("IMG");
  x.setAttribute("src", "EASY/120.jpg");
  x.setAttribute("width", "300");
  x.setAttribute("height", "220");
  console.log(clockDiv);
  clockDiv.appendChild(x);

  // while(lifeTotal != 0){
  //   var number = Math.floor((Math.random() * 10) + 1);
  //
  // }

}
