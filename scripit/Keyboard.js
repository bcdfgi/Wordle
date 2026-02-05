import {currentBox, attempt, getUserInput, setCurrentbox} from './WordleLogic.js';
import {currentBox_to_rowcolElement} from "./utilis/misllanclous.js";
import {gameConfig} from './config.js';

//Let the user typed input into the boxes
export function handleKey(key){
    console.log(key);
    if(key==="Backspace"){
        const rowStart = gameConfig.columns * (attempt - 1) + 1;
        if (currentBox > rowStart) {
            setCurrentbox(currentBox - 1);           // move left first
            currentBox_to_rowcolElement().value = ""; // clear that box
        } else {
            currentBox_to_rowcolElement().value = ""; // clear first cell if you want
        }
        return;
    }

    if(key==="Enter"){
        getUserInput();
        return;
    }

    if(currentBox!==gameConfig.columns*attempt+1){
        if(/^[a-zA-Z]$/.test(key)){
            currentBox_to_rowcolElement().value=key.toUpperCase();
            setCurrentbox(currentBox+1);
        }
    }

}