
const mainContent = document.querySelector('main');
const startMenu = document.querySelector('#start-menu');
const quizMenu = document.querySelector('#quiz-menu');
const quizNextOverlay = document.querySelector('#quiz-next-overlay');
const summaryMenu = document.querySelector('#summary-menu');
const startButton = document.querySelector('#start-button');
const questionButtons = document.querySelectorAll('.question-button');
const overlayContent = document.querySelector('#overlay-content');
const quizInfo = document.querySelector('#quiz-info');
const hintButton = document.querySelector('#hint-button');
const quizQuestion = document.querySelector('#quiz-question');
const flagImage = document.querySelector('#flag-image');
const quizCounter = document.querySelector('#quiz-counter');
const endTitle = document.querySelector('#end-title');
const scoreText = document.querySelector('#score-text');
const restartButton = document.querySelector('#restart-button');


let gameState = {
    "idle": 0,
    "playing": 1
}

let images = [];
let currentState;
let questionCount;
let scoreCount;
let hasInitialised = false;

const urlParam = window.location.search;

// Temp Fetch
async function fetchImages(num) {

    return fetch(`https://education-game.onrender.com/history?amount=${num}`)
      .then((response) => response.json())
      .then((data) => {
        images = [];
        images.push(...data);
        if (!hasInitialised) {
            init();
        }
        else {
            reinit();
        }
        
      })
      .catch((e) => alert(e));
      
   
    
   
   
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

    displayButtons(2);

    quizCounter.textContent = `${questionCount}/${images.length}`;
    flagImage.src = images[questionCount - 1].image;

    quizNextOverlay.classList.add('hide');

}

const displaySummary = () => {
    quizMenu.classList.add('hide');
    summaryMenu.classList.remove('hide');
}

const displayResultOverlay = (val) => {
    let displayHeader = document.createElement('h2');
    displayHeader.classList.add('info-header');
    displayHeader.classList.add('center-horizontal');
    

    switch(val) {
        case 0: // win
            displayHeader.textContent = "You did it!";
        break;
        case 1: // lose
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
    displayParagraph.textContent = `${images[questionCount - 1].fact}`;

  
    let nextButton = document.createElement('button');
    nextButton.classList.add('next-button');
    nextButton.classList.add('geography-button');
    nextButton.classList.add('center-horizontal');

    if (questionCount == images.length) {
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

const displayInfoOverlay = () => {
    let displayHeader = document.createElement('h2');
    displayHeader.classList.add('info-header');
    displayHeader.classList.add('center-horizontal');
    displayHeader.textContent = "Help";

    let displayParagraph = document.createElement('p');
    displayParagraph.classList.add('info-text');
    displayParagraph.classList.add('center-horizontal');
    displayParagraph.textContent = "Guess which time period does this image belong to, and click on the button with the one you want below the image.";

    // let quizFiller = document.createElement('div');
    // quizFiller.classList.add('quiz-filler');

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

const displayHintOverlay = () => {
    let displayHeader = document.createElement('h2');
    displayHeader.classList.add('info-header');
    displayHeader.classList.add('center-horizontal');
    displayHeader.textContent = "Hint";

    let displayParagraph = document.createElement('p');
    displayParagraph.classList.add('info-text');
    displayParagraph.classList.add('center-horizontal');
    displayParagraph.textContent = `${images[questionCount - 1].hint}`;


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

    let text = e.target.textContent;

    if (String(text).toLowerCase() == String(images[questionCount - 1].event).toLowerCase()) {
        scoreCount++;
        displayResultOverlay(0);
    }
    else {
        displayResultOverlay(1);
    }
}

const displayButtons = (n) => {
    let currentItem = images[questionCount-1];

    
    let tempArray = images.slice();
    tempArray.splice(questionCount - 1, 1);

    
    let shuffledArray = tempArray
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value).slice(0, n);
    shuffledArray.push(currentItem);

    // console.log(shuffledArray);

    tempArray = shuffledArray
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);


    for (let i = 0; i < questionButtons.length; i++) {
        questionButtons[i].textContent = `${tempArray[i].event}`;
        questionButtons[i].addEventListener('click', checkCorrect);
    }
}

const roundHandler = () => {

    console.log(`Image length: ` + images.length);
    if (images.length != 0) {
        switch(currentState) {
            case gameState.idle:
                currentState = gameState.playing;
                console.log('Playing');
                startMenu.classList.add('hide');
                quizMenu.classList.remove('hide');
                flagImage.src = images[questionCount - 1]['image'];
                quizCounter.textContent = `${questionCount}/${images.length}`;
                displayButtons(2);
                
            break;
            case gameState.playing:
                currentState = gameState.idle;
                // console.log('Playing');
                quizMenu.classList.add('hide');
                summaryMenu.classList.remove('hide');
                quizNextOverlay.classList.add('hide');

                endTitle.textContent = evaluateScore();
                scoreText.textContent = `You scored ${scoreCount} / ${questionCount}`;
            break;
        }
    }
}

const startGame = (e) => {
    e.preventDefault();
    roundHandler();
}

const restart = (e) => {
    e.preventDefault();
    fetchImages(parseInt(String(urlParam).substring(urlParam.length-2, urlParam.length)));
}

const reinit = () => {
    console.log('Reinit');
    currentState = gameState.idle;
    questionCount = 1;
    scoreCount = 0;

    quizQuestion.textContent = "Which time period does this image belong to?";
    
    summaryMenu.classList.add('hide');
    roundHandler();
    
}

const init = () => {
    currentState = gameState.idle;
    hasInitialised = true;
    questionCount = 1;
    scoreCount = 0;

    quizQuestion.textContent = "Which time period does this image belong to?";

    

    
    quizCounter.textContent = `${questionCount}/${images.length}`;
    startButton.addEventListener('click', startGame);
    quizInfo.addEventListener('click', displayInfoOverlay);
    hintButton.addEventListener('click', displayHintOverlay);
    restartButton.addEventListener('click', restart);


}

fetchImages(parseInt(String(urlParam).substring(urlParam.length-2, urlParam.length)));
