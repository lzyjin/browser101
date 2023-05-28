// game 모듈 엘리버전

'use strict';

import { ItemType, Field } from "./field.mjs";
import * as sound from "./sound.mjs";


// 자바스크립트로 타입 보장 하는 법
// Object.freeze: 객체 동결: 프로퍼티 값 읽기만 가능(프로퍼티 추가, 프로퍼티 삭제, 프로퍼티 값 쓰기, 프로퍼티 어트리뷰터 재정의 불가)
export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel',
});

// Builder Pattern
export class GameBuilder {

    withGameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    withCarrotCount(num) {
        this.carrotCount = num;
        return this;
    }

    withBugCount(num) {
        this.bugCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount,
        );
    }
}

class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.started = false;
        this.score = 0;
        this.timer = undefined;

        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');

        this.gameBtn.addEventListener('click', () => {
            if (this.started) {
                // this.stop();
                this.stop(Reason.cancel);
            } else {
                this.start();
            }
        });

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
    }

    // stop() {
    //     this.started = false;
    //     this.stopGameTimer();
    //     this.hideGameButton();
    //     sound.playAlert();
    //     sound.stopBackground();
    //     // this.onGameStop && this.onGameStop('cancel');
    //     this.onGameStop && this.onGameStop(Reason.cancel);
    // }
    //
    // finish (win) {
    //     this.started = false;
    //     this.hideGameButton();
    //
    //     if (win) {
    //         sound.playWin();
    //     } else {
    //         sound.playBug();
    //     }
    //
    //     this.stopGameTimer();
    //     sound.stopBackground();
    //
    //     // this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
    //     this.onGameStop && this.onGameStop(win ? Reason.win : Reason.lose);
    // }




    // stop과 finish 공통점이 많아서 코드 간결하게 하기
    // 🌷 yejin
    // commonStop() {
    //     this.started = false;
    //     this.hideGameButton();
    //     this.stopGameTimer();
    //     sound.stopBackground();
    // }
    //
    // stop() {
    //     this.commonStop();
    //     sound.playAlert();
    //
    //     // this.onGameStop && this.onGameStop('cancel');
    //     this.onGameStop && this.onGameStop(Reason.cancel);
    // }
    //
    // finish (win) {
    //     this.commonStop();
    //
    //     if (win) {
    //         sound.playWin();
    //     } else {
    //         sound.playBug();
    //     }
    //
    //     // this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
    //     this.onGameStop && this.onGameStop(win ? Reason.win : Reason.lose);
    // }





    // stop과 finish 공통점이 많아서 코드 간결하게 하기
    // 🌹 ellie
    stop(reason) {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.stopBackground();

        this.onGameStop && this.onGameStop(reason);
    }



    onItemClick = (item) => {
        // ⭐️　함수 안에서 조건에 맞지 않을때 빨리 함수를 종료하는 것이 중요하다
        if (!this.started) {
            return;
        }

        // if (item === 'carrot') {
        if (item === ItemType.carrot) {
            this.score++;
            this.updateScoreBoard();

            if (this.score === this.carrotCount) {
                // this.finish(true);
                this.stop(Reason.win);
            }

        // } else if (item === 'bug') {
        } else if (item === ItemType.bug) {
            // this.finish(false);
            this.stop(Reason.lose);
        }
    }

    initGame () {
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.initGame();
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

    updateTimerText (time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }

    startGameTimer () {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);

        this.timer = setInterval(() => {
            if (remainingTimeSec <= 0) {
                clearInterval(this.timer);
                // this.finish(this.score === this.carrotCount);
                this.stop(this.score === this.carrotCount ? Reason.win : Reason.lose);
                return;
            }

            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }

    stopGameTimer () {
        clearInterval(this.timer);
    }

    updateScoreBoard () {
        this.gameScore.innerText = this.carrotCount - this.score;
    }

}

