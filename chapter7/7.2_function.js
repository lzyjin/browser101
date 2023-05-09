function add(numb1, num2) {
    return numb1 + num2;
}

// function도 object type이다.
// 즉 add라는 이름에는 함수가 정의된 곳을 가리키고 있다.

const doSomething = add;

// doSomething과 add는 동일한 함수를 가리킨다.

const result = doSomething(2, 3);
console.log(result); // 5
const result2 = add(2, 3);
console.log(result2); // 5

// doSomething(2, 3), add(2, 3)
// 함수 이름은 달라도 결국 같은 함수를 호출했으니 결과도 같다.




function print() {
    console.log('print');
}

print(8, 33); // print
// 인자가 필요없는 함수는 몇개의 값을 전달하든, 아무리 많은 input을 전달해도 사용하지 않는다.

// input이 필요하다면 다음과 같이 함수 선언시에 매개변수를 추가해서 인자를 받을 수 있도록 하면 된다.
function print2(name, age) {
    console.log(`${name}, ${age}`)
}





function surprise(operator) {

}