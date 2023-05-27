// game 모듈 직접 만들어보기

// main-yejin.mjs 수정하기

'use strict';

import * as sound from "./sound.mjs";

let timer = undefined;

export default class GameYejin {
    constructor(carrotCount, started, gameDurationSec) {
        this.carrotCount = carrotCount;
        this.started = started;
        this.gameDurationSec = gameDurationSec;
        this.gameBtn = document.querySelector('.game__button');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');

        // 이부분 main.js로 빼야할 듯.?
        this.gameBtn.addEventListener('click', () => {
            if (this.started) {
                this.stopGame();
            } else {
                this.startGame();
            }
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    startGame () {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
    }

    stopGame () {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.playAlert();
        sound.stopBackground();
    }

    finishGame (win) {
        this.started = false;
        this.hideGameButton();
        this.stopGameTimer();

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

    // ⭐️ 시간에 따라 분과 초 나타내기
    updateTimerText (time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }

    startGameTimer () {
        let remainingTimeSec = this.gameDurationSec;
        this.updateTimerText(remainingTimeSec);

        timer = setInterval(() => {
            if (remainingTimeSec <= 0) {
                clearInterval(timer);
                this.finishGame(score === this.carrotCount);
                return;
            }

            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }

    stopGameTimer () {
        clearInterval(timer);
    }

    updateScoreBoard () {
        this.gameScore.innerText = this.carrotCount - score;
    }
}