showDiff();

function showDiff(){

    // Test date format '11/23/2018,20:11'
    var now = new Date();
  
    // Source for most of the code below before reworking
    // https://stackoverflow.com/questions/15523142/javascript-adding-minutes-in-a-loop

    var gameNumber = 4; // How many rounds
    var gameLength = 50; // Game length in minutes

    // Make times more human readable
    function pad(val,max) {
      // Convert the value to a string 
      var str = val.toString(); 
      // Ternary operator: If the string's length is less than the max add a leading zero, otherwise return the string
      return str.length < max ? pad("0" + str, max) : str;
    }

    function listGameTimes() {
      // Get the time and date
      var gameStart = new Date(); 
      // Setup gameTimes to be an empty array
      var gameTimes = [];
      for (var i=1;i<(gameNumber + 1);i++) {
          // Make hour an empty object literal
          var hour = {};
          // Add the gameLength each loop but not the first time
          gameStart.setHours(18);
          gameStart.setMinutes(30 + ((i - 1) * gameLength));
          gameStart.setSeconds(0);

          // Make the times pretty
          hour.text = pad(gameStart.getHours(),2) +':'+pad(gameStart.getMinutes(),2);
          // Get the full time/date 
          hour.time = new Date(gameStart.toString());
          // Push the new hour to the array
          gameTimes.push(hour);
        }
      return gameTimes;
    }

    console.log(listGameTimes());
    console.log(gameStart1);
  
    var gameStart1 = listGameTimes()[0].time;
    var gameStart2 = listGameTimes()[1].time;
    var gameStart3 = listGameTimes()[2].time;
    var gameStart4 = listGameTimes()[3].time;
  
  
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

    // console.log("Please Hold");
 
  
  
  
setTimeout(showDiff,1000);
}




