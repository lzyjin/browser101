// game 모듈 직접 만들어보기

// main-yejin.mjs 수정하기

'use strict';

import * as sound from "./sound.mjs";

export default class Game {
    constructor(carrotCount) {
        this.carrotCount = carrotCount;
        this.gameBtn = document.querySelector('.game__button');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');

        this.gameBtn.addEventListener('click', () => {
            this.onClick && this.onClick();
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    startGame () {
        this.showStopButton();
        this.showTimerAndScore();
        sound.playBackground();
    }

    stopGame () {
        this.hideGameButton();
        sound.playAlert();
        sound.stopBackground();
    }

    finishGame (win) {
        this.hideGameButton();

        if (win) {
            sound.playWin();
        } else {
            sound.playBug();
        }

        sound.stopBackground();
    }

    initGame () {
        this.gameScore.innerText = this.carrotCount;
    }

    showStopButton () {
        const icon = this.gameBtn.querySelector('.fas');

        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');

        this.gameBtn.style.visibility = 'visible';
    }

    hideGameButton () {
        this.gameBtn.style.visibility = 'hidden';
    }

    showTimerAndScore () {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }

    updateTimerText (minutes, seconds) {
        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }

    updateScoreBoard (score) {
        this.gameScore.innerText = this.carrotCount - score;
    }
}