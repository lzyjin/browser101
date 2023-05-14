const game = document.querySelector('#game');
const ground = document.querySelector('.ground');
const time = document.querySelector('.time');
const count = document.querySelector('.count');
let timeLimit = 10000;
let numberOfCarrots = 0;
// const isPlaying = false;


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




// 당근, 벌레 클릭 인식
game.addEventListener('click', (e) => {
    const target = e.target;

    let interval;
    let timeout;

    if (target.classList.contains('btn-start') || target.classList.contains('btn-restart')) {
        generatorItem();
        setItem();

        // 타이머 10초에서 시작해서 1초씩 줄어듦
        // 남은 초를 화면에 표시
        // 10초가 되면 실패 처리와 동일하게 처리.

        // interval = setInterval(() => {
        //     timeLimit = timeLimit - 1000;
        //     time.textContent = `00:${timeLimit / 1000}`;
        // }, 1000);

        // timeout = setTimeout(() => {}, 1000);
    }

    if (target.classList.contains('bug')) {
        alert('실패!');
        // 1. 타이머 멈춤
        // 2. 실패 팝업 띄우기
    }

    if (target.classList.contains('carrot')) {
        target.remove();
        numberOfCarrots++;
        count.textContent = numberOfCarrots;

        // count.textContent가 '10'이면
        // 타이머 멈추고, 성공 팝업 띄우기
    }


});


// 시작 버튼 클릭