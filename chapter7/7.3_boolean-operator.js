
// false: 0, -0, '', null, undefined, NaN
// if (false) {
// if (0) {
// if (-0) {
// if ('') {
// if (null) {
// if (undefined) {
if (NaN) {
    console.log('true');
} else {
    console.log('false');
}



// true: [], 'hello', 'true', '0'


// 퀴즈
let num;
if (num) {
    console.log('true');
} else {
    console.log('false');
}

// 결과는 false
// num에는 undefined이 할당되어 있기 때문에.




// 논리연산자 사용법
let number = 9;

// 1)
if (number) {
    console.log(number); // 9
}

//2)
number && console.log(number); // 9
// 1)과 2)는 같다.


let obj;
obj && console.log(obj.name); // obj가 false라서 뒤의 표현식은 읽지 않아도 이 구문은 false임. 그래서 뒤 식은 실행도 안함.

let obj2 = {
    name: 'ellie',
};
obj2 && console.log(obj2.name); // ellie
// obj2가 true라서 뒤 표현식이 true인지 false인지 확인하기 위해 실행함.