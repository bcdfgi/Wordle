import * as logic from "../WordleLogic.js";

export function currentBox_to_rowcolElement(){
    let data_row=Math.ceil(logic.currentBox/logic.col);
    let data_col=((logic.currentBox - 1) % logic.col) + 1;
    return document.querySelector(`[data-row="${data_row}"][data-column="${data_col}"]`);
}