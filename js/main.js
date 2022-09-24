const start = document.querySelector("button.start");
const scramble = document.querySelector("p.scramble");

scramble.innerHTML = generateScramble(25);

let timerGoing = false;

const phoneAlert = document.querySelector('.phone-alert');

// check if theyre on mobile haha
setInterval(function() {
    if (window.innerWidth < window.innerHeight) phoneAlert.style.display = 'block';
    else phoneAlert.style.display = 'none';
}, 100);

start.onclick = function () {
    start.blur();

    timerGoing = !timerGoing;
    
    if (timerGoing) startTimer();
    else {
        stopTimer();
        scramble.innerHTML = generateScramble(25);
    }
}

document.onkeydown = function(e) {
    let shouldStart = true;

    document.querySelectorAll('textarea').forEach(e => {
        shouldStart = !(document.activeElement == e);
    });

    if (e.code == 'Space' && shouldStart) start.focus();
}

document.onkeyup = function(e) {
    let shouldStart = true;

    document.querySelectorAll('textarea').forEach(e => {
        shouldStart = !(document.activeElement == e);
    });

    if (e.code == 'Space' && shouldStart) start.onclick();
}