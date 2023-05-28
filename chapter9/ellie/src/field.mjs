'use strict';

import * as sound from './sound.mjs';
import { game } from "./main.mjs";

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
    carrot: 'carrot',
    bug: 'bug',
});

export class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();

        // ⚠️ 함수를 인자로 전달할 때, 함수 안에 들어있는 정보인 클래스(this)가 전달되지 않아서 예상과 다르게 동작한다.
        // this.field.addEventListener('click', this.onClick);

        // 🙌 해결방법
        // this 바인딩 (여기서는 this에 클래스를 바인딩)
        // 방법 1
        // this.onClick = this.onClick.bind(this);
        // this.field.addEventListener('click', this.onClick);

        // 방법 2
        // 화살표 함수 사용
        // this.field.addEventListener('click', event => this.onClick(event));

        // 방법 3
        // onClick 함수를 화살표 함수로 만든다. (엘리가 사용하는 방법)
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

    // onClick(event) {
    //     const target = event.target;
    //     if (target.matches('.carrot')) {
    //         target.remove();
    //         sound.playCarrot();
    //         this.onItemClick && this.onItemClick('carrot');
    //
    //     } else if (target.matches('.bug')) {
    //         this.onItemClick && this.onItemClick('bug');
    //     }
    // }

    onClick = event => {
        const target = event.target;

        if (!game.started) {
            return;
        }

        if (target.matches('.carrot')) {
            target.remove();
            sound.playCarrot();
            // this.onItemClick && this.onItemClick('carrot');
            this.onItemClick && this.onItemClick(ItemType.carrot);

        } else if (target.matches('.bug')) {
            // this.onItemClick && this.onItemClick('bug');
            this.onItemClick && this.onItemClick(ItemType.bug);
        }
    }
}

function randomNumber (min, max) {
    return Math.random() * (max - min) + min;
}