

let slider = document.getElementById('myRange');
let output = document.getElementById('value');
const modal = document.getElementById('modal3');
const overlay = document.getElementById('overlay3');
const closeButton = modal.querySelector('.close-button');


const difficulties = ["Easy", "Medium", "Hard"];
let selectedDifficulty=null;
let selectedWordLength = slider.value;


output.innerHTML = slider.value;
function getRowsByDifficulty(difficulty) {
    switch (difficulty) {
        case "Easy": return 6;
        case "Medium": return 4;
        case "Hard": return 3;
        default: return 6;
    }
}



slider.oninput = function () {
    output.innerHTML = this.value;
    selectedWordLength = this.value;

    let x = (this.value - this.min) / (this.max - this.min) * 100;
    this.style.background = `linear-gradient(90deg, rgb(117,252,117) ${x}%, rgb(214,214,214) ${x}%
    )`;
};



const difficultyLengthContainer = document.querySelector('.difficulty-box');

difficulties.forEach(level => {
    const button = document.createElement('button');
    button.textContent = level;
    button.classList.add('nav-btn');

    button.addEventListener('click', () => {
        document
            .querySelectorAll('.difficulty-box .nav-btn')
            .forEach(btn => btn.classList.remove('selected'));

        button.classList.add('selected');
         selectedDifficulty= level;
    });

    difficultyLengthContainer.appendChild(button);
});
function openModal() {
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}
closeButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

const startButton = document.createElement('button');
startButton.textContent = 'Start Game';
startButton.classList.add('start-btn');

startButton.addEventListener('click', () => {
    if (!selectedWordLength || !selectedDifficulty) {
        openModal();
        return;
    }
    const rows = getRowsByDifficulty(selectedDifficulty);

    sessionStorage.setItem('row', String(rows));
    sessionStorage.setItem('col', selectedWordLength);
    //sessionStorage.setItem('difficulty', selectedDifficulty);

    window.location.href = `Wordle.html`;
});

document.querySelector('.settings').appendChild(startButton);





