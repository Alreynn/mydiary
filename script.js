const fullDisplay = document.querySelector(".fullDisplay");
const addDiaryContainer = document.getElementById("addDiaryContainer")
const viewDiary = document.getElementById("viewDiary")
const addPIN = document.getElementById("addPIN")
const confirmPIN = document.getElementById("confirmPIN")
const settings = document.querySelector(".settings")

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

function addPINNumber() {
    let pin = document.querySelector("#addPINNumber").value;
    if (pin !== '') {
        localStorage.setItem('PIN', pin);
        alert('Pin added! Please remember your PIN afterwards.')
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
        alert('Pin removed!');
    }
}
function confirmPINNumber() {
    let pin = document.querySelector("#pinConfirmation").value;
    const getPIN = localStorage.getItem('PIN');
    pin === getPIN ? showPINContainer() : alert('Wrong PIN!');
    return false;
}