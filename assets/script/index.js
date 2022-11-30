'use strict';

import { select, onEvent } from "./utils.js";
import { Score } from "./Score.js";

const output = select('.output p');
const startBtn = select('.start-btn');
const playAgainBtn = select('.play-again');
const userInput = select('.user-input');
const timer = select('.timer h3')
const pointCount = select('.count h3')
const playSong = new Audio('./assets/img/electro-pop-124340.mp3')
playSong.volume = 0.15;
const correctSound = new Audio('./assets/img/ding-126626.mp3')
const wrongSound = new Audio('./assets/img/wrong-47985.mp3')
const resultPage = select('.win-result')
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
let timeLeft = 10;
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
                output.innerText = `Time is up!`
                resultPage.style.visibility = 'visible'
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

        resultPage.style.visibility = 'visible'

        resultPage.innerHTML = `
        <div class="result-btn">
                <h2>Date: ${todaysDate}</h2>
                <h2>Your Points: ${newPoints}</h2> 
                <h2>Percentage: ${newPerc}</h2>
                <button class="button" id="play-again-win"> Play Again? </button>
        `
    
}

// onEvent('click', playAgainBtn, function(){

// })