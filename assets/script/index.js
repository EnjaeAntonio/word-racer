'use strict';

/*****************************************
        Imports
*****************************************/
import { select, onEvent } from "./utils.js";
import { Score } from "./Score.js";


/*****************************************
        Variables
*****************************************/

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
correctSound.volume = 0.5
const startSound = new Audio('./assets/img/start-13691.mp3')
const car = document.getElementById('my-car');
const leaderboard = select('.leaderboard-card');
const leaderboardWrapper = select('.leaderboards')
const showScores = select('.high-scores');
const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
'banana'];



let points = 0;
let currentWord = '';
const arr = []



/*****************************************
        Clearing inputs
*****************************************/

userInput.value = '';
userInput.disabled = true;


/*****************************************
        Random Word Function
*****************************************/
function getRandomWord(arr){
    for (let i = 0; i < words.length; i++) {
        arr[i] = Math.floor(Math.random() * arr.length);
        return arr[arr[i]]
    }
}

/*****************************************
        Timer Function
*****************************************/

function startTimer(){
    // Start Timer
    let timeLeft = 60;
    let countDown = 4;
    let countDownExpire = setInterval(function(){
        countDown -= 1;
        output.innerText = `${countDown}`
        if(countDown <= 0) {

            
                car.classList.remove('hide-car');
                car.classList.add('anim');

                clearInterval(countDownExpire);
                let randomWord = getRandomWord(words);
                output.innerText = randomWord;

                let timeExpire = setInterval(function(){
                    timeLeft -= 1;
                    timer.innerHTML = `<i class="fa-solid fa-clock"></i>  ${timeLeft}s`

                    if(timeLeft <= 0){
                        clearInterval(timeExpire)   
                        getScore()
                    }  
                    if(onEvent('click', playAgain, function(){
                        clearInterval(timeExpire)
                    }));
        
                }, 1000)
        }
            }, 1000)
        }



/*****************************************
        Start button
*****************************************/

const userWords = [];
onEvent('click', startBtn, function(){

        // Making sure values are reset and audio plays
        userInput.value = '';
        userInput.disabled = false;
        startBtn.style.visibility = 'hidden';

        startTimer();    
        playSong.play();
        startSound.play();


        // Getting random word
        let randomWord = getRandomWord(words);
        
        // Comparing the random word and user inputs value
        addEventListener('keyup', function(event){
    
                event.preventDefault();
                    if(output.innerText == userInput.value){
                        correctSound.play();
                        userInput.value = '';
                        output.innerText = `${randomWord = getRandomWord(words)}`;
    
                        points++
                        pointCount.innerText = `Points: ${points}`
    
                        currentWord = randomWord;
                        userWords.push(currentWord);
                        currentWord.slice(1)
                        console.log(userWords)
    
                    } else if (output.innerText !== userInput.value) {

                    } else {
                        getScore()
                    }
        });
    })



/*****************************************
        Leaderboard
*****************************************/

// Creating a local storage for high scores
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

function getScore(){

    // Resetting values 
    userInput.value = '';
    userInput.disabled = true;

    playSong.pause()
    playSong.currentTime = 0;

    playAgain.classList.add('bounce');
    playAgain.classList.remove('hidden');
    startBtn.classList.add('hidden');

    car.classList.remove('anim');
    car.classList.add('hide-car');

    // Creating values
    let newDate = new Date();
    let todaysDate = newDate.toDateString();
    let percentage = (points / words.length) * 100
    let newPoints = points.toString().padStart(2, '0');
    let newPerc = percentage.toFixed(2);

    const newScore = new Score(todaysDate, points, newPerc);

    resultPage.classList.remove('hidden');
    resultPage.classList.add('visible');
    resultPage.innerHTML = `  
    <div class="result-card">
        <div class="results">
            <h2>Results!</h2>
            <h3>Date: <span>${newScore.date}</span></h3>
            <h3>Points: <span>${newScore.points}</span></h3>
            <h3>Percentage: <span>You hit ${newScore.percentage}% out of ${words.length} words!</span></h3>
            <div class="btn-result-wrapper">
            </div>
        </div>
    </div>
`;


// Creating my leaderboard 

leaderboardWrapper.classList.remove('hidden');

const score = {
    score: newPoints,
    percentage: newPerc
};

// Pushing and sorting my score object into an array
highScores.push(score);

highScores.sort((a,b) => b.score - a.score);

highScores.splice(9);

localStorage.setItem('highScores', JSON.stringify(highScores));

displayScores();

};

/*****************************************
        Display the leaderboard
*****************************************/

function displayScores(){
let index = 1;

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    leaderboard.innerHTML = highScores.map(score => {
        return `<div class="entree">
                    <li> #<span>${index++}</span></li>
                    <li> Score: <span>${score.score}</span></li>
                    <li> Percent: <span>${score.percentage}%</span></li>
                </div>`
    }).join('');
};

displayScores()

onEvent('click', showScores, function(){
    leaderboardWrapper.classList.remove('hidden');
    displayScores();
});

onEvent('click', leaderboardWrapper, function(){
    leaderboardWrapper.classList.add('hidden');
})

/*****************************************
        Play Again Function
*****************************************/
onEvent('click', playAgain, function(){
    playSong.pause()
    playSong.currentTime = 0;
    startBtn.style.visibility = 'visible';

    playAgain.classList.remove('bounce');
    playAgain.classList.add('hidden');
    userInput.value = '';
    startSound.play();
    
    car.classList.remove('anim');
    car.classList.add('hide-car');

    resultPage.classList.remove('visible');
    resultPage.classList.add('hidden');

    leaderboardWrapper.classList.add('hidden');

    points = 0;
    let timeLeft = 60;
    clearInterval(timeLeft)
    timer.innerHTML = `<i class="fa-solid fa-clock"></i>  ${timeLeft}s`
    pointCount.innerText = `Points: ${points}`

    userInput.value = '';
    userInput.disabled = false;
    startTimer();    
    playSong.play();
    startSound.play();
    userInput.value = '';
    startBtn.style.visibility = 'hidden'

   
    let randomWord = getRandomWord(words)

    addEventListener('keyup', function(event){

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

                } else {
                    getScore()
                }
    });
    
});

