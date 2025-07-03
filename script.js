let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCount = 1;

// Get elements
const display = document.getElementById("display");
const dotWrapper = document.getElementById("dotWrapper");
const lapMarkers = document.getElementById("lap-markers");
const lapList = document.getElementById("lap-times");

function updateDisplay() {
  const now = Date.now();
  elapsedTime = now - startTime;

  const ms = Math.floor((elapsedTime % 1000) / 10);
  const s = Math.floor((elapsedTime / 1000) % 60);
  const m = Math.floor((elapsedTime / (1000 * 60)) % 60);

  // Digital display
  display.textContent =
    String(m).padStart(2, '0') + ':' +
    String(s).padStart(2, '0') + ':' +
    String(ms).padStart(2, '0');

  // Rotate the dot
  const dotAngle = (elapsedTime / 1000 % 60) * 6;
  if (dotWrapper) {
    dotWrapper.style.transform = `rotate(${dotAngle}deg)`;
  }
}

function startTimer() {
  if (timerInterval) return;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateDisplay, 50);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  lapCount = 1;

  display.textContent = "00:00:00";
  if (dotWrapper) dotWrapper.style.transform = "rotate(0deg)";
  lapList.innerHTML = "";
  lapMarkers.innerHTML = "";
}

function recordLap() {
  const time = display.textContent;

  // Add lap time to list
  const li = document.createElement("li");
  li.textContent = `Lap ${lapCount++}: ${time}`;
  lapList.appendChild(li);

  // Add visual lap marker
  const angle = ((elapsedTime / 1000) % 60) * 6;
  const marker = document.createElement("div");
  marker.className = "lap-marker";
  marker.style.transform = `rotate(${angle}deg) translateX(-50%)`;
  lapMarkers.appendChild(marker);
}
