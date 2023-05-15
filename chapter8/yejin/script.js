const game = document.querySelector('#game');
const ground = document.querySelector('.ground');
const time = document.querySelector('.time');
const count = document.querySelector('.count');
const modal = document.querySelector('.modal');
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


// 모달 띄움
function openModal(isWon) {
    let msg = '';

    if (isWon) {
        msg = 'You Won 🎉';
    } else {
        msg = 'You Lose';
    }

    modal.querySelector('.result').textContent = msg;

    modal.classList.add('on');
}

function closeModal() {
    modal.classList.remove('on');
}




// 당근, 벌레 클릭 인식
game.addEventListener('click', (e) => {
    const target = e.target;

    let interval;
    let timeout;

    if (target.classList.contains('btn-start') || target.classList.contains('btn-restart')) {
        target.querySelector('i').className = 'fa-solid fa-stop';
        closeModal();
        generatorItem();
        setItem();

        // 시도 1. setInterval과 setTimeout으로 타이머 만들기
        // interval = setInterval(() => {
        //     timeLimit = timeLimit - 1000;
        //     time.textContent = `00:${timeLimit / 1000}`;
        // }, 1000);
        //
        // timeout = setTimeout(() => {
        //     // FIXME: 실패처리 (공통으로 빼기)
        //     clearInterval(interval);
        //     openModal(false);
        // }, 10000);


        // 시도 2. Date 객체로 타이머 만들기
        const dateTo = new Date();
        let dateFrom = new Date();
        dateFrom.setTime(dateFrom.getTime() + 10000);

        console.log(dateFrom);
        console.log(dateTo);

        const distance = dateFrom - dateTo;

        interval = setInterval(() => {
            const distanceSeconds = distance / 1000;

            console.log(distance)
            console.log(distanceSeconds);

            time.textContent = `00:${distanceSeconds < 10 ? '0' + distanceSeconds : distanceSeconds}`;

            if (distance < 0) {
                clearInterval(interval);
            }

        }, 1000);

    }

    if (target.classList.contains('bug')) {
        // FIXME: 실패처리 (공통으로 빼기)
        clearInterval(interval);
        clearTimeout(timeout);
        openModal(false);
    }

    if (target.classList.contains('carrot')) {
        target.remove();
        numberOfCarrots++;
        count.textContent = numberOfCarrots;

        // count.textContent가 '10'이면
        // 타이머 멈추고, 성공 팝업 띄우기

        if (numberOfCarrots === 10) {
            clearInterval(interval);
            clearTimeout(timeout);
            openModal(true);
        }
    }


});


// 시작 버튼 클릭