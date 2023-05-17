const game = document.querySelector('#game');
const ground = document.querySelector('.ground');
const time = document.querySelector('.time');
const count = document.querySelector('.count');
const modal = document.querySelector('.modal');
const btnStart = document.querySelector('.btn-start');
let numberOfCarrots = 0;
let interval;


// 계속 흘러나오고 있는 배경음
let audioBg = new Audio('sound/bg.mp3');

// 당근 클릭하면 나오는 효과음:
let audioCarrot = new Audio('sound/carrot_pull.mp3');

// 벌레 클릭하면 나오는 효과음
let audioBug = new Audio('sound/bug_pull.mp3');

// 게임 이겼을 때 나오는 효과음
let audioWin = new Audio('sound/game_win.mp3');

// 재시작버튼 클릭하면 나오는 효과음
let audioAlert = new Audio('sound/alert.wav');




// 무작위 위치에 놓음
function setRandomPosition(item) {
    let random1 = Math.random();
    let random2 = Math.random();

    item.style.top = `${ Math.trunc(random1 * 100) }%`;
    item.style.left = `${ Math.trunc(random2 * 100) }%`;
}


// 당근, 벌레 생성
function generatorItem() {
    let content = '';
    for (let i = 0; i < 10; i++) {
        content += `
            <img src="img/carrot.png" alt="" class="carrot">
            <img src="img/bug.png" alt="" class="bug">
        `;
    }

    ground.innerHTML = content;
}


// 당근, 벌레 랜덤 배치
function setItem() {
    const carrots = document.querySelectorAll('.carrot');
    const bugs = document.querySelectorAll('.bug');
    carrots.forEach(v => {
        setRandomPosition(v);
    });

    bugs.forEach(v => {
        setRandomPosition(v);
    });
}


// 모달 띄움
function openModal(isWon) {
    let msg = '';
    audioBg.pause();
    // btnStart.style.display = 'none';

    if (isWon) {
        msg = 'You Won 🎉';
        audioWin.play();
    } else {
        msg = 'You Lose';
    }

    modal.querySelector('.result').textContent = msg;
    modal.classList.add('on');
}

// 모달 없앰
function closeModal() {
    modal.classList.remove('on');
}

// 게임 시작
function startGame() {
    audioBg.play();

    btnStart.querySelector('i').className = 'fa-solid fa-stop';
    numberOfCarrots = 0;
    count.innerHTML = '0';
    time.innerHTML = '00:10';

    closeModal();
    generatorItem();
    setItem();

    let dateFrom = new Date();
    dateFrom.setTime(dateFrom.getTime() + 10000);

    interval = setInterval(() => {
        const today = new Date();
        let distance = dateFrom.getTime() - today.getTime();
        let distanceSeconds = Math.round(distance / 1000);

        time.textContent = `00:${distanceSeconds < 10 ? '0' + distanceSeconds : distanceSeconds}`;

        if (distance < 0) {
            clearInterval(interval);
            openModal(false);
        }

    }, 1000);
}




// 당근, 벌레 클릭 인식
game.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('btn-start')) {
        target.classList.toggle('is-playing');

        if ( target.classList.contains('is-playing') ) {
            target.querySelector('i').className = 'fa-solid fa-stop';
            startGame();
        } else {
            btnStart.querySelector('i').className = 'fa-solid fa-play';
            clearInterval(interval);
            count.innerHTML = '0';
            time.innerHTML = '00:10';
            ground.innerHTML = '';
            audioBg.load();
        }

    }

    if (target.classList.contains('btn-restart')) {
        // btnStart.style.display = 'block';
        btnStart.querySelector('i').className = 'fa-solid fa-play';
        count.innerHTML = '0';
        time.innerHTML = '00:10';
        ground.innerHTML = '';
        audioAlert.play();
        closeModal();
    }

    if (target.classList.contains('bug')) {
        clearInterval(interval);
        openModal(false);
        audioBg.load();
        audioBug.play();
    }

    if (target.classList.contains('carrot')) {
        target.remove();
        numberOfCarrots++;
        count.innerHTML = numberOfCarrots;
        audioCarrot.play();

        if (numberOfCarrots === 10) {
            clearInterval(interval);
            openModal(true);
        }
    }

});
