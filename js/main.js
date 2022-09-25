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

// so that we can get the session saved in the cookie
loadSession(getCachedSave());

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

    if (e.code == 'Escape') {
        hideAlert();
        document.activeElement.blur();
    };

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