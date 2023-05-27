'use strict';

import Popup from './popup.mjs';
import Field from './field.mjs';
import * as sound from './sound.mjs';
import Game from './game-yejin.mjs';

const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 5;

let started = false;
let score = 0;


// ⭐️ 변수명을 그냥 popup으로 하지 말고 무슨 역할을 하는지 알 수 있게 명명하기.
const gameFinishBanner = new Popup();

gameFinishBanner.setClickListener(() => {
    startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick (item) {
    // ⭐️　함수 안에서 조건에 맞지 않을때 빨리 함수를 종료하는 것이 중요하다
    if (!started) {
        return;
    }

    if (item === 'carrot') {
        score++;
        game.updateScoreBoard();

        if (score === CARROT_COUNT) {
            finishGame(true);
        }

    } else if (item === 'bug') {
        finishGame(false);
    }
}

const game = new Game(CARROT_COUNT, started, GAME_DURATION_SEC);

function startGame () {
    game.startGame();
}

function stopGame () {
    gameFinishBanner.showWithText('REPLAY?');
    game.startGame();
}

function finishGame (win) {
    gameFinishBanner.showWithText(win ? 'YOU WON 🎉' : 'YOU LOST 👎');
    game.finishGame(win);
}


function initGame () {
    score = 0;
    gameField.initGame();
    game.initGame();
}
