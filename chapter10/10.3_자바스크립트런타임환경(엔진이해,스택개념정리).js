/*
    JAVA는 Multithreathing 지원하는 언어다.
    우리가 프로그램을 짤 때 사용자가 이 데이터를 보고 있는 동안 데이터를 받아오는 것은 쓰레드 a에서 해야지.
    그리고 이 일은 쓰레드 b에서 해야지. 이런 식으로 각각 쓰레드를 지정해서 짤 수도 있고,
    총 몇개의 쓰레드가 동작할 수 있는지 등 굉장히 다양한 것들을 할 수 있다.
    그래서 자바로 멀티쓰레딩을 구현하려면 배워야 하는 것이 많다.

    하지만 자바스크립트는 Single Threaded 언어다.
    즉 자바스크립트에는 Multithreathing이 없다.
    하지만 자바스크립트가 동작하는 브라우저에는 여러가지 쓰레드가 들어있다.
    그래서 우리가 브라우저 Web API를 이용하면 멀티쓰레딩이 가능하다.

    그리고 자바스크립트가 동작하는 JavaScript Runtime Environment(자바스크립트 실행 환경)에서는
    다양한 방식으로 멀티쓰레딩 같은 효과를 낼 수 있다.
    그리고 JavaScript Runtime Environment에서는 Event Loop를 이용해서 다양한 것을 할 수 있다.
    그래서 Event Loop에 대해 자세히 알아본다.

    우리의 웹어플리케이션이 브라우저 위에 올라가는 순간 자바스크립트 엔진이 우리가 작성한 소스코드를 한 줄 한 줄 분석하고, 해석하고, 실행하는데
    이게 정확히 어떻게 되는지 궁금하지 않나?

    자바스크립트 엔진에는 Memory Heap 메모리 힙과 Call Stack 콜 스택이 있다.
    우리가 변수를 선언해서 오브젝트를 할당하거나, 문자열이나 숫자를 할당하면 그 데이터들은 전부 다 메모리 힙에 저장된다.
    메모리 힙은 구조적으로 정리된 자료구조가 아니라 자료들이 여기저기 아무곳에 저장되어 있다.
    콜 스택은 함수를 실행하는 순서에 따라 차곡차곡 쌓아놓는 곳이다.
    스택은 자료구조에서 처음으로 배우는 녀석이다.
    스택은 LIFO라고도 부르는데, Last In First Out(가장 나중에 들어온 것이 가장 처음으로 나간다)는 뜻이다.
    보통 스택에는 push, pop, pick 같은 API가 있다.
*/

// 콜스택이 어떻게 동작하는지 살펴보자.
function second() {
    console.log('hello');
    return;
}

function first() {
    second();
    return;
}

function main() {
    first();
    return;
}

main();

/*
    콜스택:
    main을 호출 -> main 안에서 first를 호출 -> first 안에서 second를 호출
    콜스택에 main 쌓임 -> 콜스택에 first 쌓임 -> 콜스택에 second 쌓임
 */

/*
    |          |     |          |    | second() |
    |          | ->  | first()  | -> | first()  |
    | main()   |     | main()   |    | main()   |
    ___________      ___________     ___________
 */

/*
    second 에서 'hello'를 호출하고 return으로 함수가 끝나면 콜스택에서 second가 제거.
    -> second가 호출된 first로 돌아와서 return으로 first 함수 끝남.
    -> 콜스택에서 first 제거
    -> first가 호출된 main으로 돌아와서 return으로 main 함수 끝남
    -> 콜스택에서 main 제거
 */

/*
    | second() |     |          |    |          |    |          |
    | first()  | ->  | first()  | -> |          | -> |          |
    | main()   |     | main()   |    | main()   |    |          |
    ___________      ___________     ___________     ___________
 */

/*
    콜스택은 함수가 호출하는 순서를 기억했다가 함수가 끝나면 원래 있던 자리로 돌아가기 위해서 쓰이는 자료구조 중 하나이다.
    대부분의 프로세스와 쓰레드 안에는 저마다의 콜스택이 들어있다.
    일을 수행할 때 어디에서 왔고 어디로 돌아가야 하는지 정보를 기억해야하기 때문이다.
 */


/*
    퀴즈!
    다음은 콜스택에 어떻게 쌓일지 생각해보자.
 */

function endless () {
    endless();
}
endless();

/*
    결과:

    콜스택에 endless()가 무한으로 쌓인다.


    |     .     |
    |     .     |
    |     .     |
    | endless() |
    | endless() |
    | endless() |
    | endless() |
    | endless() |
    | endless() |
    | endless() |
    ___________


    해당 코드를 실행하면 콘솔창에 아래와 같은 에러메세지가 출력된다.
    최대 콜 스택 크기를 초과함.

    VM204:2 Uncaught RangeError: Maximum call stack size exceeded
    at endless (<anonymous>:2:5)
    at endless (<anonymous>:2:5)
    at endless (<anonymous>:2:5)
    at endless (<anonymous>:2:5)
    at endless (<anonymous>:2:5)
    at endless (<anonymous>:2:5)
    at endless (<anonymous>:2:5)
    at endless (<anonymous>:2:5)
    at endless (<anonymous>:2:5)
    at endless (<anonymous>:2:5)

    이렇게 함수 안에서 자기 자신을 부르는 것을 재귀함수라고 한다.
 */


/*
    우리가 작성한 웹어플리케이션이 브라우저 위에 올라가게 되면
    소스코드를 자바스크립트 엔진이 어떻게 해석하고 어떤 구조로 보관하는지에 대해 알아보았다.
    여기까지는 자바스크립트 엔진에 대한 내용만이었고 다음에는 자바스크립트 실행 환경 전체에 대해 알아보자.
 */



