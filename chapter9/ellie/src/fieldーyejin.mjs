// popup.js처럼 field에 관한 코드들을 분리해보기!!

'use strict';

export default class Field {
    constructor() {
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();

        this.field.addEventListener('click', () => {
            this.onClick && this.onClick();
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    addItem(className, count, imgPath) {
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
}