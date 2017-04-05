/////////////////////////////WORK FLOW CHART/////////////////////////
// 1. Connecting to JSON file via AJAX
// 2. Randomly choose word from JSON array
// 3. Get the length of the word generated
// 4. Display Word by using add element
(function() {
  "use strict";
  // Main game parent Variable
  const hangmanModule = function() {

// turns current randomword into variable.
    let currentWord = "";
    let correctGuess = null;
// This is the users guessed letter
    let userChoice = '';
// Array where user guessed letters are stored
    let userChoices = [];
// Array of individual letters guessed.
    let singleCurrentArray = [];
    let compareArrays = [];
// Variable that defines base count of turns
    let turns = 0;

// querySelectors
    let selectButton = document.querySelector('.guessButton');
    let gameDisplay = document.querySelector('#hang-man-word');
    let lettersGuessed = document.querySelector('p span');
    let userGuess = document.querySelector('#letter');
    let turnCounter = document.querySelector('.lives');
    let gameOver = document.querySelector('.game-over p');
    let scaler = document.querySelector('.game-over');

// Keeps track of user guesses and whether there are any repeats.
    function getUserGuess() {
      selectButton.addEventListener('click', () => {
        event.preventDefault();
        userChoice = userGuess.value.toLowerCase();
        let guessChecker = userChoices.indexOf(userChoice);
        console.log(userChoice);
        if (guessChecker < 0) {
          userChoices.push(userChoice);
        }
        if (guessChecker >= 0) {
          alert('You have repeated a guess.');
        }
        userGuess.value = '';
        lettersGuessed.textContent = userChoices;
        checkGuess(userChoice);
      });
    }

// Keeps track of whether a guess is correct or incorrect.
    function checkGuess(userChoice) {
      let checker = singleCurrentArray.indexOf(userChoice);
      if (checker < 0) {
        correctGuess = false;
        // adds a turn to the counter if a guess is incorrect.
        turns += 1;
      }
      if (checker >= 0) {
        correctGuess = true;
        // If guess is correct dont add turn.
        turns += 0;
      }
      updateWord();
      turnTracker();
    }

    // Keeps track of number of turns and whether user has exceeded them.
    function turnTracker() {
      turnCounter.textContent = turns;
      if (turns === 6) {
        gameDisplay.classList.add('guess-show');
        scaler.classList.add('scale');
        gameOver.textContent = 'Game Over';
        gameDisplay.textContent = currentWord;
      }
    }

    // displays the letter if guessed correctly.
    function updateWord() {
      for (let i=0; i < singleCurrentArray.length; i++) {
        if (singleCurrentArray[i] === userChoice) {
          let item = document.querySelectorAll('.is-hidden')[i];
          item.classList.add('show-guess');
        }
      }
    }
//  displays the current word and if there is a correct guess also displays the correct letter.
    function displayWord(currentWord) {
      gameDisplay.innerHTML = '';
      // breaks currentWord into individual substrings(letters).
      singleCurrentArray = currentWord.split('');
      // also breaks currentWord into letters but is used to compare for correct or incorrect answers.
      compareArrays = currentWord.split('');
      for (let i = 0; i < singleCurrentArray.length; i++) {
        let item = document.createElement('span');
        item.innerHTML = userChoice;
        item.classList.add('is-hidden');
        gameDisplay.appendChild(item);
      }
    }
// chooses random word out of the json file
    function chooseWord(chosenWord) {
      let randoWord = Math.floor(Math.random() * 100);
      currentWord = chosenWord[randoWord].content.toLowerCase();
      console.log(currentWord);
      console.log(randoWord);
      // will not pick words shorter than 3 letters.
      if (Object.keys(currentWord).length > 3) {
        console.log(Object.keys(currentWord));
      }
      displayWord(currentWord);
    }
// connects with json file
    function getWords() {
      let http = new XMLHttpRequest();
      http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
          const chosenWord = JSON.parse(http.response);
        }
      };
      http.open('GET', './data/names.json', true);
      http.send();
    }

    return {
      getWords: getWords
    };
  };
  const hangmanApp = hangmanModule();
  hangmanApp.getWords('words');
})();
