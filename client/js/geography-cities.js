const startMenu = document.querySelector('#start-menu');
const quizMenu = document.querySelector('#quiz-menu');
const startButton = document.querySelector('#start-button');
const questionButtons = document.querySelector('#quiz-question-buttons');
const quizQuestion = document.querySelector('#quiz-question');
const cityImage = document.querySelector('#city-image');
const dragDropWrapper = document.querySelector('#drag-drop-wrapper');
const quizCounter = document.querySelector('#quiz-counter');
const quizInfo = document.querySelector('#quiz-info');
const overlayContent = document.querySelector('#overlay-content');
const quizNextOverlay = document.querySelector('#quiz-next-overlay');
const hintButton = document.querySelector('#hint-button');
const submitButton = document.querySelector('#submit-button');
const summaryMenu = document.querySelector('#summary-menu');
const endTitle = document.querySelector('#end-title');
const scoreText = document.querySelector('#score-text');
const restartButton = document.querySelector('#restart-button');


let gameState = {
    "idle": 0,
    "playing": 1,
}

let cities = [];
let currentState;
let scoreCount;
let questionCount;

const urlParam = window.location.search;

const fetchCities = (num) => {
    /*
    return fetch(`http://localhost:3000/capitals/${num}`)
      .then((response) => response.json())
      .then((data) => {
        flags.push(...data);
        // init();
      })
      .catch((e) => alert(e));
    */
    cities = [{
            "country": "England",
            "capital": "London",
            "image": "./assets/england-capital.png",
            "hint": "This is a hint, get used to it",
            "fact": "This is a fact! Educate yourself."
        }, 
        {
            "country": "Germany",
            "capital": "Berlin",
            "image": "",
            "hint": "This is a hint, get used to it",
            "fact": "This is a fact! Educate yourself."
        }, 
        {
            "country": "Netherlands",
            "capital": "Amsterdam",
            "image": "",
            "hint": "This is a hint, get used to it",
            "fact": "This is a fact! Educate yourself."
        },
        {
            "country": "Spain",
            "capital": "Barcelona",
            "image": "",
            "hint": "This is a hint, get used to it",
            "fact": "This is a fact! Educate yourself."
        },
        {
            "country": "Egypt",
            "capital": "Cairo",
            "image": "",
            "hint": "This is a hint, get used to it",
            "fact": "This is a fact! Educate yourself."
        },
        {
            "country": "Australia",
            "capital": "Canberra",
            "image": "",
            "hint": "This is a hint, get used to it",
            "fact": "This is a fact! Educate yourself."
        },
        {
            "country": "Japan",
            "capital": "Tokyo",
            "image": "",
            "hint": "This is a hint, get used to it",
            "fact": "This is a fact! Educate yourself."
        },
        {
            "country": "Canada",
            "capital": "Ottawa",
            "image": "",
            "hint": "This is a hint, get used to it",
            "fact": "This is a fact! Educate yourself."
        },
        {
            "country": "New Zealand",
            "capital": "Wellington",
            "image": "",
            "hint": "This is a hint, get used to it",
            "fact": "This is a fact! Educate yourself."
        },
        {
            "country": "France",
            "capital": "Paris",
            "image": "",
            "hint": "This is a hint, get used to it",
            "fact": "This is a fact! Educate yourself."
        }]
}

const evaluateScore = () => {
    if ((scoreCount / questionCount) * 100 >= 70) return `Great Job! You Passed!`;
    if ((scoreCount / questionCount) * 100 < 30) return `Next time revise Harder!`; 
    return `Better Luck Next Time!`; 
}

const closeOverlay = (e) => {
    e.preventDefault();
    quizNextOverlay.classList.add('hide');
}

const goNextOverlay = (e) => {
    e.preventDefault();

    questionCount++;
    
    dragDropWrapper.textContent = '';
    questionButtons.textContent = '';

    generateButtons();
    generateDropZones();

    quizCounter.textContent = `${questionCount} / ${cities.length}`;
    cityImage.src = cities[questionCount-1].image;

    quizNextOverlay.classList.add('hide');
}

const displayResultOverlay = (val) => {
    let displayHeader = document.createElement('h2');
    displayHeader.classList.add('info-header');
    displayHeader.classList.add('center-horizontal');

    switch (val) {
        case 0:
            displayHeader.textContent = "You did it!";
        break;
        case 1:
            displayHeader.textContent = "You got it Wrong!";
        break;
    }

    let factHeader = document.createElement('h3');
    factHeader.classList.add('fact-header');
    factHeader.classList.add('geography-text');
    factHeader.classList.add('center-horizontal');
    factHeader.textContent = `Did you know?`;

    let displayParagraph = document.createElement('p');
    displayParagraph.classList.add('info-text');
    displayParagraph.classList.add('center-horizontal');
    displayParagraph.textContent = `${cities[questionCount - 1].fact}`;

    let nextButton = document.createElement('button');
    nextButton.classList.add('next-button');
    nextButton.classList.add('geography-button');
    nextButton.classList.add('center-horizontal');

    if (questionCount == cities.length) {
        nextButton.textContent = "Finish";
        nextButton.addEventListener('click', roundHandler);
    }
    else {
        nextButton.textContent = "Next";
        nextButton.addEventListener('click', goNextOverlay);
    }


    overlayContent.textContent = "";
    overlayContent.appendChild(displayHeader);
    overlayContent.appendChild(factHeader);
    overlayContent.appendChild(displayParagraph);
    overlayContent.appendChild(nextButton);
    quizNextOverlay.classList.remove('hide');
}

const displayInfoOverlay = (e) => {
    e.preventDefault();

    let displayHeader = document.createElement('h2');
    displayHeader.classList.add('info-header');
    displayHeader.classList.add('center-horizontal');
    displayHeader.textContent = "Info";

    let displayParagraph = document.createElement('p');
    displayParagraph.classList.add('info-text');
    displayParagraph.classList.add('center-horizontal');
    displayParagraph.textContent = "Click and Drag letters into boxes, in order, under the city image to spell out the capital. When you're done press the Submit.";

    let okayButton = document.createElement('button');
    okayButton.classList.add('okay-button');
    okayButton.classList.add('geography-button');
    okayButton.classList.add('center-horizontal');
    okayButton.textContent = "Okay";

    okayButton.addEventListener('click', closeOverlay);

    overlayContent.textContent = "";
    overlayContent.appendChild(displayHeader);
    overlayContent.appendChild(displayParagraph);
    overlayContent.appendChild(okayButton);
    quizNextOverlay.classList.remove('hide');
}

const displayHintOverlay = (e) => {
    e.preventDefault();

    let displayHeader = document.createElement('h2');
    displayHeader.classList.add('info-header');
    displayHeader.classList.add('center-horizontal');
    displayHeader.textContent = "Hint";

    let displayParagraph = document.createElement('p');
    displayParagraph.classList.add('info-text');
    displayParagraph.classList.add('center-horizontal');
    displayParagraph.textContent = `${cities[questionCount-1].hint}`;

    let okayButton = document.createElement('button');
    okayButton.classList.add('okay-button');
    okayButton.classList.add('geography-button');
    okayButton.classList.add('center-horizontal');
    okayButton.textContent = "Okay";

    okayButton.addEventListener('click', closeOverlay);

    overlayContent.textContent = "";
    overlayContent.appendChild(displayHeader);
    overlayContent.appendChild(displayParagraph);
    overlayContent.appendChild(okayButton);
    quizNextOverlay.classList.remove('hide');
}

const checkCorrect = (e) => {
    e.preventDefault();

    let capital = cities[questionCount-1].capital;
    let dragDropZones = document.querySelectorAll('.drag-drop-zone');
    let inputString = '';

    for (let i = 0; i < dragDropZones.length; i++) {
        if (dragDropZones[i].hasChildNodes()) {
            inputString += String(dragDropZones[i].firstElementChild.textContent);
        }
    }

    if (capital.toUpperCase() === inputString.toUpperCase()) {
        scoreCount++;
        displayResultOverlay(0);
    }
    else {
        displayResultOverlay(1);
    }

    // console.log(scoreCount);
    // console.log(inputString);


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
            generateDropZones();
            generateButtons();

            cityImage.src = cities[questionCount - 1].image;

            quizCounter.textContent = `${questionCount} / ${cities.length}`;
            startMenu.classList.add('hide');
            quizMenu.classList.remove('hide');
        break;
        case gameState.playing:
            currentState = gameState.idle;
            quizMenu.classList.add('hide');
            summaryMenu.classList.remove('hide');
            quizNextOverlay.classList.add('hide');

            endTitle.textContent = evaluateScore();
            scoreText.textContent = `You scored ${scoreCount} / ${questionCount}`;
        break;
    }
}

const startGame = (e) => {
    e.preventDefault();
    roundHandler();
}

const restart = (e) => {
    e.preventDefault();

    currentState = gameState.idle;
    questionCount = 1;
    scoreCount = 0;

    quizQuestion.textContent = "What Capital City does this Picture belong to?";

    fetchCities(parseInt(String(urlParam).substring(1, urlParam.length)));
    summaryMenu.classList.add('hide');
    dragDropWrapper.textContent = '';
    questionButtons.textContent = '';
    roundHandler();

    console.log('Restarting');
}

const init = () => {
    currentState = gameState.idle;
    scoreCount = 0;
    questionCount = 1;

    quizQuestion.textContent = "What Capital City does this Picture belong to?";
    fetchCities(parseInt(String(urlParam).substring(1, urlParam.length)));

    startButton.addEventListener('click', startGame);
    quizInfo.addEventListener('click', displayInfoOverlay);
    hintButton.addEventListener('click', displayHintOverlay);
    submitButton.addEventListener('click', checkCorrect);
    restartButton.addEventListener('click', restart);
}

init();
