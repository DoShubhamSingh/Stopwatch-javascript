const timer = document.getElementById("stopwatch");
const lapLog = document.getElementById("lap-log");
const styleSelector = document.getElementById("style-selector");

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;
var lapCount = 0;
var lapHistory = [];

function startTimer() {
  if (stoptime == true) {
    stoptime = false;
    timerCycle();
  }
}

function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
  if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 ) {
      sec = "0" + sec;
    }
    if (min < 10 ) {
      min = "0" + min;
    }
    if (hr < 10 ) {
      hr = "0" + hr;
    }

    timer.innerHTML = hr + ":" + min + ":" + sec;

    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
  timer.innerHTML = "00:00:00";
  stoptime = true;
  hr = 0;
  sec = 0;
  min = 0;
  lapCount = 0;
  lapHistory = [];
  lapLog.innerHTML = "";
}

function lapTimer() {
  if (stoptime == false) {
    lapCount++;
    const lapTime = hr + ":" + min + ":" + sec;
    lapHistory.push(lapTime);
    lapLog.innerHTML += `<p>Lap ${lapCount}: ${lapTime}</p>`;
  }
}

function shareTime() {
  const shareText = `My stopwatch time: ${hr}:${min}:${sec} ${lapHistory.length > 0 ? `with ${lapHistory.length} laps` : ``}`;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  window.open(shareUrl, "_blank");
}

// Style changer
styleSelector.addEventListener("change", () => {
  const selectedStyle = styleSelector.value;
  timer.className = selectedStyle;
  // Add CSS styles for each theme
  if (selectedStyle === "digital") {
    timer.style.fontFamily = "monospace";
    timer.style.fontSize = "48px";
  } else if (selectedStyle === "analog") {
    timer.style.fontFamily = "cursive";
    timer.style.fontSize = "36px";
  } else if (selectedStyle === "retro") {
    timer.style.fontFamily = "fantasy";
    timer.style.fontSize = "42px";
  }
});