'use strict';

// 역할:
// game을 만들고, banner를 연결

import Popup from './popup.mjs';
import * as sound from "./sound.mjs";
// import Game from './game.mjs';
import { GameBuilder, Reason } from './game.mjs';
const gameFinishBanner = new Popup();

// const game = new Game(10, 10, 10);

// Builder Pattern
// 생성자 인자의 개수가 3개 이상이면 Builder Pattern을 사용해서 실수를 줄이자.
// const game = new GameBuilder()
export const game = new GameBuilder()
    .withGameDuration(10)
    .withCarrotCount(7)
    .withBugCount(5)
    .build();

game.setGameStopListener(reason => {
    let message;

    // switch (reason) {
    //     case 'cancel':
    //         message = 'REPLAY?';
    //         break;
    //     case 'win':
    //         message = 'YOU WON 🎉';
    //         break;
    //     case 'lose':
    //         message = 'YOU LOST 👎';
    //         break;
    //     default:
    //         throw new Error('not valid reason');
    // }

    // Reason을 객체 동결 시켜서 reason이 string이 아니도록 리팩토링함.
    // Reason 안에는 프로퍼티가 3개밖에 없기 때문에 실수할 가능성이 줄어듦.
    switch (reason) {
        case Reason.cancel:
            message = 'REPLAY?';
            sound.playAlert();
            break;
        case Reason.win:
            message = 'YOU WON 🎉';
            sound.playWin();
            break;
        case Reason.lose:
            message = 'YOU LOST 👎';
            sound.playBug();
            break;
        default:
            throw new Error('not valid reason');
    }

    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
    game.start();
});