// 변수는 우리가 필요한 데이터를 담는 공간

// primitive type:  number, string, boolean, null, undefined, symbol
let number = 2;
let number2 = number;

console.log(number); // 2
console.log(number2); // 2

number = 100;

console.log(number); // 100
console.log(number2); // 2

number2 = 200;

console.log(number); // 100
console.log(number2); // 200



// object type: object
let obj = {
    name: 'ellie',
    age: 5,
};
// obj에는 obj가 있는 메모리 주소가 할당됌.
// 그 주소 안에는 name안에 값 ellie가 있고, age 안에 값 5가 있다.
// object는 뚱뚱해서 값을 변수에 저장하지 않고, 어디에 있는지 주소만 참조한다.

console.log(obj.name); // ellie

let obj2 = obj;
// obj가 있는 주소를 할당한거라서 결국 같은 곳을 가리킴
console.log(obj2.name); // ellie


// primitive type 변수에 담긴 값이 복사되어 할당된다.
// object type은 object를 가리키는 주소(레퍼런스)가 복사되어 할당된다.

obj.name = 'james';

console.log(obj); // {name: 'james', age: 5}
console.log(obj2); // {name: 'james', age: 5}

// obj.name을 바꿨는데 obj2.name도 똑같이 바뀐 것을 볼 수 있다.
// 같은 객체를 바라보고(가리키고)있기 때문에.



// let으로 선언한 변수는 재할당이 되지만
// const로 선언한 변수는 재할당 할 수 없다.

let a = 1;
a = 5;
a = 10;

const b = 1;
// b = 5; // 에러: Attempt to assign to const or readonly variable



// 그럼 이렇게 하면?
const obje = {
    name: 'suji',
    age: 10,
};

// const로 선언했기 때문에 이렇게 값을 재할당할 수는 없다.
// obje = {
//     name: 'iu',
//     age: 7,
// };

console.log(obje); // {name: 'suji', age: 10}

// 하지만 obje에는 값이 들어있는게 아니라 값이 있는 위치(레퍼런스)가 담겨 있기 때문에
// 그 값안의 name이나 age 값을 수정하는 것은 가능하다.
obje.name = 'iu';

console.log(obje); // {name: 'iu', age: 10}

// 이 개념이 매우매우 중요하다!