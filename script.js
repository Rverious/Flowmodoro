const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');

let appState = "IDLE"; //Idle or counting up or counting down
let totalSeconds = 0;
let countdownSeconds = 0;

let currentCoefficient = 0.2; //choice later
let timerInterval = null;

function handleButtonClick() {
  if (appState === "IDLE") {
    appState = "COUNTING_UP";
    startClockEngine();
  } 
  else if (appState === "COUNTING_UP") {
    appState = "COUNTING_DOWN";
    countdownSeconds = totalSeconds * currentCoefficient; 
  } 
  else if (appState === "COUNTING_DOWN") {
    resetTimer();
  }
}

function startClockEngine() {
  timerInterval = setInterval(function() {
    
    if (appState === "COUNTING_UP") {
      totalSeconds++; 
      updateDisplay(totalSeconds);
    } 
    else if (appState === "COUNTING_DOWN") {
      countdownSeconds--; 
      updateDisplay(countdownSeconds);
      
      if (countdownSeconds <= 0) {
        resetTimer();
      }
    }

  }, 1000); 
}

function resetTimer() {
  clearInterval(timerInterval); 
  totalSeconds = 0;
  countdownSeconds = 0;
  updateDisplay(0);
}

function updateDisplay(secondsToRender) {
  let minutes = Math.floor(secondsToRender / 60);
  let seconds = secondsToRender % 60;
  
  let formattedMinutes = String(minutes).padStart(2, '0');
  let formattedSeconds = String(seconds).padStart(2, '0');

  timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

startBtn.addEventListener('click', handleButtonClick);