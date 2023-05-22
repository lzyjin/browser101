const ground = document.querySelector('.ground');
const time = document.querySelector('.time');
const count = document.querySelector('.count');
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal .result');
const btnStart = document.querySelector('.btn-start');
const btnReStart = document.querySelector('.btn-restart');

const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_TIME_SECOND = 10;
const MODAL_TEXT = {
    replay: 'REPLAY?',
    win: 'YOU WON',
    lose: 'YOU LOST',
};

let catchedCarrotCount = 0;
let interval;
let isPlaying = false;

let audioBg = new Audio('sound/bg.mp3');
let audioCarrot = new Audio('sound/carrot_pull.mp3');
let audioBug = new Audio('sound/bug_pull.mp3');
let audioWin = new Audio('sound/game_win.mp3');
let audioAlert = new Audio('sound/alert.wav');



function initGame() {
    btnStart.querySelector('i').className = 'fa-solid fa-play';
    catchedCarrotCount = 0;
    resetCount();
    resetGround();
    closeModal();
}

function playGame() {
    playSound(audioBg);

    time.classList.remove('time--hide');
    count.classList.remove('count--hide');
    btnStart.querySelector('i').className = 'fa-solid fa-stop';

    ground.innerHTML += generatorItem('carrot', 'img/carrot.png', CARROT_COUNT);
    ground.innerHTML += generatorItem('bug', 'img/bug.png', BUG_COUNT);

    setItem();
    setTimer(GAME_TIME_SECOND);
}

function positionRandom(item) {
    let random1 = Math.random();
    let random2 = Math.random();

    item.style.top = `${ Math.trunc(random1 * 100) }%`;
    item.style.left = `${ Math.trunc(random2 * 100) }%`;
}

function generatorItem(className, imgSrc, count) {
    let content = '';

    for (let i = 0; i < count; i++) {
        content += `<img src="${imgSrc}" alt="" class="${className}">`;
    }

    return content;
}

function setItem() {
    const carrots = document.querySelectorAll('.carrot');
    const bugs = document.querySelectorAll('.bug');

    carrots.forEach(v => {
        positionRandom(v);
    });

    bugs.forEach(v => {
        positionRandom(v);
    });
}

function setTimer(timeSecond) {
    let remainingTime = timeSecond;

    interval = setInterval(() => {
        let minute = Math.floor(remainingTime / 60);
        let second = remainingTime % 60;

        if (remainingTime <= 0) {
            stopTimer(interval);
            openModal('replay');
        }

        time.textContent = `${minute}:${second}`;
        remainingTime--;

    }, 1000);
}

function stopTimer(interval) {
    clearInterval(interval);
}

function setModalText(text) {
    modalText.textContent = text;
}

function openModal(status) {
    pauseSound(audioBg);
    setModalText(MODAL_TEXT[status]);
    modal.classList.add('on');
    ground.style.pointerEvents = 'none';
}

function closeModal() {
    modal.classList.remove('on');
    ground.style.pointerEvents = 'unset';
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function pauseSound(sound) {
    sound.pause();
}

function showStartButton() {
    btnStart.classList.remove('btn-start--hide');
}

function hideStartButton() {
    btnStart.classList.add('btn-start--hide');
}

function resetCount() {
    count.textContent = '0';
}

function resetGround() {
    ground.innerHTML = '';
}


btnStart.addEventListener('click', (e) => {
    const target = e.target;

    if (isPlaying) {
        btnStart.querySelector('i').className = 'fa-solid fa-play';
        stopTimer(interval);
        pauseSound(audioBg);
        openModal('replay');

    } else {
        target.querySelector('i').className = 'fa-solid fa-stop';
        initGame();
        playGame();
    }

    isPlaying = !isPlaying;
});

ground.addEventListener('click', (e) => {
    const target = e.target;

    if (target.matches('.bug')) {
        stopTimer(interval);
        openModal('lose');
        playSound(audioBug);
        hideStartButton();
    }

    if (target.matches('.carrot')) {
        target.remove();
        catchedCarrotCount++;
        count.textContent = catchedCarrotCount;
        playSound(audioCarrot);

        if (catchedCarrotCount === 10) {
            stopTimer(interval);
            playSound(audioWin);
            openModal('win');
            hideStartButton();
        }
    }
});

btnReStart.addEventListener('click', (e) => {
    initGame();
    playSound(audioAlert);
    closeModal();
    showStartButton();

    isPlaying = false;
});


