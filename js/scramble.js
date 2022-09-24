const u = [
    "U", "U'", 'U2'
];

const d = [
    "D", "D'", "D2"
];

const l = [
    "L", "L'", "L2"
];

const r = [
    "R", "R'", "R2"
];

const f = [
    "F", "F'", "F2"
];

const b = [
    "B", "B'", "B2"
];

const moves = [
    u, d, l, r, f, b
]

function generateScramble(amount) {

    let a = [];

    let previousMove = '';

    for (i = 0; i < amount; i++) {
        const move = selectMove(previousMove);

        previousMove = move;
        a.push(move);
    }

    return a.join(' ');
}

function selectMove(previousMove) {
    const moveset = moves[Math.floor(Math.random() * moves.length)];
    
    if (moveset.indexOf(previousMove) != -1) return selectMove(previousMove);

    return moveset[Math.floor(Math.random() * moveset.length)];
}