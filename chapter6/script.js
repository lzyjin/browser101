const app = document.querySelector('#app');
const ul = document.querySelector('ul');
const input = document.querySelector('#input');
const btnInputReset = document.querySelector('.btn-input-reset');

const deleteLi = (e) => {
    // console.log(e.target.parentNode);
    ul.removeChild(e.target.parentNode);
    input.focus();
};

const createList = () => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');

    span.textContent = input.value;
    button.setAttribute('class', 'btn-li-delete');
    button.innerHTML = '<i class="xi-trash"></i>';

    li.append(span);
    li.append(button);
    ul.append(li);

    input.value = '';
    btnInputReset.classList.remove('show');

    // 엘리버전 보고 추가함
    li.scrollIntoView();
};


// 이벤트 위임 사용
app.addEventListener('click', (e) => {
    console.log(e.target.classList);

    if (e.target.classList.contains('btn-add')) {
        if (input.value.length === 0) {
            input.focus();
            return;
        }

        createList();
    }

    if (e.target.classList.contains('btn-input-reset')) {
        input.value = '';
    }

    if (e.target.classList.contains('btn-li-delete')) {
        // console.log('삭제버튼 클릭함');
        deleteLi(e)
    }
});

input.addEventListener('input', () => {
    if (input.value) {
        btnInputReset.classList.add('show');
    } else {
        btnInputReset.classList.remove('show');
    }
});

input.addEventListener('keypress', (e) => {

    if (e.keyCode === 13) {
        if (input.value.length === 0) {
            input.focus();
            return;
        }

        createList();
    }
});
