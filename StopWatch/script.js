// script.js
let startTime, updatedTime, difference = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function startStopwatch() {
  if (!isRunning) {
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(updateTime, 10);
    isRunning = true;
    startBtn.textContent = 'Pause';
    lapBtn.disabled = false; // Enable Lap button
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.textContent = 'Start';
    lapBtn.disabled = true; // Disable Lap when paused
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  isRunning = false;
  difference = 0;
  lapCounter = 1;
  display.textContent = '00:00.00';
  lapsList.innerHTML = '';
  startBtn.textContent = 'Start';
  lapBtn.disabled = true; // Disable Lap when reset
}

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let minutes = Math.floor((difference / 1000 / 60) % 60);
  let seconds = Math.floor((difference / 1000) % 60);
  let milliseconds = Math.floor((difference % 1000) / 10);

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;

  display.textContent = `${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
  if (isRunning) {
    const lapTime = display.textContent;
    const lapItem = document.createElement('li');
    lapItem.innerHTML = `<span>Lap ${lapCounter++}</span> <span>${lapTime}</span>`;
    lapsList.appendChild(lapItem);

    // 🔥 Auto-scroll to the bottom
    lapsList.scrollTop = lapsList.scrollHeight;
  }
}

// Event Listeners
startBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

// Initially disable Lap button
lapBtn.disabled = true;
