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
const wrongSound = new Audio('./assets/img/negative_beeps-6008.mp3')

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

var randomWord = words.sort(() => Math.random() - 0.5);
console.log(randomWord)
var nextWord = randomWord[0 + 1]
console.log(nextWord)
var timeLeft = 100;
var points = 0;

const arr = []

onEvent('click', startBtn, function(){
    output.innerText = randomWord[0 + 1];
    
    // Start Timer
    let timeExpire = setInterval(function(){
        timeLeft -= 1;
        timer.innerText = `Time: ${timeLeft}`

        if(timeLeft <= 0){
            clearInterval(timeExpire)
            output.innerText = `Time is up!`
        }
    }, 1000)

    console.log('song playing')
    // playSong.play() 

})

addEventListener('keydown', function(event){
    let newDate = new Date();
    let todaysDate = newDate.toDateString();


    if(event.keyCode === 13){
        event.preventDefault();
    if(userInput.value == output.innerText){
        
    }

    }
    
}
);
function createScore(){
 
let percentage = (100 * newPoints) / words.length;
let newPerc = percentage.toFixed(2)

const newScore = new Score(todaysDate, newPoints, newPerc);
console.log(newScore.getInfo())

}

createScore()    
