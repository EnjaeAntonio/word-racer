'use strict';

import { select, onEvent } from "./utils.js";
import { Score } from "./Score.js";

const output = select('.output p');
const startBtn = select('.start-btn');
const playAgainBtn = select('.play-again')
const playAgainBtnScreen = select('.play-again-result-btn')
const userInput = select('.user-input');
const timer = select('.timer h3')
const pointCount = select('.count h3')
const playSong = new Audio('./assets/img/electro-pop-124340.mp3')
playSong.volume = 0.15;
const correctSound = new Audio('./assets/img/ding-126626.mp3')
const wrongSound = new Audio('./assets/img/wrong-47985.mp3')
const winResult = select('.win-result')
const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
'keyboard', 'window'];

let shuffleWords = words.sort(() => Math.random() - 0.5);
let timeLeft = 3;
let points = 0;
let currentWord = '';
const arr = []

function getRandomWord(arr){
    for (let i = 0; i < words.length; i++) {
        arr[i] = Math.floor(Math.random() * arr.length);
        return arr[arr[i]]
    }
}

function startTimer(){
        // Start Timer
        let timeExpire = setInterval(function(){
            timeLeft -= 1;
            timer.innerText = `Time: ${timeLeft}`
    
            if(timeLeft <= 0){
                clearInterval(timeExpire)
                getScore()
            }
        }, 1000)
}


onEvent('click', startBtn, function(){

    startTimer();    
    playSong.play();
    let randomWord = getRandomWord(words)
    output.innerText = randomWord

    addEventListener('keydown', function(event){

        if(event.keyCode == 13){
            event.preventDefault();
                if(output.innerText == userInput.value){
                    correctSound.play()
                    userInput.value = '';
                    output.innerText = `${randomWord = getRandomWord(words)}`;
                    points++
                   
                    pointCount.innerText = `Points: ${points}`

                    let wordIndex = Math.floor(Math.random()*words.length)

                    currentWord = randomWord;

                    arr.push(currentWord)

                    currentWord.slice(wordIndex, 1)
                } else if (output.innerText !== userInput.value) {
                    wrongSound.play()
                } else {
                    getScore()
                }
    }
    });
})

function getScore(){

    var newPoints = points;
    console.log(points)
    let newDate = new Date();
    let todaysDate = newDate.toDateString();

    let percentage = (100 * newPoints) / words.length;
    let newPerc = percentage.toFixed(2)

    const newScore = new Score(todaysDate, newPoints, newPerc);

    winResult.classList.add('visible')

    winResult.innerHTML = `   <div class="result-btn">

                                <h4>${todaysDate}</h4>
                                <h4>${newPoints}</h4>
                                <h4>${newPerc}</h4>
                                <button class="play-again-result-btn">Play again?</button>
                            </div>`
    
}

onEvent('click', playAgainBtnScreen, function(){
    winPage.classList.remove('visible')
    winPage.classList.add('win-result')
})
