// HTML과 CSS를 이용해 정적으로 웹사이트를 만들었다.
// 이제 JavaScript를 이용해 동적으로 아이템을 추가하고 삭제하는 것을 한다.

// 구현하기 전에 정확하게 어떤 기능을 구현할 것인지 계확하는 것이 중요하다.
// 1. 사용자가 input에서 텍스트를 타이핑할 수 있다.
// 2. 텍스트를 입력하는 방법은 2가지가 있다. +버튼을 클릭하거나 enter키를 누르거나. -> 아이템 등록
// 3. 등록된 아이템은 스크롤되는 리스트에 표시되고, 쓰레기통 아이콘도 같이 있다.
// 4. 쓰레기통 아이콘을 클릭하면 아이템이 삭제된다.

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

addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keypress', (e) => {
    // console.log('key');
    // console.log(e);

    if (e.key === 'Enter') {
        onAdd();
    }
});

// 이벤트 위임으로 수정
items.addEventListener('click', (e) => {
    const id = e.target.dataset.id;

    console.log(e.target);
    console.log(id);

    if (id) {
        const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
        toBeDeleted.remove();
    }
});