const rows = document.querySelectorAll('.tile-row');
let currentRow = 0;
let currentTile = 0;

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (key === 'backspace') {
        removeLetter();
    } else if (key === 'enter') {
        submitRow();
    } else if (/^[a-z]$/.test(key)) {
        addLetter(key);
    }
});

function addLetter(letter) {
    if (currentTile >= 5) return;

    const tile = rows[currentRow].children[currentTile];
    tile.dataset.letter = letter;
    tile.classList.add('filled');
    currentTile++;
}

function removeLetter() {
    if (currentTile === 0) return;

    currentTile--;
    const tile = rows[currentRow].children[currentTile];
    tile.dataset.letter = '';
    tile.classList.remove('filled');
}
const keys = document.querySelectorAll('.key');

keys.forEach(key => {
    key.addEventListener('click', () => {
        const value = key.textContent;

        if (value === 'ENTER') {
            submitRow();
            return;
        }

        if (value === '⌫') {
            removeLetter();
            return;
        }

        if (/^[A-Z]$/.test(value)) {
            addLetter(value.toLowerCase());
        }
    });
});

function submitRow() {

    if (currentTile < 5) return;

    // TODO: later you can add word validation here

    currentRow++;
    currentTile = 0;


    if (currentRow >= rows.length) {
        currentRow = rows.length - 1;
    }
}
let WORD_DICTIONARY = new Set();

fetch("words.txt")
    .then(res => res.text())
    .then(text => {
        text.split("\n").forEach(word => {
            WORD_DICTIONARY.add(word.trim());
        });
    });


