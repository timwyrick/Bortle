import React, { useState } from 'react';
import { CompleteModal } from './components/completeModal.js'
import { LetterGrid } from './components/letterGrid.js';
import { KeyBoard } from './components/keyBoard.js';
import { words } from './words.js';
import './App.css';

function App() {

  var initialValues = initializeValues();
  var [letters, setLetters] = useState(initialValues.storedLetters ?? [[{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""}], 
                                       [{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""}], 
                                       [{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""}], 
                                       [{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""}], 
                                       [{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""}], 
                                       [{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""},{letter: "", className: ""}]]);

  var [keys, setKeys] = useState(initialValues.storedKeys ?? [[{letter: "Q", className: ""},
                                  {letter: "W", className: ""},
                                  {letter: "E", className: ""},
                                  {letter: "R", className: ""},
                                  {letter: "T", className: ""},
                                  {letter: "Y", className: ""},
                                  {letter: "U", className: ""},
                                  {letter: "I", className: ""},
                                  {letter: "O", className: ""},
                                  {letter: "P", className: ""}],
                                  [{letter: "A", className: ""},
                                  {letter: "S", className: ""},
                                  {letter: "D", className: ""},
                                  {letter: "F", className: ""},
                                  {letter: "G", className: ""},
                                  {letter: "H", className: ""},
                                  {letter: "J", className: ""},
                                  {letter: "K", className: ""},
                                  {letter: "L", className: ""}],
                                  [{letter: "ENTER", className: ""},
                                  {letter: "Z", className: ""},
                                  {letter: "X", className: ""},
                                  {letter: "C", className: ""},
                                  {letter: "V", className: ""},
                                  {letter: "B", className: ""},
                                  {letter: "N", className: ""},
                                  {letter: "M", className: ""},
                                  {letter: "BACK", className: ""}]]);

  var [numGuesses, setNumGuesses] = useState(initialValues.storedGuesses ?? 0);
  var [isComplete, setIsComplete] = useState(initialValues.isComplete ?? false);
                         
  var [xIndex, setXIndex] = useState(0);
  var [yIndex, setYIndex] = useState(initialValues.storedGuesses ?? 0);
  var [guessHistory, setGuessHistory] = useState(initialValues.guessHistory ?? [0,0,0,0,0,0,0]);
  var [test, setTest] = useState(0);

  var currentWord = [''];

  function initializeValues() {
    let result = {
      storedLetters: null,
      storedKeys: null,
      storedGuesses: null,
      isComplete: null,
      guessHistory: null
    };
      var dayCompleted = window.localStorage.getItem('activeDate');
  
      if (dayCompleted) {
  
        dayCompleted = new Date(dayCompleted);
  
        var currentDate = new Date();

        if (currentDate.getDate() != dayCompleted.getDate() ||
          currentDate.getMonth() != dayCompleted.getMonth() ||
          currentDate.getFullYear() != dayCompleted.getFullYear()) {
  
          window.localStorage.removeItem('letters');
          window.localStorage.removeItem('keys');
          window.localStorage.removeItem('numGuesses');
          window.localStorage.removeItem('dayCompleted');
          window.localStorage.removeItem('activeDate');
          window.localStorage.removeItem('isComplete');
  
        } else {
          result.storedLetters = JSON.parse(window.localStorage.getItem('letters'));
          result.storedKeys = JSON.parse(window.localStorage.getItem('keys'));
          result.storedGuesses = parseInt(window.localStorage.getItem('numGuesses'));
          result.isComplete = ( window.localStorage.getItem('isComplete') == 'true');

          var gHistory = window.localStorage.getItem('history');
          if(gHistory) {
            result.guessHistory = gHistory.split(',').map(Number);
          }

        }
      }
    return result;
  }

  function getCurrentWord() {
    let dayLength = 24 * 60 * 60 * 1000;
    let initialDate = new Date(2022, 1, 7);
    let currentDate = new Date();
    
    let dayDiff = Math.floor(Math.abs((currentDate - initialDate) / dayLength));
    let decodedWord = atob(words[dayDiff]).toUpperCase();
    currentWord = [...decodedWord];
  }

  function setKeyClass(inputLetter, cssClass)
  {
    keys.forEach(element => {
      element.forEach(letter => {
        if(letter.letter == inputLetter && letter.className == "") {
          setKeys(letter.className = cssClass);
        }
      });
    });
  }

  function compareWords() {
    if(currentWord == "") {
      getCurrentWord()
    }

    let testingWord = [];
    let enteredWord = [];
    let unmatchedLetters = [];

    currentWord.forEach(element => 
      testingWord.push(element)
    );
    
    letters[yIndex].forEach(element => 
      enteredWord.push(element.letter)
    );

    var updateLetters = letters; 

    for(var i = 0; i < enteredWord.length; i++)
    {
      if(enteredWord[i] == testingWord[i]) {
        updateLetters[yIndex][i].className = "correct-letter letter-set"
         setLetters(letters = updateLetters);
         setKeyClass(enteredWord[i], "correct-letter");
         testingWord[i] = "";
      } else {
        unmatchedLetters.push(i);
      }
    }

    unmatchedLetters.forEach(element => {
      if(testingWord.includes(enteredWord[element])) {
        let matchedIndex = testingWord.indexOf(enteredWord[element]);
        testingWord[matchedIndex] = "";
        updateLetters[yIndex][element].className = "in-word letter-set"
        setLetters(letters = updateLetters);
        setKeyClass(enteredWord[element], "in-word");
      } else {
        updateLetters[yIndex][element].className = "wrong-letter letter-set"
        setLetters(letters = updateLetters);
        setKeyClass(enteredWord[element], "wrong-letter");
      }
    });

    let correctResponse = true;

    letters[yIndex].forEach(element => {
      if(!element.className.includes("correct-letter")) {
        correctResponse = false;
      }
    });

    if(correctResponse) {
      setNumGuesses(numGuesses = yIndex + 1);
      setIsComplete(isComplete = true);
    }
    return correctResponse;
  }

  function processLetter(inputLetter) {
    inputLetter = inputLetter.toUpperCase();
    let letterRegex = /^[a-z]$/i;

    var updateLetters = letters;

    if (inputLetter == "ENTER") {
      if(letters[yIndex][4].letter != '') {
        let correctResponse = compareWords();

        window.localStorage.setItem('letters', JSON.stringify(letters));
        window.localStorage.setItem('keys', JSON.stringify(keys));
        window.localStorage.setItem('numGuesses', yIndex + 1);
        window.localStorage.setItem('activeDate', new Date());
        window.localStorage.setItem('isComplete', correctResponse);

        if(yIndex == 5 && !correctResponse)
        {
          window.localStorage.setItem('isComplete', true);
          setIsComplete(isComplete = true);
          setNumGuesses(numGuesses = 7);
        } else {
          setYIndex(yIndex = yIndex + 1);
          setXIndex(xIndex = 0);
        }

        if (correctResponse || (yIndex == 5 && !correctResponse)) {
          var history = window.localStorage.getItem('history');

          if (history) {
            history = history.split(',').map(Number);
            history[numGuesses - 1] = history[numGuesses - 1] + 1;
          } else {
            history = [0, 0, 0, 0, 0, 0, 0];
            history[numGuesses - 1] = 1;
          }
          window.localStorage.setItem('history', history);
          setGuessHistory(guessHistory = history);
        }
      }

    } else if (inputLetter.includes("BACK")) {
      if (xIndex != 0 && yIndex != 6) {
        if (xIndex == 4 && letters[yIndex][xIndex].letter != '') {
          updateLetters[yIndex][xIndex].letter = ''
          setLetters(letters = updateLetters);
        }
        else {
          updateLetters[yIndex][xIndex - 1].letter = ''
          setLetters(letters = updateLetters);
          setXIndex(xIndex = xIndex - 1);
        }
      }
    }
    else if (letterRegex.test(inputLetter)) {
      updateLetters[yIndex][xIndex].letter = inputLetter.toUpperCase()
      setLetters(letters = updateLetters);
      var blah = xIndex;
      setXIndex(xIndex = xIndex - 1);
      setXIndex(xIndex = xIndex + 1);

      if (xIndex < 4) {
        setXIndex(xIndex = xIndex + 1);
      }
    }
    setTest(test = test + 1);
  }

  React.useEffect(() => {
    if(!isComplete) {
      window.addEventListener('keydown', (event) => {
        processLetter(event.key);
      });
    }
  }, []);


  return (
    <div className="word-container">
      <h1 className="page-title">BORTLE</h1>
      <CompleteModal isComplete={isComplete} letters={letters} numGuesses={numGuesses} guessHistory={guessHistory}></CompleteModal>
      <LetterGrid key={test} letters={letters}></LetterGrid>
      <KeyBoard keys={keys} clickFunction={processLetter}></KeyBoard>
    </div>
  );
}

export default App;
