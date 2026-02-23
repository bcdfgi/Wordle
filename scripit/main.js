import * as logic from "./WordleLogic.js"
import {handleKey} from "./Keyboard.js";
import {gameConfig} from "./config.js";
const mode = localStorage.getItem("mode");



//Choosing a random word
logic.RandomWord();
console.log(gameConfig.rows);
console.log(gameConfig.columns);

//Generate the grid
let grid=document.getElementById("grid")
grid.innerHTML = "";
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

const navbar = document.getElementById("navbar");


const profileContainer = document.createElement("div");
profileContainer.classList.add("profile-container");


if(mode=== "guest"){
    profileContainer.style.display = "none";
}



const profileIcon = document.createElement("div");
profileIcon.classList.add("profile-icon");
localStorage.getItem("userId");

const userPicture = localStorage.getItem("userPicture");
const userName = localStorage.getItem("userEmail") || "User";


const uiAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=538d4e&color=fff&size=128`;

const img = document.createElement("img");
img.classList.add("profile-img");
img.referrerPolicy = "no-referrer";


if (userPicture && userPicture !== "/images/profile.svg") {
    img.src = userPicture;
} else {
    img.src = uiAvatarUrl;
}


img.onerror = () => {
    img.src = uiAvatarUrl;
};

profileIcon.innerHTML = "";
profileIcon.appendChild(img);


const dropdownMenu = document.createElement("div");
dropdownMenu.classList.add("dropdown-menu");

const signInBtn = document.createElement("button");
signInBtn.innerText = "Sign In";



const historyBtn = document.createElement("button");
historyBtn.innerText = "History";

const logoutBtn = document.createElement("button");
logoutBtn.innerText = "Log Out";

const userId= localStorage.getItem("userId");
if(userId){
    dropdownMenu.append(historyBtn,logoutBtn);

}else{
    dropdownMenu.append(signInBtn);
}


//dropdownMenu.append(signInBtn, historyBtn);

profileContainer.append(profileIcon, dropdownMenu);
navbar.appendChild(profileContainer);


profileIcon.addEventListener("click", () => {
    dropdownMenu.classList.toggle("active");
});


document.addEventListener("click", (event) => {
    if (!event.target.closest(".profile-container")) {
        dropdownMenu.classList.remove("active");
    }
});


signInBtn.addEventListener("click", () => {
    window.location.href = "Sign-in.html";
});



historyBtn.addEventListener("click", () => {
    const currentMode = localStorage.getItem("mode");
    const userId = localStorage.getItem("userId");

    if (userId) {
        window.location.href = "ScoreTable.html";
    } else if (currentMode === "guest") {
        alert("History is not available in Guest Mode");
    } else {
        alert("Please Sign In to view history");
        window.location.href = "Sign-in.html";
    }
});
logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "Sign-in.html";
});









