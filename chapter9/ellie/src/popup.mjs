'use strict';

// 역할:
// popup에 관련된 코드만 모아 놓음

export default class Popup {
    constructor() {
        this.popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');

        this.popUpRefresh.addEventListener('click', () => {
            // onClick에 등록된 리스너가 있으면 그 리스너를 실행!
            this.onClick && this.onClick();
            this.hide();
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    showWithText(text) {
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
    }

    hide() {
        this.popUp.classList.add('pop-up--hide');
    }
}