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