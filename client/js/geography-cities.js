const startMenu = document.querySelector('#start-menu');
const quizMenu = document.querySelector('#quiz-menu');
const startButton = document.querySelector('#start-button');
const questionButtons = document.querySelector('#quiz-question-buttons');
const quizQuestion = document.querySelector('#quiz-question');
const cityImage = document.querySelector('#city-image');
const dragDropWrapper = document.querySelector('#drag-drop-wrapper');

let gameState = {
    "idle": 0,
    "playing": 1,
}

let cities = []

let currentState;
let scoreCount;
let questionCount;

const fetchCities = () => {
   cities = [{
        "country": "England",
        "capital": "London",
        "image": "./assets/england-capital.png"
        }, {
        "country": "Germany",
        "capital": "Berlin",
        "image": ""
        }, 
        {
            "country": "Netherlands",
            "capital": "Amsterdam",
            "image": ""
        },
        {
            "country": "Spain",
            "capital": "Barcelona",
            "image": ""
        },
        {
            "country": "Egypt",
            "capital": "Cairo",
            "image": ""
        },
        {
            "country": "Australia",
            "capital": "Canberra",
            "image": ""
        },
        {
            "country": "Japan",
            "capital": "Tokyo",
            "image": ""
        },
        {
            "country": "Canada",
            "capital": "Ottawa",
            "image": ""
        },
        {
            "country": "New Zealand",
            "capital": "Wellington",
            "image": ""
        },
        {
            "country": "France",
            "capital": "Paris",
            "image": ""
        }]
}

const allowDrop = (e) => {
    e.preventDefault();
}

const drag = (e) => {
    console.log(e.target.id);
    e.dataTransfer.setData("text", e.target.id);
    // let data = e.dataTransfer.getData("text");
    // console.log(data);
}

const drop = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    // console.log(data);
    e.target.appendChild(document.getElementById(data));
}

const selectButton = (e) => {
    e.preventDefault();
    // console.log('Firing');
}

const displayButtons = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let button = document.createElement('button');
        button.id = `dd-button-${i+1}`
        button.classList.add('question-button');
        button.draggable = true;
        button.addEventListener('click', selectButton);
        button.addEventListener('dragstart', drag);
        button.textContent = arr[i];
        questionButtons.appendChild(button);
    }
}

const generateDropZones = () => {
    let len = cities[questionCount-1].capital.length;
    for (let i = 0; i < len; i++) {
        let button = document.createElement('button');
        button.classList.add('drag-drop-zone');
        // event listener here
        button.addEventListener('drop', drop);
        button.addEventListener('dragover', allowDrop);

        dragDropWrapper.appendChild(button);
    }
}

const generateButtons = () => {
    let currentCapital = String(cities[questionCount-1].capital).toUpperCase();
    let splitCapital = String(currentCapital).split('');
    let limit = 15;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = splitCapital.length; i <= limit; i++) {
        splitCapital.push(characters.charAt(Math.floor(Math.random() * characters.length)));
    }

    let shuffledArray = splitCapital
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

    displayButtons(shuffledArray);
}

const roundHandler = () => {
    switch(currentState) {
        case gameState.idle:
            currentState = gameState.playing;
            startMenu.classList.add('hide');
            quizMenu.classList.remove('hide');
        break;
        case gameState.playing:

        break;
    }
}

const startGame = (e) => {
    e.preventDefault();
    roundHandler();
}

const init = () => {
    currentState = gameState.idle;
    scoreCount = 0;
    questionCount = 1;

    quizQuestion.textContent = "What Capital City does this Picture belong to?";
    fetchCities();

    cityImage.src = cities[questionCount - 1].image;

    generateDropZones();
    generateButtons();

    startButton.addEventListener('click', startGame);
}

init();
