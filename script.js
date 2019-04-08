
const Colors = ['red', 'blue', 'green', 'yellow'];
const num = document.getElementById('num');
var counter = 0;
var state = false;
var player = [];
var simon = [];
var pick = 'blue';
var item = 0;
var time = 2000;
var isStrict= false;
var curr;
var audiored = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var audiogreen = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var audioblue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audioyellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');

function simonGame(){
    if(player.length===20){
        reset(false);
    }else if(player.length===simon.length){
        let x = sequence();
        simon.push(x);
        num.innerHTML = 'Stage : '+simon.length;
        item = 0;
       print(item);
        time -= 50;
        player = [];
        counter = 0;
    }else{
        counter++;
    }
}

function print(i){
    state = false;
    setTimeout(function(){
        blink(simon[i]);
        if(++i != simon.length){
            print(i);
        }else{state = true;}
    },time)
}

function sequence(arr) {
   do{
        curr = Colors[Math.floor(Math.random()*4)];
   }while(curr===pick);
    pick = curr;
    return pick;
}
function isClick(input) {
    if(simon[counter]!=input && state === true && isStrict===true){
        counter = 0;
        audiored.play();
        audioblue.play();
        audiogreen.play();
        reset(true);
    }else if(simon[counter]!=input && state===true){
       audiored.play();
       audioblue.play();
       audiogreen.play();
       item = 0;
       player = [];
       counter = 0;
       print(item);
   }else if(state){
       blink(input);
       player.push(input);
       simonGame();
   }
}

function reset(pass){
    player = [];
    simon = [];
    counter = 0;
    time = 2000;
    (pass)? simonGame() : gameover();
}

function gameover(){
    state = false;
    num.innerHTML = 'You Won';
}

function blink(input){
    document.getElementById(input).style.background = 'black';
    setTimeout(function(){
        document.getElementById(input).style.background = input;
    } ,300);
    switch(input){
        case 'red' :
            audiored.play();
            break;
            
        case 'blue' :
            audioblue.play();
            break;
            
        case 'green' :
            audiogreen.play();
            break;
            
        case 'yellow' :
        audioyellow.play();
            break;
    }
}

function strict(){
    if(isStrict){
        isStrict = false;
    }else{
        isStrict = true;
    }
    reset(true);
}

