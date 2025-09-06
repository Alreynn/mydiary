const fullDisplay = document.querySelector(".fullDisplay");
const addDiaryContainer = document.getElementById("addDiaryContainer")
const viewDiary = document.getElementById("viewDiary")
const addPIN = document.getElementById("addPIN")
const optionsMore = document.getElementById("optionsMore")
const confirmPIN = document.getElementById("confirmPIN")
const settingsList = document.querySelector(".settingsList")

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
    window.addEventListener('load', () => {
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

function resize() {
    const inputs = document.querySelectorAll('.container input');
    const textarea = document.querySelectorAll('.container textarea');
    function repeatChange(inputSize, textareaSize) {
        for (let i = 0; i <= textarea.length; i++) {
            inputs[i].style.fontSize = inputSize;
            textarea[i].style.fontSize = textareaSize;
        }
    }
    const option = document.getElementById('fontSizing').value;
    if (option === 'd') {
        repeatChange('20px', '16px');
    }
    else if (option === 'xs') {
        repeatChange('16px', '12px');
    }
    else if (option === 's') {
        repeatChange('18px', '14px');
    }
    else if (option === 'l') {
        repeatChange('22px', '18px');
    }
    else if (option === 'xl') {
        repeatChange('24px', '20px');
    }
}