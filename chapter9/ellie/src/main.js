'use strict';

import Popup from './popup.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
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



// ⭐️ 랜덤숫자를 이렇게 간단하게 만들 수 있다는걸 기억하자!
function randomNumber (min, max) {
    return Math.random() * (max - min) + min;
}

function initGame () {
    score = 0;
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;

    // 벌레와 당근을 생성한 뒤 field에 추가
    // console.log(fieldRect);

    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath) {
    // ⭐️ 이렇게 당근과 벌레가 놓일 공간의 시작좌표와 끝좌표를 정하는 방법도 있다.
    // 특히 공간 바깥으로 안빠져나가도록 끝 범위에서 당근 사이즈만큼 빼주는게 포인트!
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';

        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);

        item.style.left = `${x}px`;
        item.style.top = `${y}px`;

        field.appendChild(item);
    }
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



function onFieldClick (event) {
    // 함수 안에서 조건에 맞지 않을때 빨리 함수를 종료하는 것이 중요하다
    if (!started) {
        return;
    }

    const target = event.target;
    if (target.matches('.carrot')) {
        // 당근
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();

        if (score === CARROT_COUNT) {
            finishGame(true);
        }

    } else if (target.matches('.bug')) {
        // 벌레
        finishGame(false);
    }
}

gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
});

field.addEventListener('click', onFieldClick);




// 엘리 솔루션 따라 치면서 느낀점
// 함수를 기능 하나씩마다 다 따로 만드는구나...
