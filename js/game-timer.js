showDiff();

function showDiff(){

    // Test date format '11/23/2018,20:11'
    var now = new Date();
  
    var gameStart1 = new Date();
    var gameStart2 = new Date();
    var gameStart3 = new Date();
    var gameStart4 = new Date();
  

  
    // Set the game start times
    gameStart1.setHours(18);
    gameStart1.setMinutes(30);
    gameStart1.setSeconds(0);
  
    gameStart2.setHours(19);
    gameStart2.setMinutes(20);
    gameStart2.setSeconds(0);
  
    gameStart3.setHours(20);
    gameStart3.setMinutes(10);
    gameStart3.setSeconds(0);
  
    gameStart4.setHours(21);
    gameStart4.setMinutes(0);
    gameStart4.setSeconds(0);
  
  
  
  
    // Default next game start time, first game of the night
    var nextGameStart = gameStart1;
  
  
    // Get the next and current game time slots
    if (now >= gameStart1 && now < gameStart2) {
      var nextGameStart = gameStart2;
      var currentGameStarted = gameStart1;
      
    } else if (now >= gameStart2 && now < gameStart3) {
      var nextGameStart = gameStart3;
      var currentGameStarted = gameStart2;
      
    } else if (now >= gameStart3 && now < gameStart4) {
      var nextGameStart = gameStart4;
      var currentGameStarted = gameStart3;
      
    } else {
      // First game of the next day
      var nextGameStart = gameStart1;
      // Set this if no games are running
      var currentGameStarted = false;
    }
  
  
     /* Convert time into hours/mins/seconds 
    and get the difference from the current time */
    var diff = (nextGameStart - now)/1000;
    var diff = Math.abs(Math.floor(diff));
    
    var days = Math.floor(diff/(24*60*60));
    var leftSec = diff - days * 24*60*60;
    
    var hrs = Math.floor(leftSec/(60*60));
    var leftSec = leftSec - hrs * 60*60;
      
    var min = Math.floor(leftSec/(60));
    var leftSec = leftSec - min * 60;
  
    var leftMilliSec = leftSec * 1000;
  
  
    // Make some minutes to adjust times
    var min1 = 60000; // One minute
    var min3 = min1 * 3; // Three minutes
    var min6 = min1 * 6; // Six minutes
    var min10 = min1 * 10; // Ten minutes
  
    
    // Next game start time in 12 hour time
    var nextGameHours = nextGameStart.getHours() % 12;
    // Next game start time minutes with leading zero
    var nextGameMinutes = (nextGameStart.getMinutes()<10?'0':'') + nextGameStart.getMinutes();
  
  
    // If a game has started find 10 minutes after the start
    if( currentGameStarted != false ) {
      var currentGameStartedPlus10 = new Date(currentGameStarted.valueOf() + min10);
    }
  
    var nextGameStartMinus10 = new Date(nextGameStart.valueOf() - min10);
    var nextGameStartMinus6 = new Date(nextGameStart.valueOf() - min6);
    var nextGameStartMinus3 = new Date(nextGameStart.valueOf() - min3);

  
  
    if( now >= currentGameStarted && now <= currentGameStartedPlus10 ) {
      // 10 minute window after game one starts
      var countdownMessage = "Game On";
    } else if( now >= nextGameStartMinus10 && now <= nextGameStartMinus6 ) {
      // 10 minute window before next game starts
      var countdownMessage = "Next games starts in " + min + " minutes ";
    } else if( now >= nextGameStartMinus6 && now <= nextGameStartMinus3 ) {
      // 6 minute window before next game starts
      var countdownMessage =  "Next games starts in " + min + " minutes and " + leftSec + " seconds";
    } else if( now >= nextGameStartMinus3 && now <= nextGameStart ) {
      // 3 minute window before next game starts
      var countdownMessage =  "Next games starts in " + min + " minutes and " + leftSec + " seconds and " + leftMilliSec + " milliseconds. ";
    } else {
      var countdownMessage = "Next games starts in " + hrs + " hours " + min + " minutes. ";
    }
  
  
    

    // Display the next game time
    document.getElementById("nextGameTime").innerHTML = nextGameHours + ":" + nextGameMinutes;
    // Display a countdown until the next game
    document.getElementById("countdown").innerHTML = countdownMessage;
 
  
  
  
setTimeout(showDiff,1000);
}