const main = document.getElementById('main');
const diaryTitle = document.getElementById('diaryTitle');
const diaryDescription = document.getElementById('diaryDescription');
const diaryDate = document.getElementById('diaryDate');
const diaryTime = document.getElementById('diaryTime');

let selectedId = null;
function loadDiaries() {
    const load = (JSON.parse(localStorage.getItem('diary')) || []).sort((a, b) => new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time));
    load.sort((a, b) => new Date(b.date) - new Date(a.date));
    main.innerHTML = '';
    load.forEach(item => {
        const button = document.createElement('button');
        button.className = 'diaries';
        main.appendChild(button);
        button.addEventListener('click', (funct) => {
            fullDisplay.classList.toggle('show');
            viewDiary.classList.toggle('show');
            const title = document.getElementById('title');
            const diaryFullDescription = document.querySelector(".diaryFullDescription");
            const timeAndDate = document.getElementById("timeAndDate");
            timeAndDate.innerText = `${item.date} ${item.time}`;
            
            selectedId = item.id;
            title.value = item.title;
            diaryFullDescription.value = item.description;
        });
        
        const title = document.createElement('h2');
        title.innerText = item.title;
        button.appendChild(title);
        
        const description = document.createElement('p');
        description.className = 'diaryDescription';
        description.innerText = item.description;
        button.appendChild(description);
        
        const dateTime = document.createElement('p');
        dateTime.innerText = `${item.date} ${item.time}`;
        button.appendChild(dateTime);
    });
}
function addNewDiary() {
    if ((diaryTitle.value !== '' || diaryDescription.value !== '') && diaryDate.value !== '') {
        const savedDiary = {
            id: Date.now(),
            title: diaryTitle.value,
            description: diaryDescription.value,
            date: diaryDate.value,
            time: diaryTime.value
        };
        const saved = JSON.parse(localStorage.getItem('diary')) || [];
        saved.push(savedDiary);
        localStorage.setItem('diary', JSON.stringify(saved));
        loadDiaries();
        diaryTitle.value = '';
        diaryDescription.value = '';
    }
}
let isOnEdit = false;
function editDiary() {
    const edit = document.getElementById('editDiary');
    const title = document.getElementById('title');
    const description = document.getElementById('description');

    if (!isOnEdit) {
        title.removeAttribute('readonly');
        description.removeAttribute('readonly');
        edit.innerText = 'Save';
        isOnEdit = true;
    } else {
        const diaries = JSON.parse(localStorage.getItem('diary')) || [];
        for (let i = 0; i < diaries.length; i++) {
            if (diaries[i].id === selectedId) {
                diaries[i].title = title.value;
                diaries[i].description = description.value;
                break;
            }
        }
        localStorage.setItem('diary', JSON.stringify(diaries));
        loadDiaries();

        title.setAttribute('readonly', 'true');
        description.setAttribute('readonly', 'true');
        edit.innerText = 'Edit';
        isOnEdit = false;
    }
}
function removeDiary() {
    const diaries = JSON.parse(localStorage.getItem('diary')) || [];
    for (let i = 0; i < diaries.length; i++) {
        if (diaries[i].id === selectedId) {;
            diaries.splice(i, 1);
            break;
        }
    }
    fullDisplay.classList.remove('show');
    viewDiary.classList.remove('show');
    localStorage.setItem('diary', JSON.stringify(diaries));
    loadDiaries();
}
loadDiaries();