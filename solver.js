//Variables that arn't changing
var NUMBER_OF_PRISONERS = 11;

//Randomly assigns black or white hats
function assignHats() {
  //Temporary var to edit, return later to set variable
  var tempHats = new Array(NUMBER_OF_PRISONERS);
  //Loops through and sets all hats
  for(var i = 0; i < NUMBER_OF_PRISONERS; i++) {
    //Picks random int, 0 or 1 (Represent hat color)
    tempHats[i] = Math.floor(Math.random() * 2);
  }
  //assigns the hats
  return tempHats;
}

//Detects if there is an odd or even amount of black hats infront of current prisoner
function evenOrOddBlackHatsInfront(index, hats) {
  //Prisoner cant see his own hat!
  index++;
  //Keeps track of black hats
  var hatCounter = 0;
  //checks all prisoners infront for black hats
  for(index; index < NUMBER_OF_PRISONERS; index++) {
    //Detects if hat is black
    if(hats[index] == 0) {
      hatCounter++;
    }
  }
  //modulos detects if even or odd
  return hatCounter % 2 == 0 ? "even" : "odd";
}

//tells prisoner if they are right or wrong with their guess
function guessHat(index, hats, guess) {
  return hats[index] == guess;
}

//Array to keep track of colors
//Let 0 represent black and 1 represent white
var hats = assignHats();
console.log(hats);
//currentPrisoner keeps track of what prisoner is guessing
var currentPrisoner = 0;
//lastResult keeps track of what the last prisoner saw
var lastResult = null;
//keeps track of last guess
var lastGuess = null;
//If the player doesn't know this then the whole algorithm fails, ex first guy is black and second is white.
//First guy guesses white,
//numberWrong keeps track of mistakes, should be 1
var numberWrong = 0;

//Loops through each prisoner
for(currentPrisoner; currentPrisoner < NUMBER_OF_PRISONERS; currentPrisoner++) {
  //current prisoner sees even or odd
  var currentResult = evenOrOddBlackHatsInfront(currentPrisoner, hats);
  //If it is the first prisoner, lastResult will be null. He gets 50/50 chance
  var guess;
  if(lastResult == null) {
    //First prisoner automatically guesses blacks if he sees an odd amount of numbers
    guess = currentResult == "even" ? 1 : 0; //Remember, 1 is for whites and 0 is for blacks
  } else {
    //If current is the same as last result then the current prisoner can't have a black hat
    guess = currentResult == lastResult ? 1 : 0;
  }
  //Check if guess is incorrect
  console.log("Prisoner " + currentPrisoner + " guessed " + guess + ". He saw an " + currentResult + " number of black hats.");
  if(!guessHat(currentPrisoner, hats, guess)) {
    console.log("Prisoner " + currentPrisoner + " was wrong.");
    lastGuessCorrect = false;
    numberWrong++;
  } else {
    console.log("Prisoner " + currentPrisoner + " was right.");
  }
  //Keeping this updated
  lastResult = currentResult;
  lastGuess = guess;
}

//according to the riddle there will only be one error
if(numberWrong > 1) {
  console.log("Riddle solver failed. " + numberWrong + " incorrect answers.");
} else {
  console.log("Riddle solver succeeded. " + numberWrong + " incorrect answers.");
}
