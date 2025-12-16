


let attempt=1;
let currentString="";
let word="APPLE";

readyBox();



function readyBox(){
    for (let i = 5*(attempt-1)+1; i <= 5*attempt; i++) {
        document.getElementById(`box${i}`).addEventListener("keydown", function(event){
            if(event.key==="Enter"){
                getUserInput();
            }
        })
    }

}

function match(letter, index){
    if(word[index]===letter){
        return "correct";
    }

    for(let i=0;i<word.length;i++){
        if(word[i]===letter){
            return "present";
        }
    }

    return "absent";
}


function getUserInput(){
    for (let i = 5*(attempt-1)+1; i <= 5*attempt; i++) {
        currentString+=document.getElementById(`box${i}`).value;
    }

    if(currentString.length!==5){
        return;
    }

    currentString=currentString.toUpperCase();

    console.log(currentString);

    for(let i=0;i<currentString.length;i++){
        let result=match(currentString[i],i);

        if(result==="correct"){
            let box=document.getElementById(`box${5*(attempt-1)+1+i}`);
            box.style.backgroundColor="#538d4e";
        }else if(result==="present"){
            let box=document.getElementById(`box${5*(attempt-1)+1+i}`);
            box.style.backgroundColor="#b59f3b";
        }else{
            let box=document.getElementById(`box${5*(attempt-1)+1+i}`);
            box.style.backgroundColor="#3a3a3c";
        }
    }

    if(currentString===word){
        return;
    }

    currentString="";
    attempt+=1;

    for (let i = 5*(attempt-1)+1; i <= 5*attempt; i++) {
       document.getElementById(`box${i}`).readOnly=false;
    }

    readyBox();

}

