class Counter {
    constructor(runEveryFiveTimes) {
        this.counter = 0;
        this.callback = runEveryFiveTimes;
    }

    /*
    increase() {
        this.counter++;
        console.log(this.counter);

        // 숫자가 5의 배수일떄마다 알려줫으면 좋겠어
        // 근데 이렇게 class안에서 하면 클래스를 사용한 모든 것에 포함되므로
        // 어떤 사람은 다른것을 하고싶거나 다른 문구를 출력하고 싶을 수도 있으니
        // 콜백함수로 실행하는 것이 좋겠다.
        if (this.counter % 5 === 0) {
            console.log('yo!')
        }
    }

     */

    // increase(runIf5times) {
    increase() {
        this.counter++;
        console.log(this.counter);

        if (this.counter % 5 === 0) {
            // runIf5times(this.counter);
            // this.callback(this.counter);
            this.callback && this.callback(this.counter);
        }
    }
}

function printSomething(num) {
    // console.log('yo!');
    console.log(`yo! ${num}`);
}


// const coolCounter = new Counter();
const coolCounter = new Counter(printSomething);
// const coolCounter = new Counter();
/*
coolCounter.increase(); // 1
coolCounter.increase(); // 2
coolCounter.increase(); // 3
coolCounter.increase(); // 4
coolCounter.increase(); // 5 yo!
coolCounter.increase(); // 6
 */

function alertSomething(num) {
    // console.log('yo!');
    alert(`yo! ${num}`);
}


/*
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
coolCounter.increase(printSomething);
 */
// increase 함수를 호출할때마다 printSomething을 전달하려니 불편하다
// 해결방법: class의 constructor에 선언하기
// 그리고 인스턴스를 생성할 때 원하는 콜백함수를 전달하기.
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();
coolCounter.increase();this.callback && this.callback(this.counter);

// 만약에 인스턴스를 생성할 때 new Counter(); 이런식으로 콜백함수를 전달하지 않으면 에러가 발생한다.
// class의 increase 안의 this.callback(this.counter); 이 부분에서 this.callback는 undefined이므로
// TypeError: this.callback is not a function
// 해결방법: if문 또는 논리연산자로 callback이 있는지 없는지 검사해야한다.
// : this.callback && this.callback(this.counter);



coolCounter.increase(alertSomething);

// 콜백함수로 바꿨을 때 장점:
// 콜백함수를 전달함으로써 원하는 대로 할 수 있다.



// 결론:
// class에 우리가 원하는 기능을 다 정의하면 class를 사용하는 사람이 원하는대로 컨트롤 할 수 없고, 재사용성이 떨어진다.
// 콜백함수를 사용해 클래스를 생성하면 클래스를 사용하는 사람이 입맛에 맞게 만들 수 있다.
// 즉, 하나의 클래스로 다양한 object를 만들어서 서로 다른 기능을 하는 object를 만들 수 있다.
// -> 클래스의 재사용성 up!
const printConter = new Counter('printSomething');
const alertConter = new Counter('alertSomething');

// 클래스를 하나의 완전체로 만드는 것 보다 우리가 원하는 기능을 끼워서 재조립 가능하도록 만드는 것이 좋다.