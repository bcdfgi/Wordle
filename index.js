
let attempt=1;
let currentString="";
let word="APPLE";


document.getElementById('box1').focus();

readyBox();



function readyBox(){
    for (let i = 5*(attempt-1)+1; i <= 5*attempt; i++) {
        document.getElementById(`box${i}`).addEventListener("keydown", function(event){

            if(event.key==="Enter"){
                getUserInput();
            }


        })

        document.getElementById(`box${i}`).addEventListener("keyup",function(event){
            if(i!==5*attempt){
                let Box=document.getElementById(`box${i}`);
                if(Box.value.length>=Box.maxLength){
                    document.getElementById(`box${i+1}`).focus();
                }
            }

            if(event.key==="Backspace") {
                if (i !== 5 * (attempt - 1) + 1 ) {
                    document.getElementById(`box${i - 1}`).focus();
                }
            }
        })
    }

}

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


function getUserInput(){

    currentString = "";
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

        let box=document.getElementById(`box${5*(attempt-1)+1+i}`);
        if(result==="correct"){
            box.style.backgroundColor="#538d4e";
            let key=document.getElementById(currentString[i]);
            key.style.backgroundColor="#538d4e";
        }else if(result==="present" ){
            box.style.backgroundColor="#b59f3b";
            let key=document.getElementById(currentString[i]);
            key.style.backgroundColor="#b59f3b";
        }
        else{
            box.style.backgroundColor="#3a3a3c";
            let key=document.getElementById(currentString[i]);
            key.style.backgroundColor="#3a3a3c";
        }

        box.readOnly=true;
    }

    if(currentString===word){
        return;
    }

    currentString="";
    document.getElementById(`box${5*attempt+1}`).focus();
    attempt+=1;

    for (let i = 5*(attempt-1)+1; i <= 5*attempt; i++) {
       document.getElementById(`box${i}`).readOnly=false;
    }

    readyBox();

}










