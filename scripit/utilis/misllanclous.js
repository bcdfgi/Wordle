import * as logic from "../WordleLogic.js";
import {gameConfig} from "../config.js";

export function currentBox_to_rowcolElement(){
    let data_row=Math.ceil(logic.currentBox/gameConfig.columns);
    let data_col=((logic.currentBox - 1) % gameConfig.columns) + 1;
    return document.querySelector(`[data-row="${data_row}"][data-column="${data_col}"]`);
}