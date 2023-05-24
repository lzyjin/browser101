// popup.js처럼 field에 관한 코드들을 분리해보기!!

'use strict';

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const CARROT_SIZE = 80;

export default class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', this.onClick);
    }

    initGame () {
        this.field.innerHTML = '';
        this._addItem('carrot', this.carrotCount, 'img/carrot.png');
        this._addItem('bug', this.bugCount, 'img/bug.png');
    }

    // 외부에서 봤을때 언더스코어(_)가 붙은건 private 이라고 알 수 있게끔.
    // 하지만 좋은 방법은 아님.
    _addItem(className, count, imgPath) {
        // ⭐️ 이렇게 당근과 벌레가 놓일 공간의 시작좌표와 끝좌표를 정하는 방법도 있다.
        // 특히 공간 바깥으로 안빠져나가도록 끝 범위에서 당근 사이즈만큼 빼주는게 포인트!
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;

        for (let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';

            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);

            item.style.left = `${x}px`;
            item.style.top = `${y}px`;

            this.field.appendChild(item);
        }
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    onClick(event) {
        const target = event.target;
        if (target.matches('.carrot')) {
            target.remove();
            playSound(carrotSound);
            this.onItemClick && this.onItemClick('carrot');

        } else if (target.matches('.bug')) {
            this.onItemClick && this.onItemClick('bug');
        }
    }
}

function playSound (sound) {
    sound.currentTime = 0;
    sound.play();
}

function randomNumber (min, max) {
    return Math.random() * (max - min) + min;
}