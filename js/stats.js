let stats = {
    solved: 0,
    times: []
};

const solved = document.querySelector('.cubes');
const average = document.querySelector('.average');
const fastest = document.querySelector('.fastest');
const slowest = document.querySelector('.slowest');
const timerhaver = document.querySelector('.timehaver');

function exportSession() {
    return btoa(`${stats.solved}; ${btoa(JSON.stringify(stats.times))}`);
}

// i dont care if you fuck up your save
function loadSession(string) {
    try {
        const parsed = atob(string);
        const solves = parsed.split(';')[0];
        const times = parsed.split(';')[1];
        stats.solved = parseInt(solves);
        stats.times = JSON.parse(atob(times));

        refreshStats();
    } catch (e) {
        console.log(e);
        showAlert("Error", `Invalid save bozo\n\n${e.toString()}`);
    }
}

function showStats(index) {
    const solve = stats.times[index];
    const list = [];

    list.push(`<strong>Solve #</strong>: ${index}`);
    list.push(`<strong>Time to Solve</strong>: ${getTime(solve[0])}`);
    list.push(`<strong>Scramble</strong>: ${solve[1]}`);
    list.push(`<strong>+2</strong>: ${solve[2] ? 'Yes' : 'No'}`);
    list.push(`<strong>DNF</strong>: ${solve[3] ? 'Yes' : 'No'}`);

    showAlert(`Stats for Solve ${index}`, list.join('\n'));
}

function addTime(time, scramble) {
    stats.times.push([time, scramble, false, false]);
}

function plustwo(index) {
    stats.times[index][2] = !stats.times[index][2];
    stats.times[index][3] = false;
    refreshStats();
}

function dnf(index) {
    stats.times[index][3] = !stats.times[index][3];
    stats.times[index][2] = false;
    refreshStats();
}

function refreshStats() {
    let html = [];

    let bestTime;
    let worstTime;
    let allTimes = 0;
    let cubes = 0;

    for (i = 0; i < stats.times.length; i++) {
        const time = stats.times[i];

        // for +2
        const calculatedTime = time[2] ? time[0] + 2000 : time[0]

        // for DNF
        if (!time[3]) {
            cubes++;
            allTimes += calculatedTime;
        }

        if (bestTime == null) bestTime = calculatedTime;
        if (worstTime ==  null) worstTime = calculatedTime;

        if (bestTime > calculatedTime) bestTime = calculatedTime;
        if (worstTime < calculatedTime) worstTime = calculatedTime;

        html.push(`
        <div class="timer">
            <span class="number">#${i + 1}</span>
            <span class="t">${getTime(time[0])}</span>
            <button class="modifier${time[2] ? ' active' : ''}" onclick="plustwo(${i})">+2</button>
            <button class="modifier${time[3] ? ' active' : ''}" onclick="dnf(${i})">DNF</button>
            <button class="modifier" onclick="showStats(${i})">More...</button>
        </div>
        `);
    }

    solved.innerHTML = cubes;
    average.innerHTML = cubes == 0 ? '--' : getTime(allTimes / cubes);
    fastest.innerHTML = getTime(bestTime);
    slowest.innerHTML = getTime(worstTime);

    timerhaver.innerHTML = html.join('\n');

}