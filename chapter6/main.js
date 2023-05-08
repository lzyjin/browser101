// HTML과 CSS를 이용해 정적으로 웹사이트를 만들었다.
// 이제 JavaScript를 이용해 동적으로 아이템을 추가하고 삭제하는 것을 한다.

// 구현하기 전에 정확하게 어떤 기능을 구현할 것인지 계확하는 것이 중요하다.
// 1. 사용자가 input에서 텍스트를 타이핑할 수 있다.
// 2. 텍스트를 입력하는 방법은 2가지가 있다. +버튼을 클릭하거나 enter키를 누르거나. -> 아이템 등록
// 3. 등록된 아이템은 스크롤되는 리스트에 표시되고, 쓰레기통 아이콘도 같이 있다.
// 4. 쓰레기통 아이콘을 클릭하면 아이템이 삭제된다.

const form = document.querySelector('.new-form');
const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

function onAdd() {
    // 1. 사용자가 입력한 텍스트를 받아온다.
    const text = input.value;

    if (text === '') {
        input.focus();
        return;
    }

    // 2. 새로운 아이템을 만든다. (텍스트 + 삭제 버튼)
    const item = createItem(text);

    // 3. items 컨테이너 안에 새로 만든 아이템을 추가한다.
    items.appendChild(item);

    // 4. 새로 추가된 아이템으로 스크롤링
    item.scrollIntoView({
        block: 'center',
    });

    // 5. input을 초기화한다.
    input.value = '';
    input.focus();
}

let id = 0; // UUID를 사용하거나 object의 hashcode를 사용해서 고유한 아이디를 만드는게 좋지만 이번에는 간단하게 하려고 이렇게 함.
function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item__row');
    itemRow.setAttribute('data-id', id);

    // 이벤트 위임으로 수정
    itemRow.innerHTML = `
        <div class="item">
            <span class="item__name">${text}</span>
            <button class="item__delete">
                <i class="fa-solid fa-trash-can" data-id="${id}"></i>
            </button>
        </div>
        <div class="item__divider"></div>`;

    id++;

    return itemRow;
}


// 👍 addBtn - click과 input - keydown을 하나의 이벤트 리스너로 처리할 수 있다.
// 그것은 바로 form- submit 이벤트이다.
form.addEventListener('submit', (e) => {
    // submit 이벤트가 발생하면 브라우저가 자동으로 페이지를 로딩하게되므로
    // 자동적인 행동을 방지하는 아래 코드를 추가하자.
    e.preventDefault();
    onAdd();
});

/*
addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keydown', (e) => {
    // keypress는 deprecated된 이벤트이므로 keydown 또는 beforeinput을 사용하도록 하자
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event

    // 누른 키가 a이면 preventDefault 됌.
    // 이벤트가 keydownd이 아니라 keyup이면 preventDefault 되지 않음
    // if (e.key === 'a') {
    //     e.preventDefault();
    // }

    console.log(e.isComposing);

    // keydown 이벤트를 감지해서 한글을 입력해서 enter키를 누르면 다 입력이 안되었는데 등록되어져버린다.
    // 해결방법은 event.isComposing 을 사용해서 문자가 조합되는 중인지 아닌지 판별할 수 있다.
    // 조합중이면 true를 리턴하므로 조합중일때는 무시하도록 return하면 된다.
    // 그게 아니면 keyup 이벤트를 감지하면 된다.
    if (e.isComposing) {
        return;
    }

    if (e.key === 'Enter') {
        onAdd();
    }
});
*/





// 👍 이벤트 위임으로 수정
items.addEventListener('click', (e) => {
    const id = e.target.dataset.id;

    console.log(e.target);
    console.log(id);

    if (id) {
        const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
        toBeDeleted.remove();
    }
});