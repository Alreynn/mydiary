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
function setSize(title, description) {
    diaryTitle.style.fontSize = title;
    diaryDescription.style.fontSize = description;
}