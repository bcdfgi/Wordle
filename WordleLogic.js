// Global Variables needed to run the logic
let attempt=1;
let currentString="";
let word="";
let currentBox=1;
let max=2308

//Function that randomly reads a word from the 'wordles.json'.
RandomWord();

//Reads keyboard input from the user and puts it in the right box
document.addEventListener("keydown",handleKey);

//Assigns the virtual keyboard buttons its function like clicking the button 'Q', lets the user type 'Q' in the box
for(let i=65; i<=90;i++){
    let letter=String.fromCharCode(i);
    let key=document.getElementById(`${letter}`);
    key.addEventListener("click",function(){
        if(currentBox!==5*attempt+1){
            document.getElementById(`box${currentBox}`).value=letter;
            currentBox++;
        }
    });
}

//Function that randomly reads a word from the 'wordles.json'.
function RandomWord() {
    fetch('./wordles.json')
        .then(response => response.json())
        .then(words => {
            console.log(words);
            const randomIndex=Math.floor(Math.random()*(max+1));
            console.log(randomIndex);
            word=words[randomIndex].toUpperCase();
            console.log(word);
        })
        .catch(err => console.error(err));
}



//Assigns the virtual Keyboard Enter button function
function KeyboardEnter(){
    getUserInput();
}


//Assigns the virtual Keyboard Backspace button function
function KeyboardBackspace() {
    if(currentBox!==5*(attempt-1)+1){
        document.getElementById(`box${currentBox}`).value='';
        currentBox--;
    }else if(currentBox===5*(attempt-1)+1){
        document.getElementById(`box${currentBox}`).value='';
    }

}

//Let the user typed input into the boxes
function handleKey(event){
    if(event.key==="Backspace"){
        if(currentBox!==5*(attempt-1)+1){
            document.getElementById(`box${currentBox}`).value='';
            currentBox--;
        }else if(currentBox===5*(attempt-1)+1){
            document.getElementById(`box${currentBox}`).value='';
        }
        return;
    }

    if(event.key==="Enter"){
        getUserInput();
        return;
    }

    if(currentBox!==5*attempt+1){
        if(/^[a-zA-Z]$/.test(event.key)){
            document.getElementById(`box${currentBox}`).value = event.key.toUpperCase();
            currentBox++;
        }
    }

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

//Gets the user typed word when pressed enter
function getUserInput(){
    for (let i = 5*(attempt-1)+1; i <= 5*attempt; i++) {
        currentString+=document.getElementById(`box${i}`).value;
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

    currentString=currentString.toUpperCase();

    console.log(currentString);

    for(let i=0;i<currentString.length;i++){
        let result=match(currentString[i],i);

        let box=document.getElementById(`box${5*(attempt-1)+1+i}`);
        let key=document.getElementById(currentString[i]);
        if(result==="correct"){
            box.style.backgroundColor="#538d4e";
            key.style.backgroundColor="#538d4e";
        }else if(result==="present" ){
            box.style.backgroundColor="#b59f3b";
            key.style.backgroundColor="#b59f3b";
        }
        else{
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












