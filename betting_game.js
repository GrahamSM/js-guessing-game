//Function to get a players bet of between $5 and $10
function getBet(){
  var bet = prompt("Please place a bet between $5 and $10 for your guess: ")
  if (checkBet(bet)){
    return bet;
  } else {
    getBet()
  }
}
//Helper function to getBet() to verify that user input is between 5 and 10
function checkBet(bet){
  if ((bet < 5) || (bet > 10)){
    alert("Your bet must be between $5 and $10. Try again.")
    return false;
  }else {
    return true;
  }
}
//Function to get a players guess of between 1 and 10
function getGuess(){
  var guess = prompt("Please pick a number between 1 and 10: ");
  if (checkGuess(guess)){
    return guess;
  } else {
    getGuess();
  }
}
//Helper function to getGuess to verify that a user input is between 1 and 10
function checkGuess(guess){
  if ((guess < 1) || (guess > 10)){
    alert("Your guess must be between 1 and 10. Try again.")
    return false;
  }else {
    return true;
  }
}
//Generate and return a random number between 1 and 10
function getRandom(){
  return 1 + Math.floor(Math.random()*10);
}
//Return the difference between two numbers
function checkDiff(compNum, playerNum){
  return compNum - playerNum;
}
//Game-specific function to perform specific behaviour depending on variables diff bet and bankroll
//If the diff is 0, the user has made the correct guess and bankroll increases by value of bet
//If diff is 1, nothing happens
//Otherwise, players bankroll decreases by bet
function getOutcome(diff, bet, bankroll){
  $('#results').append('<h4>Results from this round</h4>');
  if (diff===0){
    bankroll += bet;
    var message = "Correct! You win this round.";
    $('#results').append(message);
  }
  else if (Math.abs(diff) === 1){
    var message = "You were within exactly 1 of the actual number. Nothing happens.";
    $('#results').append(message);
  }
  else{
    bankroll -= bet;
    var message = "Too bad! You lost this round.";
    $('#results').append(message);
  }
  return bankroll;
}

//Alert user with bankroll amount
function getStatus(bankroll){
  $('#results').append("<p>Your current bankroll is: " + bankroll + "</p>");
}

//Alert user with their guess, and the number generated by the computer
function getRoundStats(playerNum, compNum){
  $('#results').append("<p>Your guess was: " + playerNum + '\n' + "The computer's number was: " + compNum + "</p>");
}

//Verify that the users repsonse to whether or not they want to continue playing is with 'y' or 'n'
function checkResponse(answer){
  if ((answer.toLowerCase()) === 'n' || (answer.toLowerCase() === 'y')){
    return true;
  }
  else{
    return false;
  }
}

//Function to verify whether or not a user would like to continue playing
function getContinuePlaying(){
  var answer = prompt("Would you like to continue playing?: (y/n)")
  if (checkResponse(answer)){
    if (answer.toLowerCase() === 'n'){
      return false;
    }
    else{
      return true;
    }
  }
  else{
    alert("Please provide a y/n response!");
    getContinuePlaying();
  }
}

//Function to execute all game

function getPlayerData(){
  var playerData = {};
  $(".guess-bet-form").submit(function(event) {
    event.preventDefault();
    playerData.playerNum = $("#guess").val();
    playerData.playerBet = $("#bet").val();
  });
  return playerData;
}

function getBeginStatus(bankroll){
  $('#results').append("<p>Your starting bankroll is: " + bankroll + "</p>");
}

function getFinalStatus(bankroll){
  $('#results').append("<p>Your ending bankroll is: " + bankroll + "</p>");
}

function runGame(bankroll){
  $(".guess-bet-form").on('submit', function(event) {
    if (bankroll > 0){
      event.preventDefault();
      getBeginStatus(bankroll);
      playerNum = $("#guess").val();
      playerBet = $("#bet").val();
      var compNum = getRandom();
      var diff = checkDiff(compNum, playerNum);
      bankroll = getOutcome(diff, playerBet, bankroll);
      getRoundStats(playerNum, compNum);
      getFinalStatus(bankroll);
      setTimeout(function(){
        var continuePlaying = getContinuePlaying();
        if (!continuePlaying){
          $('#results').empty();
          $('#results').append("<h2>Thank you for playing!</h2>")
        }
      }, 1000);
    }
  });
}

$(document).ready(function(){
  runGame(100);
});
