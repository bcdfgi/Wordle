import * as logic from "./WordleLogic.js"
import {handleKey} from "./Keyboard.js";
import {gameConfig} from "./config.js";


//Choosing a random word
logic.RandomWord();
console.log(gameConfig.rows);
console.log(gameConfig.columns);

//Generate the grid
let grid=document.getElementById("grid")
grid.innerHTML = ""; // Clear previous content
grid.style.gridTemplateColumns = `repeat(${gameConfig.columns}, 0fr)`;
grid.style.gridTemplateRows = `repeat(${gameConfig.rows}, 1fr)`;
for(let r=1;r<=gameConfig.rows; r++) {
    for (let c = 1; c <= gameConfig.columns; c++) {
        const input = document.createElement("input");
        input.classList.add("box");
        input.type = "text";
        input.maxLength = 1;
        input.dataset.row = String(r);
        input.dataset.column = String(c);

        grid.appendChild(input);
    }
}

//Connects keyboard to the grid: so when user types the letter is put in the appropriate place
document.addEventListener("keydown", (event) => {handleKey(event.key);});

//Generate Virtual Keyboard
const keyboardLayout = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["ENTER","Z","X","C","V","B","N","M","⌫"]
];

const keyboardContainer=document.getElementById("keyboard-container");

keyboardLayout.forEach((row,rowIndex)=>{
    let rowdiv=document.createElement("div");
    rowdiv.classList.add("keyboard-row");

    if(rowIndex===1){
        rowdiv.classList.add("middle-row");
    }

    row.forEach(key=>{
        let button=document.createElement("button");
        button.innerText=key;
        button.classList.add("key");

        if(key==="ENTER"){
            button.innerText=key;
            button.classList.add("large-key");
            button.addEventListener('click',()=>{handleKey("Enter")})
        }else if(key==="⌫"){
            button.innerText=key;
            button.classList.add("large-key");
            //Give Functionality
            button.addEventListener('click',(event)=>{handleKey("Backspace");})
        }else{
            button.id=key;
            button.innerText=key;
            //Give Functionality
            button.addEventListener('click',(event)=>{handleKey(key);});
        }

        rowdiv.appendChild(button);
    })

    keyboardContainer.appendChild(rowdiv);
});







