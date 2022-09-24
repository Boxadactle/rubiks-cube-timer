let started;
let elapsed;

let updateInterval;

function updateTime() {
    elapsed = Date.now() - started;
    document.querySelector("span.counter").innerHTML = getTime(elapsed);
}

function startTimer() {
    started = Date.now();
    updateInterval = setInterval(updateTime, 10);
}

function stopTimer() {
    clearInterval(updateInterval);

    addTime(elapsed, document.querySelector('.scramble').innerHTML);
    refreshStats();
}

function getTime(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
  
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
  
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);
  
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");
  
    return `${mm >= 1 ? formattedMM + ':' : ''}${formattedSS}.${formattedMS}`;
}
