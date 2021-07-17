import './style.css';
import { Game } from './src/scripts/Game/Game.js';

const game = new Game();

game.init(document.querySelector('.main'));
document.querySelector('[data-loadFile]').addEventListener('change', function (e) {
  const file = this.files[0];
  const fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onload = () => {
      const result = fileReader.result;
      const isLoaded = game.loadTXTFile(result);
      if (isLoaded) { 
        this.disabled = true;
        return;
      }
      alert('Problem with matching file');
  }
});

document.querySelector('[data-addAnswer]').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    game.answer(e.target.value);
    e.target.value = '';
  }
});
document.querySelector('[data-addAnswer]').addEventListener('keyup', function(e) {
  if (e.shiftKey && e.key === 'Enter') {
      game.showLetter();
  }
}); 
document.querySelector('[data-showLetter]').addEventListener('click', () => game.showLetter());

document.querySelector('[data-selectAmount]').addEventListener('change', (function() {
  let previousOption = 3;
  return function () {
    if (game.variables.isStarted) {
      alert('The game is started! You must choose amount before start the game!');
      this.value = previousOption;
      return;
    }
    previousOption = this.value;
    game.changeAmountRepeat(this.value);
  }
})());
document.querySelector('[data-saveRest]').addEventListener('click', () => {
  if (!game.variables.allWords.length) {
      alert('You must play before downloading');
  } else {
      const allWordsRes = new Set([
        ...game.variables.allWords,
        ...game.variables.checkedWords,
        ...game.variables.uploadedWords
      ]);
      game.downloadWords(Array.from(allWordsRes), 'updated words');
  }
});

document.querySelector('[data-saveLearned]').addEventListener('click', () => {
  if (!game.variables.learnedWords.length) {
      alert('You must learn any word to download list of leatned words');
  } else {
      game.downloadWords(game.variables.learnedWords, 'learned words');
  }
});

document.querySelector('[data-deleteAllStars]').addEventListener('click', function(e) {
  if (!game.variables.isFileLoaded) {
      alert('You must load a file!');
      return;
  }
  if (game.variables.isStarted) {
    // it will be for another tab
    alert('Game is started!');
  }
  const withoutStars = game.variables.loadedWords.map(couple => couple.replaceAll('*', ''));
  game.downloadWords(withoutStars, 'updated words');
});

// import { getEngRu } from './src/scripts/getEngRu.js';
// import { sortWords } from './src/scripts/sortWords.js';
// import { getnextWordFunction } from './src/scripts/nextWord.js';
// import { downloadWords } from './src/scripts/download/js';

// const inputFile = document.querySelector('[data-loadFile]');
// const start = document.querySelector('[data-start]');
// const englishWord = document.querySelector('[data-englishWord]');
// const translatedWord = document.querySelector('[data-translatedWord]');
// const answerInput = document.querySelector('[data-addAnswer]');
// const learnedWordsButton = document.querySelector('[data-saveLearned]');
// const restOfWords = document.querySelector('[data-saveRest]');
// const selectCountRepeat = document.querySelector('[data-selectAmount]');
// const deleteAllStarsButton = document.querySelector('[data-deleteAllStars]');
// const showLetterButton = document.querySelector('[data-showLetter]');
// const closeButtonManual = document.querySelector('.close');


// let allWords;
// let checkedWords = [];
// let learnedWords = [];
// let uploadedWords = [];
// let currentTranslatedWord;
// let isStarted = false;
// let isFileLoaded = false;

// const expCheck = /^\D* - \D*\*{0,3}$/g;
// inputFile.addEventListener('change', function (e) {
//     const file = this.files[0];
//     const fileReader = new FileReader();
//     fileReader.readAsText(file);
//     fileReader.onload = () => {
//         isFileLoaded = true;
//         const result = fileReader.result;
//         const resultSplit = result.split('\r\n').map(couple => couple.trim().toLowerCase());
//         allWords = resultSplit.filter(couple => couple.match(expCheck));
//     }
// });

// function startGame(arrayWords) {
//     if (!isFileLoaded) {
//         alert('You must load a file!');
//         return;
//     }
//     if (!allWords || !allWords.length) {
//         alert('Words haven\'t found. Check your words!');
//         return
//     };
//     isStarted = true;
//     if (!arrayWords.length) {
//         isStarted = false;
//         alert('All words are learned!');
//         return;
//     }
//     answerInput.value = '';
//     allWords = sortWords(arrayWords);
//     const firstWord = allWords.pop();
//     englishWord.textContent = getEngRu(firstWord).eng;
//     addWordInCurrentWord(firstWord);
//     translatedWord.textContent = '...';
//     // push checked word
//     checkedWords.push(firstWord);
//     start.disabled = true;
// }
// start.addEventListener('click', () => {
//     startGame(allWords);
// });

// let amount = 3;
// function isLearnedWord(couple) {
//     let amountStar = 0;
//     for (let i = 0; i < couple.length; i++) {
//         amountStar += +(couple[i] === '*');
//     }
//     return amountStar >= amount;
// }
// function addWordInCurrentWord(coupleWords) {
//     const enRu = getEngRu(coupleWords);
//     currentTranslatedWord = enRu.ru;
// }

// const nextWord = getnextWordFunction(englishWord, translatedWord);
// answerInput.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//         if (!isFileLoaded) {
//             alert('You must load a file!');
//             return;
//         }
//         const currentWord = englishWord.textContent;
//         const indexOfCRWord = checkedWords.findIndex(str => str.includes(currentWord));
//         const coupleWords = checkedWords[indexOfCRWord];
//         const enRu = getEngRu(coupleWords);
//         const userAnswer = e.target.value.toLowerCase();
//         if (userAnswer === enRu.ru) {
//             alert ('Good! It\'s correct!');
//             checkedWords[indexOfCRWord] = coupleWords + '*';
//             if (isLearnedWord(checkedWords[indexOfCRWord])) {
//                 alert('You have learned new words! Good!');
//                 learnedWords.push(checkedWords[indexOfCRWord]);
//                 checkedWords.splice(indexOfCRWord, 1);
//             }
//         } else {
//             checkedWords[indexOfCRWord] = coupleWords.replaceAll('*', '');
//         }
//         translatedWord.textContent = enRu.ru;
//         e.target.value = '';
//         if (!allWords.length) {
//             start.disabled = false;
//             alert('All words are repeated! Great! Now you can start again!');
//             allWords = checkedWords.filter(str => !learnedWords.includes(str));
//             uploadedWords = checkedWords.filter(str => !learnedWords.includes(str));
//             checkedWords = [];
//         } else {
//             setTimeout(() => {
//                 const next = allWords.pop();
//                 addWordInCurrentWord(next);
//                 checkedWords.push(next);
//                 nextWord(next);
//             }, 2000);
//         } 
//     }
// });

// restOfWords.addEventListener('click', () => {
//     if (!checkedWords.length) {
//         alert('You must play before downloading');
//     } else {
//         const allWordsRes = [...allWords, ...checkedWords];
//         downloadWords(allWordsRes, 'updated words');
//     }
// });
// learnedWordsButton.addEventListener('click', () => {
//     if (!learnedWords.length) {
//         alert('You must play before downloading');
//     } else {
//         downloadWords(learnedWords, 'learned words');
//     }
// });


// let previousOption = 3;
// selectCountRepeat.addEventListener('change', function(e) {
//     if (isStarted) {
//         alert('The game is started! You must choose amount before start the game!');
//         this.value = previousOption;
//         return;
//     }
//     amount = this.value;
//     previousOption = this.value;
// });

// deleteAllStarsButton.addEventListener('click', function(e) {
//     if (!isFileLoaded) {
//         alert('You must load a file!');
//         return;
//     }
//     allWords = allWords.map(couple => couple.replaceAll('*', ''));
//     downloadWords(allWords, 'updated words');
// });
// function showLetter() {
//     if (!isFileLoaded) {
//         alert('You must load a file!');
//         return;
//     }
//     if (!isStarted) {
//         alert('You must play before getting a prompt');
//         return;
//     }
//     if (!currentTranslatedWord[0]) return;
//     if (translatedWord.textContent.includes('.')) translatedWord.textContent = '';
//     translatedWord.textContent += currentTranslatedWord[0];
//     currentTranslatedWord = currentTranslatedWord.slice(1);
//     answerInput.focus();
// }
// answerInput.addEventListener('keyup', function(e) {
//     if (e.shiftKey && e.key === 'Enter') {
//         showLetter();
//     }
// }); 
// showLetterButton.addEventListener('click', showLetter);

// closeButtonManual.addEventListener('click', function(e) {
//     document.querySelector('.manual-block').classList.add('hidden');
// });