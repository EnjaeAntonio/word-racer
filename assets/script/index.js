'use strict';

import { select, onEvent } from "./utils.js";
import { Score } from "./Score.js";

const output = select('.output p');
const startBtn = select('.start-btn');
const playAgain = select('.play-again-btn')
const resultPage = select('.result-page')
const userInput = select('.user-input');
const timer = select('.timer h3')
const pointCount = select('.count h3')
const playSong = new Audio('./assets/img/electro-pop-124340.mp3')
playSong.volume = 0.05;
const correctSound = new Audio('./assets/img/ding-126626.mp3')
const startSound = new Audio('./assets/img/start-13691.mp3')


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
        let timeLeft = 30;
        let timeExpire = setInterval(function(){
            timeLeft -= 1;
            timer.innerText = `Time: ${timeLeft}`
           
            if(timeLeft <= 0){
                clearInterval(timeExpire)   
                getScore()

            }  
            if(onEvent('click', playAgain, function(){
                clearInterval(timeExpire)
            })){
            }

        }, 1000)
}


    onEvent('click', startBtn, function(){

        startTimer();    
        playSong.play();
        startSound.play();
        userInput.value = '';
        startBtn.style.visibility = 'hidden'

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
    
                        currentWord = randomWord;
                        arr.push(currentWord)
    
                    } else if (output.innerText !== userInput.value) {
                        userInput.value = '';
                    } else {
                        getScore()
                    }
        }
        });
    })



function getScore(){

    playSong.pause()
    playSong.currentTime = 0;
    playAgain.classList.add('bounce')
    let newDate = new Date();
    let todaysDate = newDate.toDateString();


    let percentage = (points / words.length) * 100
    let newPerc = percentage.toFixed(2)

    const newScore = new Score(todaysDate, points, newPerc);
    resultPage.classList.remove('hidden')
    resultPage.classList.add('visible')
    resultPage.innerHTML = `  
    <div class="result-card">
        <div class="results">
            <h2>Results!</h2>
            <h3>Date: <span>${newScore.date}</span></h3>
            <h3>Points: <span>${newScore.points}</span></h3>
            <h3>Percentage: You hit <span>${newScore.percentage}%</span> out of 90 words!</h3>
            <div class="btn-result-wrapper">
            </div>
        </div>
    </div>
`
  

    
}

onEvent('click', playAgain, function(){
    playSong.pause()
    playSong.currentTime = 0;

    playAgain.classList.remove('bounce')

    userInput.value = '';
    startSound.play()
    startBtn.style.visibility = 'visible'

    resultPage.classList.remove('visible')
    resultPage.classList.add('hidden')

    output.innerHTML = `<p>Click start to play!</p>`;
    points = 0;
    let timeLeft = 30;
    clearInterval(timeLeft)
    timer.innerText = `Time: ${timeLeft}`
    pointCount.innerText = `Points: ${points}`
})



