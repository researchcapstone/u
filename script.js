const inputs = document.querySelector(".input");
guessBtn = document.querySelector(".guess-btn");
question = document.querySelector(".question span");
guessLeft = document.querySelector(".guess-left span");
coins = document.querySelector(".coins span");
notif = document.querySelector(".notif span");
hintDisplay = document.querySelector(".hints-left span");

const maxlife = 3;
let life = maxlife;
let letter = 4;
coins.innerText = 5000;    
let hintCount = 3;

let charBox_value = [];
let word = "";
let lastWord = 0;
// GET RANDOM WORD
function randomWord() {

    if (coins.innerText == 0){
        window.location.href = "index.html"; 
    }
    indexRan = Math.floor(Math.random() * wordList.length);
    let isNew = false;
    while(!isNew){
        if (indexRan == lastWord){
            indexRan = Math.floor(Math.random() * wordList.length);
        }
        else{
            isNew = true;
        }
    }
    
    let ranObj = wordList[indexRan];
    lastWord = indexRan;
    word = ranObj.word;

    hintCount = 3;
    hintDisplay.innerHTML = hintCount;
    
    question.innerText = ranObj.question;
    
    // STATS
    guessLeft.innerText = life;    
    
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += '<input class="charBox" id="' + i + '" type="text" maxlength="1" readonly>';
        let charVal = [];
        
        // INSERT VALUE IN charBox_value
        for (let j = 0; j < letter; j++) {
            if (j == 0){
                charVal[j] = word[i].toUpperCase();
            }
            else{
                charVal[j] = String.fromCharCode(65+Math.floor(Math.random() * 26));
            }
            
        }
        charBox_value.push({
            charBox: i,
            value: charVal
        });     
    } 
    inputs.innerHTML = html;
    
    // ASSIGN VALUE IN charBox
    for (let i = 0; i < word.length; i++) {
        document.getElementById(i).value=charBox_value[i].value[Math.floor(Math.random() * letter)];
    }

    // SETUP SWIPE
    let gestureZone = document.querySelectorAll(".charBox");

    gestureZone.forEach(function(elem) {
        
        elem.addEventListener('touchstart', function(event) {
            touchstartX = event.changedTouches[0].screenX;
            touchstartY = event.changedTouches[0].screenY;
        }, false);
        
        elem.addEventListener('touchend', function(event) {
            touchendX = event.changedTouches[0].screenX;
            touchendY = event.changedTouches[0].screenY;
            if (elem.disabled == false) {
                gesture = handleGesture(event);
                switchChar(gesture, elem);
            }
        }, false);
        
    
    });

    
}

randomWord();

function guessWord() {
    // CONSTRUCT CREATED WORD IN INPUT 
    let wordUser = "";
    let charBox = document.querySelectorAll(".charBox");
    charBox.forEach(function(elem) {
        wordUser += elem.value
    })
    if (wordUser == word){
        coins.innerText = parseInt(coins.innerText) + 500;
        notif.innerText = "+ 500";
        randomWord();
    }
    else{
        if (life > 0){
            life--;
            guessLeft.innerText = life;
            if (life == 0){
                coins.innerText = parseInt(coins.innerText) - 250;
                notif.innerText = "- 250";
                setTimeout(function(){
                    life = maxlife;
                    randomWord();
                }, 3000);
            }
        }     
    }
    setTimeout(function(){
        notif.innerText = "";
    }, 3000);
    
}

function switchChar(gesture, elem) {
    let indexElem = 0; // ID
    let currentIndex = 0; // Index of Value
    for (let i = 0; i < charBox_value.length; i++) {
        if (charBox_value[i].charBox == elem.id){
            indexElem = i;            
        }     
    }
    for (let i = 0; i < charBox_value[indexElem].value.length; i++) {
        if (charBox_value[indexElem].value[i] == elem.value){
            currentIndex = i;            
        }     
    }
    if (gesture == "up"){
        if (currentIndex == (charBox_value[indexElem].value.length - 1)){
            elem.value=charBox_value[indexElem].value[0];
        }
        else{
        elem.value=charBox_value[indexElem].value[currentIndex + 1];
        }
    }
    else if (gesture == "down"){
        if (currentIndex == 0){
            elem.value=charBox_value[indexElem].value[(charBox_value[indexElem].value.length - 1)];
        }
        else{
        elem.value=charBox_value[indexElem].value[currentIndex - 1];
        
        }
        
    }
}

// SWIPE

let pageWidth = window.innerWidth || document.body.clientWidth;
let treshold = Math.max(1,Math.floor(0.01 * (pageWidth)));
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const limit = Math.tan(45 * 1.5 / 180 * Math.PI);

function handleGesture(e) {
    let x = touchendX - touchstartX;
    let y = touchendY - touchstartY;
    let xy = Math.abs(x / y);
    let yx = Math.abs(y / x);
    if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
        if (xy <= limit) {
            if (y < 0) {
  
                return "up";
            } else {

                return "down";
            }
        }
    } else {
        return "up";
    }
}

function hintFunc(){
    if (hintCount <= 0 || coins <= 0){
        return;
    }
    let boxes = document.querySelectorAll(".charBox");
    let index = Math.floor(Math.random() * (word.length - 1));

    let indexElem = 0; // ID
    
    for (let i = 0; i < charBox_value.length; i++) {
        if (charBox_value[i].charBox == index){
            indexElem = i;            
        }     
    }
    
    boxes.forEach(function(elem) {
        if (elem.disabled && elem.id == index){
            hintFunc();
        }
        else if(elem.id == index){
            elem.value = charBox_value[indexElem].value[0];
            elem.setAttribute('disabled', true);
            hintCount--;
            coins.innerText = parseInt(coins.innerText) - 250;
            
            hintDisplay.innerHTML = hintCount;
        }
    });
}

// BTN
guessBtn.addEventListener("click", guessWord);

// Get the modal
var modal = document.getElementById("myModal");
var btn = document.querySelector(".hint");
var span = document.getElementsByClassName("close")[0];
var hint = document.querySelector(".hint-want");

btn.addEventListener("click", function(){
    modal.style.display = "block";
});

span.onclick = function() {
  modal.style.display = "none";
}
hint.onclick = function() {
    modal.style.display = "none";
    hintFunc();
}
  

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}