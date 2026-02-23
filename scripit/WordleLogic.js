// Global Variables needed to run the logic
export let attempt=1;
let currentString="";
let word="";
export let currentBox=1;
let dict;
import {gameConfig} from './config.js';
let row=gameConfig.rows ;
let col=gameConfig.columns ;
const closeButton = document.querySelectorAll(".close-button");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const modal2 = document.getElementById("modal2");
const overlay2 = document.getElementById("overlay2");

export let guessesArray = [];
export let gameStartTime = Date.now();
const mode = localStorage.getItem("mode");
const userId = localStorage.getItem("user_id");


async function saveGame(userId, currentWord, guesses, attemptsLeft, result, timeTaken, wordLength,difficultyLevel) {
    if (!userId || userId === "undefined") return;

    try {
        const response = await fetch('http://localhost:3000/api/auth/game/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                currentWord,
                guesses,
                attemptsLeft,
                result,
                timeTaken,
                wordLength,
                difficultyLevel
            })
        });

        const data = await response.json();
        console.log("Game saved:", data.message);
    } catch (err) {
        console.error('Failed to save game:', err);
    }
}



function closePop() {
    modal.classList.remove("active");
    modal.style.display = "none";
    overlay.classList.remove("active");
}

closeButton.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest(".modal");

        modal.classList.remove("active");
        modal.style.display = "none";

        if (modal.id === "modal") {
            overlay.classList.remove("active");
        }

        if (modal.id === "modal2") {
            overlay2.classList.remove("active");
        }
    });
});

overlay.addEventListener("click", closePop);
overlay2.addEventListener("click", closeLostPop);

function openPop() {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");

    modal.classList.add("active");
    modal.style.display = "block";
    overlay.classList.add("active");
}
function openLostPop() {
    modal2.classList.add("active");
    modal2.style.display = "block";
    overlay2.classList.add("active");
}

function closeLostPop() {
    modal2.classList.remove("active");
    modal2.style.display = "none";
    overlay2.classList.remove("active");
}





//current box setter
export function setCurrentbox(int){
    currentBox=int;
}

//Function that randomly reads a word from the 'wordles.json'.
export function RandomWord() {
    if(col===3) {
        fetch('./Dictionary/three-letter.json')
            .then(response => response.json())
            .then((temp) => {
                dict = temp;
                for (let i = 0; i < dict.length; i++) {
                    dict[i] = dict[i].toUpperCase();
                }
                console.log(dict);
                const randomIndex = Math.floor(Math.random() * dict.length);

                console.log(randomIndex);
                word = dict[randomIndex];
                console.log(word);
            })
            .catch(err => console.error(err));
    }else if(col===4) {
        fetch('./Dictionary/four-letter.json')
            .then(response => response.json())
            .then((temp) => {
                dict = temp;
                for (let i = 0; i < dict.length; i++) {
                    dict[i] = dict[i].toUpperCase();
                }
                console.log(dict);
                const randomIndex = Math.floor(Math.random() * dict.length);

                console.log(randomIndex);
                word = dict[randomIndex];
                console.log(word);
            })
            .catch(err => console.error(err));

    }else if(col===5) {
        fetch('./Dictionary/five-letter.json')
            .then(response => response.json())
            .then((temp) => {
                dict = temp;
                for (let i = 0; i < dict.length; i++) {
                    dict[i] = dict[i].toUpperCase();
                }
                console.log(dict);
                const randomIndex = Math.floor(Math.random() * dict.length);

                console.log(randomIndex);
                word = dict[randomIndex];
                console.log(word);
            })
            .catch(err => console.error(err));
    }else if(col===6) {
        fetch('./Dictionary/six-letter.json')
            .then(response => response.json())
            .then((temp) => {
                dict = temp;
                for (let i = 0; i < dict.length; i++) {
                    dict[i] = dict[i].toUpperCase();
                }
                console.log(dict);
                const randomIndex = Math.floor(Math.random() * dict.length);

                console.log(randomIndex);
                word = dict[randomIndex];
                console.log(word);
            })
            .catch(err => console.error(err));
    }else{
        console.error("Wrong number of words.");
    }

}
//Gets the user typed word when pressed enter
export function getUserInput(){
    let guess = "";
    for (let i = 1; i <= col; i++) {
        guess += document.querySelector(`[data-row="${attempt}"][data-column="${i}"]`).value;
    }

    currentString = guess.toUpperCase();

    if(currentString.length === col){
        guessesArray.push(currentString);
    }

    check();
}



//Check logic and colors the right box.
function check(){
    if(currentString.length!==col){
        currentString="";
        return;
    }

    let isCurrentStringinDict=checkInDict();

    if(isCurrentStringinDict===false){
        currentString="";
        for(let i=1;i<=col;i++){
            let box=document.querySelector(`[data-row="${attempt}"][data-column="${i}"]`)
            box.classList.add('shake');

            box.addEventListener('animationend',()=>{
                box.classList.remove('shake');
            },{once:true});
        }


        return;
    }

    currentString=currentString.toUpperCase();

    console.log(currentString);

    for(let i=0;i<currentString.length;i++){
        let result=match(currentString[i],i);

        let box=document.querySelector(`[data-row="${attempt}"][data-column="${i+1}"]`);

        let key=document.getElementById(currentString[i]);


        if(result==="correct"){
            box.classList.add('flip');
            box.style.backgroundColor="#538d4e";
            key.style.backgroundColor="#538d4e";

        }else if(result==="present" ){
            box.classList.add('flip');
            box.style.backgroundColor="#b59f3b";
            key.style.backgroundColor="#b59f3b";
        }
        else if(result==="absent"){
            box.classList.add('flip');
            box.style.backgroundColor="#3a3a3c";
            key.style.backgroundColor="#3a3a3c";
        }

    }

    if(currentString === word){
        localStorage.setItem("gameStatus", "finished");
        const userId = localStorage.getItem("userId");
        const timeTaken = Math.floor((Date.now() - gameStartTime) / 1000); // in seconds
        if(mode !== "guest" && userId){
            saveGame(userId, word, guessesArray, 0, "win", timeTaken,word.length,row)
                .then(() => console.log("Game saved"))
                .catch(err => console.error(err));
        }



        showNotification(
            "Winner",
            "Congratulations you guessed the right answer.",
            true
        );
        return;
    }


    currentString="";
    attempt += 1;
    if (attempt > row) {
        localStorage.setItem("gameStatus", "finished");
        const userId = localStorage.getItem("userId");
        const timeTaken = Math.floor((Date.now() - gameStartTime) / 1000);

        if(mode !== "guest" && userId){
            saveGame(userId, word, guessesArray, 0, "lose", timeTaken, word.length,row)
                .then(() => console.log("Game saved"))
                .catch(err => console.error(err));
        }




        showNotification(
            "Lost",
            "Sorry all the attempts are finished.",
            false
        );
    }



//Checks if the user types word is in the Dictionary
function checkInDict(){
    for(let i=0;i<dict.length;i++){
        if(currentString===dict[i]){
            return true;
        }
    }
    return false;
}

//Checks if the user typed letter is either correct in the positon, or present in the word but wrong positon

function match(letter, index) {
    if (word[index] === letter) {
        return "correct";
    }

    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            return "present";
        }
    }

    return "absent";
}


}


function showNotification(title, message) {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const modal = document.createElement("div");
    modal.classList.add("modal", "active");

    modal.innerHTML = `
        <div class="modal-header">
            <div class="title">${title}</div>
        </div>

        <div class="modal-body">
            ${message}
        </div>

        <p class="try-again-text">Would you like to try again?</p>

        <div class="modal-buttons">
            <button class="yes-button">Yes</button>
            <button class="no-button">No</button>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    setTimeout(() => overlay.classList.add("active"), 10);

    // YES → Restart the game with a new word
    modal.querySelector(".yes-button").addEventListener("click", () => {
        // Remove modal and overlay
        modal.remove();
        overlay.remove();

        // Reset game variables
        attempt = 1;
        currentBox = 1;
        guessesArray = [];
        gameStartTime = Date.now();

        // Clear the grid inputs
        const boxes = document.querySelectorAll(".box");
        boxes.forEach(box => {
            box.value = "";
            box.style.backgroundColor = "";
            box.classList.remove("flip");
        });

        // Choose a new random word
        RandomWord();
    });

    // NO → Conditional redirect based on login/guest
    modal.querySelector(".no-button").addEventListener("click", () => {
        const mode = localStorage.getItem("mode");
        const userId = localStorage.getItem("userId");

        if (mode !== "guest" && userId) {
            window.location.href = "ScoreTable.html";
        } else {
            window.location.href = "Sign-in.html";
        }
    });
}








