// Global Variables needed to run the logic
export let attempt=1;
let currentString="";
let word="";
export let currentBox=1;
let max=2308
let dict;
export let row=6;
export let col=5;

//current box setter
export function setCurrentbox(int){
    currentBox=int;
}

//Function that randomly reads a word from the 'wordles.json'.
export function RandomWord() {
    fetch('./wordles.json')
        .then(response => response.json())
        .then((temp)=>{
            dict=temp;
            for(let i=0;i<dict.length;i++){
                dict[i]=dict[i].toUpperCase();
            }
            console.log(dict);
            const randomIndex=Math.floor(Math.random()*(max+1));
            console.log(randomIndex);
            word=dict[randomIndex];
            console.log(word);
        })
        .catch(err => console.error(err));
}
//Gets the user typed word when pressed enter
export function getUserInput(){
    for (let i = 1; i <= 5; i++) {
        currentString+=document.querySelector(`[data-row="${attempt}"][data-column="${i}"]`).value;
    }
    //Checks the word whether its right or wrong
    check();
}

//Check logic and colors the right box.
function check(){
    if(currentString.length!==5){
        currentString="";
        return;
    }

    let isCurrentStringinDict=checkInDict();

    if(isCurrentStringinDict===false){
        currentString="";
        for(let i=1;i<=5;i++){
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

    if(currentString===word){
        return;
    }
    currentString="";
    attempt+=1;
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
//or is it absent from the word
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












