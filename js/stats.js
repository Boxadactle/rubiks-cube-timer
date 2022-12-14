let stats = {
    solved: 0,
    times: []
};

const solved = document.querySelector('.cubes');
const average = document.querySelector('.average');
const fastest = document.querySelector('.fastest');
const slowest = document.querySelector('.slowest');
const timerhaver = document.querySelector('.timehaver');

function getCachedSave() {
    const cname = "session=";
    const decoded = decodeURIComponent(document.cookie);
    const a = decoded.split(';');
    let save = "";

    a.forEach(cookie => {
        if (cookie.startsWith(cname)) save = cookie.split(cname)[1];
    })

    return save;
}

function exportSession() {
    return btoa(`${stats.solved}; ${btoa(JSON.stringify(stats.times))}`);
}

// i dont care if you fuck up your save
function loadSession(string) {
    if (string.length == 0) return;
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

    list.push(`<strong>Solve #</strong>: ${index + 1}`);
    list.push(`<strong>Time to Solve</strong>: ${getTime(solve[0])}`);
    list.push(`<strong>Scramble</strong>: ${solve[1]}`);
    list.push(`<strong>+2</strong>: ${solve[2] ? 'Yes' : 'No'}`);
    list.push(`<strong>DNF</strong>: ${solve[3] ? 'Yes' : 'No'}`);
    list.push(`<button onclick="removeTime(${index})">Remove Time</button>`);

    showAlert(`Stats for Solve ${index + 1}`, list.join('\n'));
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

async function removeTime(index) {
    stats.times.splice(index, 1);
    hideAlert();
    refreshStats();
}

function downloadStats() {
    const d = new Date();
    const filename = `session ${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()} ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
    downloadFile(filename + '.txt', exportSession())
}

const showUploadSessionAlert = () => showFileAlert('Upload Session File', 'Load a downloaded session file', (file) => {loadSession(file.target.result)}, '.txt');


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
        <div class="solve">
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
    fastest.innerHTML = cubes == 0 ? '--' : getTime(bestTime);
    slowest.innerHTML = cubes == 0 ? '--' : getTime(worstTime);

    timerhaver.innerHTML = html.join('\n');

    document.cookie = `session=${exportSession()};`;

}
