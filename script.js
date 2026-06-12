const pingSound = new Audio('ping.mp3');
const infoBtn = document.getElementById('Info'); 
const infoModal = document.getElementById('info-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const body = document.body;
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const coefficientSelect = document.getElementById('coefficient-select');

let appState = "IDLE"; 
let totalSeconds = 0;
let countdownSeconds = 0;

let currentCoefficient = 0.2;
let timerInterval = null;

function handleButtonClick() {
  if (appState === "IDLE") {
    appState = "COUNTING_UP";
    document.body.style.backgroundColor = 'var(--color-work)'
    startClockEngine();
    startBtn.textContent = "Finish work";
  } 
  else if (appState === "COUNTING_UP") {
    appState = "COUNTING_DOWN";
    document.body.style.backgroundColor = "var(--color-rest)"
    countdownSeconds = Math.ceil(totalSeconds * currentCoefficient) + 1;
    startBtn.textContent = "Start work now"; 
  } 
  else if (appState === "COUNTING_DOWN") {
    jump();
  }
  else if (appState === "FINISHED"){
    appState = "COUNTING_UP";
    document.body.style.backgroundColor = "var(--color-work)"
    startClockEngine();
    startBtn.textContent = "Stop & Rest";
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
        clearInterval(timerInterval); 
        appState = "FINISHED";        
        totalSeconds = 0;             
        countdownSeconds = 0;
        pingSound.play();             
        if (navigator.vibrate) { 
          navigator.vibrate([400, 200, 400]); 
        }

        document.body.style.backgroundColor = "var(--color-idle)"

        startBtn.textContent = "Start work"; 
        timerDisplay.textContent = "00:00";
      }
    }

  }, 1000); 
}

function jump() {
  totalSeconds = 0;
  countdownSeconds = 0;
  
  clearInterval(timerInterval); 
  
  
  appState = "COUNTING_UP";
  document.body.style.backgroundColor = "var(--color-work)";
  startBtn.textContent = "Stop & Rest";
  
  updateDisplay(0);
  startClockEngine();


}



function resetTimer() {
  clearInterval(timerInterval); 
  totalSeconds = 0;
  countdownSeconds = 0;
  updateDisplay(0);
  appState = "IDLE"
  document.body.style.backgroundColor = "var(--color-idle)"
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
});


infoBtn.addEventListener('click', function() {
  infoModal.showModal(); 
});


closeModalBtn.addEventListener('click', function() {
  infoModal.close(); 
});