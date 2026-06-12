const pingSound = new Audio('ping.mp3');
const infoBtn = document.getElementById('Info'); 
const infoModal = document.getElementById('info-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const body = document.body;
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const coefficientSelect = document.getElementById('coefficient-select');

let appState = "IDLE"; //Idle or counting up or counting down
let totalSeconds = 0;
let countdownSeconds = 0;

let currentCoefficient = 0.2; //choice later
let timerInterval = null;

function handleButtonClick() {
  if (appState === "IDLE") {
    appState = "COUNTING_UP";
    document.body.style.backgroundColor = "#e77667"
    startClockEngine();
    startBtn.textContent = "Finish work";
  } 
  else if (appState === "COUNTING_UP") {
    appState = "COUNTING_DOWN";
    document.body.style.backgroundColor = "#7bd1b0"
    countdownSeconds = Math.ceil(totalSeconds * currentCoefficient) + 1;
    startBtn.textContent = "Start work now"; 
  } 
  else if (appState === "COUNTING_DOWN") {
    document.body.style.backgroundColor = "#d17bd1"
    resetTimer();
  }
  else if (appState === "FINISHED"){
    appState = "COUNTING_UP";
    document.body.style.backgroundColor = "#e77667"
    startClockEngine();
    startBtn.textContent = "Rest";
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
        appState = "FINISHED"
        pingSound.play();
        resetTimer();
        if (navigator.vibrate) { 
          navigator.vibrate([400, 200, 400]); 
        }
        startBtn.textContent = "Back to Work";  
        timerDisplay.textContent = "00:00";
      }
    }

  }, 1000); 
}

function resetTimer() {
  clearInterval(timerInterval); 
  totalSeconds = 0;
  countdownSeconds = 0;
  updateDisplay(0);
  appState = "IDLE"
  document.body.style.backgroundColor = "#d17bd1"
}

function updateDisplay(secondsToRender) {
  let minutes = Math.floor(secondsToRender / 60);
  let seconds = secondsToRender % 60;
  
  let formattedMinutes = String(minutes).padStart(2, '0');
  let formattedSeconds = String(seconds).padStart(2, '0');

  timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

startBtn.addEventListener('click', handleButtonClick);
coefficientSelect.addEventListener('change', function() {
  
  currentCoefficient = Number(coefficientSelect.value);
  console.log("Coefficient changed to:", currentCoefficient); // Useful for debugging!
});


infoBtn.addEventListener('click', function() {
  infoModal.showModal(); 
});


closeModalBtn.addEventListener('click', function() {
  infoModal.close(); 
});