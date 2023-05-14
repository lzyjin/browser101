const ul = document.querySelector('ul');
const input = document.querySelector('#input');
const btnAdd = document.querySelector('.btn-add');
let btnDeleteList = document.querySelectorAll('.btn-li-delete');
const btnInputReset = document.querySelector('.btn-input-reset');

const deleteLi = (e) => {
    const target = e.currentTarget;
    const li = target.parentNode;

    console.log(target);
    console.log(li);

    ul.removeChild(li);

    input.focus();
};

const createList = () => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');

    span.textContent = input.value;
    button.setAttribute('class', 'btn-li-delete');
    button.onclick = (e) => {
        deleteLi(e)
    };
    button.innerHTML = '<i class="xi-trash"></i>';

    li.append(span);
    li.append(button);
    ul.append(li);

    input.value = '';
    btnInputReset.classList.remove('show');

    // 엘리버전 보고 추가함
    li.scrollIntoView();
};



input.addEventListener('input', () => {
    if (input.value) {
        btnInputReset.classList.add('show');
    } else {
        btnInputReset.classList.remove('show');
    }
});

btnAdd.addEventListener('click', () => {

    if (input.value.length === 0) {
        input.focus();
        return;
    }

    createList();
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

btnInputReset.addEventListener('click', () => {
    input.value = '';
})