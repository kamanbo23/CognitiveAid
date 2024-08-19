// scripts.js


function openTab(event, tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}


function appendToCalculation(value) {
    document.getElementById('calculation').value += value;
}


function clearCalculation() {
    document.getElementById('calculation').value = '';
    document.getElementById('result').value = '';
}


function calculateResult() {
    try {
        const calc = document.getElementById('calculation').value;
        const result = eval(calc);
        document.getElementById('result').value = result;
        speakResult(result);
    } catch (error) {
        document.getElementById('result').value = 'Error';
    }
}


function speakResult(result) {
    const speech = new SpeechSynthesisUtterance(result);
    window.speechSynthesis.speak(speech);
}


function startSpeechRecognition() {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;


    recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        document.getElementById('calculation').value = speechResult;
        calculateResult();
    };


    recognition.start();
}


function addReminder() {
    const label = document.getElementById('reminder-label').value;
    const dateTime = document.getElementById('reminder-datetime').value;


    if (label && dateTime) {
        const reminderList = document.getElementById('reminders-list');
        const listItem = document.createElement('li');
        listItem.textContent = `${label} - ${dateTime}`;
        reminderList.appendChild(listItem);
        document.getElementById('reminder-label').value = '';
        document.getElementById('reminder-datetime').value = '';
    }
}


function showExercises() {
    const bodyPart = document.getElementById('body-part').value;
    const exercises = {
        arms: [{ name: 'Bicep Curls', img: 'https://i.imgur.com/FBoBmHV.png' }, { name: 'Tricep Dips', img: 'https://i.imgur.com/YK2jAi6.jpeg' }],
        legs: [{ name: 'Squats', img: 'https://i.imgur.com/ZJiq7Z6.jpeg' }, { name: 'Lunges', img: 'https://i.imgur.com/bgynuXL.jpeg' }],
        back: [{ name: 'Pull-Ups', img: 'https://i.imgur.com/9a8bJQI.jpeg' }, { name: 'Rows', img: 'https://i.imgur.com/OAyW2dd.jpeg' }],
        shoulders: [{ name: 'Shoulder Press', img: 'https://i.imgur.com/GoMms2n.png' }, { name: 'Lateral Raises', img: 'https://i.imgur.com/aalMSZu.jpeg' }],
        core: [{ name: 'Plank', img: 'https://i.imgur.com/YkjRoG6.jpeg' }, { name: 'Crunches', img: 'https://i.imgur.com/MarnNRu.jpeg' }]
    };


    const selectedExercises = exercises[bodyPart] || [];
    const exercisesDiv = document.getElementById('exercises');
    exercisesDiv.innerHTML = '';


    selectedExercises.forEach(exercise => {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'exercise';
        exerciseDiv.innerHTML = `
            <img src="${exercise.img}" alt="${exercise.name}">
            <p>${exercise.name}</p>
        `;
        exercisesDiv.appendChild(exerciseDiv);
    });
}