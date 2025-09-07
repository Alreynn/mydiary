const fullDisplay = document.querySelector(".fullDisplay");
const addDiaryContainer = document.getElementById("addDiaryContainer")
const viewDiary = document.getElementById("viewDiary")
const addPIN = document.getElementById("addPIN")
const optionsMore = document.getElementById("optionsMore")
const confirmPIN = document.getElementById("confirmPIN")
const settingsList = document.querySelector(".settingsList");

const notifs = document.querySelector('.notifs');

function showContainer(chosen) {
    fullDisplay.classList.toggle('show');
    chosen.classList.toggle('show');
}
function showPINContainer() {
    fullDisplay.classList.toggle('pinConfirm');
    confirmPIN.classList.toggle('show');
}
function showOption(chosen) {
    chosen.classList.toggle('show');
}

const closeButton = document.querySelectorAll('button');
closeButton.forEach((item) => {
    if (item.classList.contains('close')) {
        item.addEventListener('click', () => {
            notifs.innerText = '';
        })
    }
});

function addPINNumber() {
    let pin = document.querySelector("#addPINNumber").value;
    if (pin !== '') {
        localStorage.setItem('PIN', pin);
        notifs.innerText = 'Pin added! Please remember your PIN afterwards.';
    } else {
        notifs.innerText = 'Pin cannot be empty.';
    }
}
if (localStorage.getItem('PIN')) {
    let pin = document.querySelector("#pinConfirmation");
    window.addEventListener('load', () => {
        showPINContainer();
    })
    window.addEventListener('beforeunload', () => {
        pin.value = '';
        showPINContainer();
    })
    window.addEventListener('visibilitychange', () => {
        pin.value = '';
        showPINContainer();
    })
}
function removePIN() {
    if (localStorage.getItem('PIN')) {
        localStorage.removeItem('PIN');
        notifs.innerText = 'Pin removed!';
    } else {
        notifs.innerText = 'You don\'t have any PIN saved.';
    }
}
function confirmPINNumber() {
    let pin = document.querySelector("#pinConfirmation").value;
    const getPIN = localStorage.getItem('PIN');
    pin === getPIN ? showPINContainer() : alert('Wrong PIN!');
    return false;
}

function loadFontSize() {
    const options = localStorage.getItem('fontSize');
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    const textareas = document.querySelectorAll('textarea');
    function repeatChange(inputSize, textareaSize) {
        inputs.forEach(item => {
            item.style.fontSize = inputSize;
        });
        textareas.forEach(item => {
            item.style.fontSize = textareaSize;
        });
    }
    const fontSizing = document.getElementById('fontSizing');
    options ? fontSizing.value = options : fontSizing.value = 'id';
    
    if (options === 'id') {
        repeatChange('20px', '16px');
    }
    else if (options === 'ixs') {
        repeatChange('16px', '12px');
    }
    else if (options === 'is') {
        repeatChange('18px', '14px');
    }
    else if (options === 'il') {
        repeatChange('22px', '18px');
    }
    else if (options === 'ixl') {
        repeatChange('24px', '20px');
    }
}
function resize(element) {
    localStorage.setItem('fontSize', element.value);
    loadFontSize();
}
loadFontSize();