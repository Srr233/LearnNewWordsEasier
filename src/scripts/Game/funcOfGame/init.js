import { getStringHTMLGame } from './createHTMLGame.js';
function init(element) {
    const htmlTEXT = getStringHTMLGame();
    element.insertAdjacentHTML('beforeend', htmlTEXT);

    this.htmlElements = {
      start: document.querySelector('[data-start]'),
      closeButtonManual: document.querySelector('.close'),
      answerInput: document.querySelector('[data-addAnswer]'),
      englishWord: document.querySelector('[data-englishWord]'),
      // showLetterButton: document.querySelector('[data-showLetter]'),
      translatedWord: document.querySelector('[data-translatedWord]'),
      // learnedWordsButton: document.querySelector('[data-saveLearned]'),
      // selectCountRepeat: document.querySelector('[data-selectAmount]'),
      // deleteAllStarsButton: document.querySelector('[data-deleteAllStars]'),
    }

    this.htmlElements.start.addEventListener('click', () => {
      this.startGame(this.variables.allWords);
    });

    this.htmlElements.closeButtonManual.addEventListener('click', function(e) {
      document.querySelector('.manual-block').classList.add('hidden');
  });
  }

  export { init };