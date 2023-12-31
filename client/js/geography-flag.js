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

let flags = [];
let currentState;
let questionCount;
let scoreCount;
let hasInitialised = false;

const urlParam = window.location.search;

// Temp Fetch
async function fetchFlags(num) {
    // console.log(num);
    // try {
    //     const flagData = await fetch(`https://education-game.onrender.com/flags?10`);
    //     if (flagData.ok) {
    //         const data = await flagData.json();
    //         for (let i = 0; i < data.length; i++) {
    //             flags.push(data[i]);
    //             console.log(flags[i]);
    //         }
    //         init();
    //     }
    // }
    // catch (e) {
    //     console.log(e);
    // }

    
    return fetch(`http://localhost:3000/flags?amount=${num}`)
      .then((response) => response.json())
      .then((data) => {
        flags = [];
        flags.push(...data);
        // for (let i = 0; i < data.length; i++) {
        //     flags.push(data[i]);
        // }
        if (!hasInitialised) {
            // console.log(`Hasn't initialised`);
            init();
        }
        else {
            // console.log(flags);
            reinit();
        }
        
      })
      .catch((e) => alert(e));
      
    // flags = [{
    //         "name": "Peru",
    //         "image": "./assets/peru-flag.png",
    //         "hint": "A Hint of Some Kind",
    //         "fact": "A Fun Fact that's fun for all the family"
    //     },
    //     {
    //         "name": "Egypt",
    //         "image": "./assets/egypt-flag.png",
    //         "hint": "A Hint of Some Kind",
    //         "fact": "A Fun Fact that's fun for all the family"
    //     },
    //     {
    //         "name": "Australia",
    //         "image": "./assets/australia-flag.png",
    //         "hint": "A Hint of Some Kind",
    //         "fact": "A Fun Fact that's fun for all the family"
    //     },
    //     {
    //         "name": "Austria",
    //         "image": "./assets/austria-flag.png",
    //         "hint": "A Hint of Some Kind",
    //         "fact": "A Fun Fact that's fun for all the family"
    //     },
    //     {
    //         "name": "Taiwan",
    //         "image": "./assets/taiwan-flag.png",
    //         "hint": "A Hint of Some Kind",
    //         "fact": "A Fun Fact that's fun for all the family"
    //     },
    //     {
    //         "name": "Burma",
    //         "image": "./assets/burma-flag.png",
    //         "hint": "A Hint of Some Kind",
    //         "fact": "A Fun Fact that's fun for all the family"
    //     },{
    //         "name": "Mexico",
    //         "image": "./assets/mexico-flag.png",
    //         "hint": "A Hint of Some Kind",
    //         "fact": "A Fun Fact that's fun for all the family"
    //     }
    //     ,{
    //         "name": "Argentina",
    //         "image": "./assets/argentina-flag.png",
    //         "hint": "A Hint of Some Kind",
    //         "fact": "A Fun Fact that's fun for all the family"
    //     }
    //     ,{
    //         "name": "Laos",
    //         "image": "./assets/laos-flag.png",
    //         "hint": "A Hint of Some Kind",
    //         "fact": "A Fun Fact that's fun for all the family"
    //     },
    //     {
    //         "name": "Cambodia",
    //         "image": "./assets/cambodia-flag.png",
    //         "hint": "A Hint of Some Kind",
    //         "fact": "A Fun Fact that's fun for all the family"
    //     }
    // ]
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

    quizCounter.textContent = `${questionCount}/${flags.length}`;
    flagImage.src = flags[questionCount - 1].image;

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
    // factHeader.classList.add('info-text');
    factHeader.classList.add('fact-header');
    factHeader.classList.add('geography-text');
    factHeader.classList.add('center-horizontal');
    factHeader.textContent = `Did you know?`;

    let displayParagraph = document.createElement('p');
    displayParagraph.classList.add('info-text');
    displayParagraph.classList.add('center-horizontal');
    displayParagraph.textContent = `${flags[questionCount - 1].fact}`;

    // let quizFiller = document.createElement('div');
    // quizFiller.classList.add('quiz-filler');

    let nextButton = document.createElement('button');
    nextButton.classList.add('next-button');
    nextButton.classList.add('geography-button');
    nextButton.classList.add('center-horizontal');

    if (questionCount == flags.length) {
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
    // overlayContent.appendChild(quizFiller);
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
    displayParagraph.textContent = "Guess what Flag corresponds to what country, and click on the button with the one you want below the flag.";

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
    // overlayContent.appendChild(quizFiller);
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
    displayParagraph.textContent = `${flags[questionCount - 1].hint}`;

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
    // overlayContent.appendChild(quizFiller);
    overlayContent.appendChild(okayButton);
    quizNextOverlay.classList.remove('hide');
}

const checkCorrect = (e) => {
    e.preventDefault();

    let text = e.target.textContent;

    if (String(text).toLowerCase() == String(flags[questionCount - 1].name).toLowerCase()) {
        scoreCount++;
        displayResultOverlay(0);
    }
    else {
        displayResultOverlay(1);
    }
}

const displayButtons = (n) => {
    // console.log(flags)
    let currentItem = flags[questionCount-1];

    // console.log(currentItem);
    
    let tempArray = flags.slice();
    tempArray.splice(questionCount - 1, 1);

    // const shuffledArray = tempArray.sort(() => 0.5 - Math.random()).slice(0, n);
    
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

    // tempArray = shuffledArray.sort(() => 0.5 - Math.random());

    // console.log(tempArray);

    for (let i = 0; i < questionButtons.length; i++) {
        questionButtons[i].textContent = `${tempArray[i].name}`;
        questionButtons[i].addEventListener('click', checkCorrect);
    }
}

const roundHandler = () => {
    // console.log('Triggered');
    console.log(`Flag length: ` + flags.length);
    if (flags.length != 0) {
        switch(currentState) {
            case gameState.idle:
                currentState = gameState.playing;
                console.log('Playing');
                startMenu.classList.add('hide');
                quizMenu.classList.remove('hide');
                flagImage.src = flags[questionCount - 1]['image'];
                quizCounter.textContent = `${questionCount}/${flags.length}`;
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
    // console.log('Fired');
    roundHandler();
}

const restart = (e) => {
    e.preventDefault();
    fetchFlags(parseInt(String(urlParam).substring(urlParam.length-2, urlParam.length)));
}

const reinit = () => {
    console.log('Reinit');
    currentState = gameState.idle;
    questionCount = 1;
    scoreCount = 0;

    quizQuestion.textContent = "Which country does this flag belong to?";
    
    summaryMenu.classList.add('hide');
    roundHandler();
    
    // displayButtons(2);
    // console.log('Restarting');
}

const init = () => {
    currentState = gameState.idle;
    hasInitialised = true;
    questionCount = 1;
    scoreCount = 0;

    quizQuestion.textContent = "Which country does this flag belong to?";

    
    // console.log(String(urlParam).substring(1, urlParam.length));

    // fetchFlags(parseInt(String(urlParam).substring(urlParam.length-2, urlParam.length)));

    // Remove after
    // endTitle.textContent = evaluateScore();
    // scoreText.textContent = `You Scored: ${scoreCount} / ${flags.length}`;
    //

    quizCounter.textContent = `${questionCount}/${flags.length}`;
    startButton.addEventListener('click', startGame);
    quizInfo.addEventListener('click', displayInfoOverlay);
    hintButton.addEventListener('click', displayHintOverlay);
    restartButton.addEventListener('click', restart);

    // console.log('Fine');
}

fetchFlags(parseInt(String(urlParam).substring(urlParam.length-2, urlParam.length)));
// init();