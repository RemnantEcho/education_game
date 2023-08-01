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
    e.dataTransfer.setData("text", e.target.id);
}

const drop = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    // e.target.classList.add('dd-zone-mute');
    let button = document.getElementById(data);
    button.classList.add('dd-button-mute');

    console.log(`Moving Button: ` + button.parentNode);
    let draggedParent = button.parentNode;
    let targetParent = e.target.parentNode;

    // console.log(`Target Drop: ` + e.target);
    // console.log(e.target.classList.contains('question-button'));
    // console.log(e.target.parentNode);


    if (e.target.classList.contains('drag-drop-zone')) {
        e.target.classList.add('dd-zone-mute');
    }

    if (e.target.classList.contains('question-button')) {
        let tempEl = button;
        

        if (e.target.parentNode.id == 'quiz-question-buttons') {
            // console.log('It is a question button and the parent is Quiz Questions');
            button.classList.remove('dd-button-mute');
            // e.target.classList.remove('dd-button-mute');
        }

        console.log('Dragged Button Parent ID: ' + button.parentNode.id);

        if (button.parentNode.id == 'quiz-question-buttons') {
            e.target.classList.remove('dd-button-mute');
        }
        else {
            e.target.classList.add('dd-button-mute');
        }
        
        draggedParent.appendChild(e.target);
        targetParent.appendChild(tempEl);
        
    }
    else {
        if (e.target.id == 'quiz-question-buttons') {
            button.classList.remove('dd-button-mute');
        }

        draggedParent.classList.remove('dd-zone-mute');
        e.target.appendChild(button);
        // e.target.appendChild(button);
    }
    
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
    questionButtons.addEventListener('drop', drop);
    questionButtons.addEventListener('dragover', allowDrop);
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

    for (let i = splitCapital.length; i < limit; i++) {
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
