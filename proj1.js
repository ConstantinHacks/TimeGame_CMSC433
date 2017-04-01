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
var playerScore = 0;
var playerName;
var fileName;
var difficultyIndex = 0;
var questionsAnswered = 0;

class Game {
  constructor(playerName,playerScore){
    this.playerName = playerName;
    this.playerScore = playerScore;
  }

}


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
  playerName= prompt("Enter your Full Name Please:", "");
  document.getElementById("nameLabel").innerHTML = "Player: " +playerName;

  document.getElementById("nextButton").type = "button";
  difficultyIndex = 0;
  clockDiv.removeChild(document.getElementById('instructionImage'))

  document.getElementById('scoreLabel').innerHTML = "Score: 0";


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

  questionsAnswered++;

  console.log("Questions Answerd: " + questionsAnswered);

  if(questionsAnswered == 30){
    gameOver(true);
  } else if(questionsAnswered % 10 == 0){
    difficultyIndex++;
    document.getElementById('lifeImage').setAttribute("src","./3heart.png");
    lifeTotal = 3;
  }

  showImage();


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

  console.log(fileName);

  return false;
}

function checkInput(input,fileName){
  var formattedInput = input.replace(':',"");
  var time = fileName.replace(/[^0-9]/g,'');

  if(formattedInput == time){
    rightAnswer();
  } else {
    wrongAnswer();
  }

}

function wrongAnswer(){
  console.log("incorrect");

  var audio = new Audio('MP3s/wrong.mp3');
  audio.play();

  lifeTotal--;

  if(lifeTotal == 2){
    document.getElementById('lifeImage').setAttribute("src","./2heart.png");
  } else if(lifeTotal == 1) {
    document.getElementById('lifeImage').setAttribute("src","./1heart.png");
  } else {
    gameOver(false);
  }
}

function rightAnswer(){
  console.log("correct");

  var audio = new Audio('MP3s/right.mp3');
  audio.play();

  if (difficultyIndex == EASYDIFFICULTY){
    playerScore += 1000;
  } else if (difficultyIndex == MEDIUMDIFFICULTY) {
    playerScore += 2000;
  } else {
    playerScore += 5000;
  }

  document.getElementById('scoreLabel').innerHTML = "Score: " + playerScore;
}

function gameOver(didWin){

  if(localStorage["games"] == null){
    var games = new Array();
    games.push(new Game(playerName,playerScore));
    localStorage["games"] = JSON.stringify(games)
  } else {
    var allGames = JSON.parse(localStorage["games"]);
    allGames.push(new Game(playerName,playerScore))
    localStorage["games"] = JSON.stringify(allGames)
  }

  console.log(JSON.parse(localStorage["games"]));

  if(didWin){
    window.location = "./win.html"
  } else {
    window.location = "./lose.html"
  }

}

function printLastGame(){

  var numGames = JSON.parse(localStorage["games"]).length

  var lastGame = JSON.parse(localStorage["games"])[numGames-1];

  if(document.getElementById('winText')){
    var audio = new Audio('MP3s/win.mp3');
    audio.play();
    document.getElementById('winText').innerHTML = "Good Job, " + lastGame.playerName + "! you scored " + lastGame.playerScore + " points!";
  } else {
    var audio = new Audio('MP3s/lose.mp3');
    audio.play();
    document.getElementById('loseText').innerHTML = "Keep practicing, " + lastGame.playerName + "! you scored " + lastGame.playerScore + " points!";
  }
}

if(document.getElementById('gameTitle')){
  startNewGame();
}

function populateTables(){
  var myTableDiv = document.getElementById("results")
  console.log(myTableDiv);
  var table = document.createElement('Table')
  var tableBody = document.createElement('tableBody')

  table.border = '1'
  table.appendChild(tableBody);

  var tr = document.createElement('TR');
  tableBody.appendChild(tr);

  var th = document.createElement('TH')
  th.appendChild(document.createTextNode("Player Name"));
  tr.appendChild(th);

  var th = document.createElement('TH')
  th.appendChild(document.createTextNode("Score"));
  tr.appendChild(th);

  var allGames = JSON.parse(localStorage["games"]);

  for (i = 0; i < allGames.length; i++) {

    var tr = document.createElement('TR');
    var td = document.createElement('TD')
    td.appendChild(document.createTextNode(allGames[i].playerName));
    tr.appendChild(td)

    var td = document.createElement('TD')
    td.appendChild(document.createTextNode(allGames[i].playerScore));
    tr.appendChild(td)

    tableBody.appendChild(tr);
    console.log("hey");
  }
  myTableDiv.appendChild(table)
}
