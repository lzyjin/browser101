'use strict';

import Popup from './popup.mjs';
import Field from './field.mjs';

const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

// ⭐️ 변수명을 그냥 popup으로 하지 말고 무슨 역할을 하는지 알 수 있게 명명하기.
const gameFinishBanner = new Popup();

gameFinishBanner.setClickListener(() => {
    startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick (item) {
    // ⭐️　함수 안에서 조건에 맞지 않을때 빨리 함수를 종료하는 것이 중요하다
    if (!started) {
        return;
    }

    if (item === '.carrot') {
        score++;
        updateScoreBoard();

        if (score === CARROT_COUNT) {
            finishGame(true);
        }

    } else if (item === '.bug') {
        finishGame(false);
    }
}




function startGame () {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}

function stopGame () {
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText('REPLAY?');
    playSound(alertSound);
    stopSound(bgSound);
}

function finishGame (win) {
    started = false;
    hideGameButton();
    stopGameTimer();

    if (win) {
        playSound(winSound);
    } else {
        playSound(bugSound);
    }

    stopSound(bgSound);
    gameFinishBanner.showWithText(win ? 'YOU WON 🎉' : 'YOU LOST 👎');
}


function initGame () {
    score = 0;
    gameScore.innerText = CARROT_COUNT;
    gameField.initGame();
}



function showStopButton () {
    const icon = gameBtn.querySelector('.fas');

    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');

    gameBtn.style.visibility = 'visible';
}

function hideGameButton () {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore () {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

// ⭐️ 시간에 따라 분과 초 나타내기
function updateTimerText (time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    gameTimer.innerText = `${minutes}:${seconds}`;
}

function startGameTimer () {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);

    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(score === CARROT_COUNT);
            return;
        }

        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function stopGameTimer () {
    clearInterval(timer);
}

function updateScoreBoard () {
    gameScore.innerText = CARROT_COUNT - score;
}

function playSound (sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound (sound) {
    sound.pause();
}


gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
});





// 엘리 솔루션 따라 치면서 느낀점
// 함수를 기능 하나씩마다 다 따로 만드는구나...
