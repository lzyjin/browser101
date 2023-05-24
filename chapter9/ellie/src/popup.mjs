'use strict';

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
        // 이벤트 핸들러 프로퍼티 방식으로 이벤트 등록
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