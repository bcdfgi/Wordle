let gameReady = false;
let WORD_DICTIONARY = new Set();
let secretWord = "";

fetch("dictionary.txt")
    .then(res => res.text())
    .then(text => {
        text.split("\n").forEach(word => {
            if (word.trim().length === 5) {
                WORD_DICTIONARY.add(word.trim().toLowerCase());
            }
        });

        pickSecretWord();
        gameReady = true;
    });



function pickSecretWord() {
    const words = Array.from(WORD_DICTIONARY);
    secretWord = words[Math.floor(Math.random() * words.length)];
    console.log("Secret word:", secretWord);
}


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

    if (!gameReady) return;

    if (currentTile < 5) return;


    let guess = "";
    const tiles = rows[currentRow].children;

    for (let tile of tiles) {
        guess += tile.dataset.letter;
    }


    if (!WORD_DICTIONARY.has(guess)) {
        alert("Not in word list");
        return;
    }


    const result = checkGuess(guess);


    for (let i = 0; i < 5; i++) {
        tiles[i].classList.add(result[i]);
    }


    if (guess === secretWord) {
        alert("You guessed it!");
        gameReady = false;
        return;
    }


    currentRow++;
    currentTile = 0;


    if (currentRow >= rows.length) {
        alert(`Game over! Word was: ${secretWord}`);
        gameReady = false;
    }
}



function checkGuess(guess) {
    const result = Array(5).fill("absent");
    const secretLetters = secretWord.split("");

    // Pass 1: Correct letters
    for (let i = 0; i < 5; i++) {
        if (guess[i] === secretLetters[i]) {
            result[i] = "correct";
            secretLetters[i] = null;
        }
    }


    for (let i = 0; i < 5; i++) {
        if (result[i] === "correct") continue;

        const index = secretLetters.indexOf(guess[i]);
        if (index !== -1) {
            result[i] = "present";
            secretLetters[index] = null;
        }
    }

    return result;
}


