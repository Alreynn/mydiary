const main = document.getElementById('main');
const diaryTitle = document.getElementById('diaryTitle');
const diaryDescription = document.getElementById('diaryDescription');
const diaryDate = document.getElementById('diaryDate');
const diaryTime = document.getElementById('diaryTime');
const date = document.getElementById("date");
const time = document.getElementById("time");
const description = document.getElementById('description');
// I don't have any way to avoid these.

// Set the default value of date and time input
diaryDate.valueAsDate = new Date();

// I hate this one bro
let selectedId = null;
function loadDiaries() {
    const load = (JSON.parse(localStorage.getItem('diary')) || []).sort((latest, oldest) => new Date(oldest.date + 'T' + oldest.time) - new Date(latest.date + 'T' + latest.time));
    load.sort((latest, oldest) => new Date(oldest.date) - new Date(latest.date));
    main.innerHTML = '';
    load.forEach(item => {
        const button = document.createElement('button');
        button.className = 'diaries';
        main.appendChild(button);
        button.addEventListener('click', () => {
            fullDisplay.classList.toggle('show');
            viewDiary.classList.toggle('show');
            const title = document.getElementById('title');
            const diaryFullDescription = document.querySelector(".diaryFullDescription");
            date.value = item.date;
            time.value = item.time;
            
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
    } else {
        alert('Put the date or one of the inputs.');
    }
}
let isOnEdit = false;
function editDiary() {
    const edit = document.getElementById('editDiary');
    const close = document.getElementById('closeDiary');
    const title = document.getElementById('title');

    const formatting = document.getElementById('formattingEdit');
    if (!isOnEdit) {
        title.removeAttribute('readonly');
        description.removeAttribute('readonly');
        date.removeAttribute('readonly');
        time.removeAttribute('readonly');
        edit.innerText = 'Save';
        alert('Edit mode active.');
        isOnEdit = true;
        formatting.classList.add('show');
    } else {
        const diaries = JSON.parse(localStorage.getItem('diary')) || [];
        for (let i = 0; i < diaries.length; i++) {
            if (diaries[i].id === selectedId) {
                diaries[i].title = title.value;
                diaries[i].description = description.value;
                diaries[i].date = date.value;
                diaries[i].time = time.value;
                break;
            }
        }
        formatting.classList.remove('show');
        localStorage.setItem('diary', JSON.stringify(diaries));
        loadDiaries();

        title.setAttribute('readonly', 'true');
        description.setAttribute('readonly', 'true');
        date.setAttribute('readonly', 'true');
        time.setAttribute('readonly', 'true');
        edit.innerText = 'Edit';
        isOnEdit = false;
    }
}
function removeDiary() {
    let confirmation = confirm('Do you agree to delete this diary?');
    if (confirmation) {
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
}
loadDiaries();