(function() {
    "use strict";

    const hangmanModule = function() {

        let currentWord = "";
        let correctGuess = null;
        let singleCurrentArray = [];
        let compareArrays = [];
        let userChoice = "";
        let userChoices = [];
        let turns = 0;
        let selectButton = document.querySelector('.guessButton');
        let gameDisplay = document.querySelector('#hang-man-word');
        let lettersGuessed = document.querySelector('p span');
        let userGuess = document.querySelector('#letter');
        let turnCounter = document.querySelector('.lives');
        let gameOver = document.querySelector('.game-over p');
        let scaler = document.querySelector('.game-over');




        // Keeps track of number of turns and whether user has exceeded them.
        function keeperOfTurns() {
            turnCounter.textContent = turns;
            if (turns === 6) {
                gameDisplay.classList.add('guess-show');
                scaler.classList.add('scale');
                gameOver.textContent = 'Game Over';
                gameDisplay.textContent = currentWord;
            }
        }

        // Keeps track of user guesses and whether there are any repeats.
        function getUserGuess() {
            selectButton.addEventListener('click', () => {
                event.preventDefault();
                userChoice = userGuess.value.toLowerCase();
                let guessChecker = userChoices.indexOf(userChoice);
                if (guessChecker < 0) {
                    userChoices.push(userChoice);
                }
                if (guessChecker >= 0) {
                    alert('Repeat!!!');
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
            keeperOfTurns();
            endGame();
        }
        // handles displaying the letters and word
        function displayWord(currentWord) {
            singleCurrentArray = currentWord.split('');
            compareArrays = currentWord.split('');
            gameDisplay.innerHTML = '';
            for (let i = 0; i < singleCurrentArray.length; i++) {
                let item = document.createElement('span');
                item.innerHTML = singleCurrentArray[i];
                item.classList.add('is-hidden');
                gameDisplay.appendChild(item);
            }
        }
        // shows the correct letter if guessed
        function updateWord() {
            for (let i = 0; i < singleCurrentArray.length; i++) {
                if (singleCurrentArray[i] === userChoice) {
                    let item = document.querySelectorAll('.is-hidden')[i];
                    item.classList.add('show-guess');
                }
            }
        }
        // lets user know when they have won and displays word
        function endGame() {
          compareArrays = compareArrays.filter(val => !userChoices.includes(val));
          if (compareArrays.length === 0) {
            scaler.classList.add('scale');
            gameOver.textContent = 'Winner!';
            gameDisplay.textContent = currentWord;
          }
        }

        //  Ajax request function
        function getWords() {
            let http = new XMLHttpRequest();
            http.onreadystatechange = function() {
                if (http.readyState === 4 && http.status === 200) {
                    // console.log(JSON.parse(http.response));
                    const chosenWord = JSON.parse(http.response);
                    getUserGuess();
                    chooseWord(chosenWord);
                }
            };
            http.open('GET', './data/names.json', true);
            http.send();

        }
        // this function picks the random word
        function chooseWord(chosenWord) {
            let randoWord = Math.floor(Math.random() * 100);
            currentWord = chosenWord[randoWord].content.toLowerCase();
            if (Object.keys(currentWord).length > 3) {
            }
            displayWord(currentWord);
        }

        return {
            getWords: getWords
        };
    };
    const hangmanApp = hangmanModule();
    hangmanApp.getWords('words');

})();
