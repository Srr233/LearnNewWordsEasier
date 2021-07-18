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
  if (!game.variables.currentWords.length && !game.variables.chunkedWords.length) {
      alert('You must play before downloading');
  } else {
      const getArrfromBunchArrs = (arr) => arr.reduce((allArr, curArr) => allArr.concat(curArr));
      const currentWordsRes = new Set([
        ...game.variables.currentWords,
        ...(game.variables.chunkMode ? 
            getArrfromBunchArrs(game.variables.chunkedWords) :
            game.variables.checkedWords),
      ]);
      game.downloadWords(Array.from(currentWordsRes), 'updated words');
  }
});
document.querySelector('[data-saveLearned]').addEventListener('click', () => {
  if (!game.variables.learnedWords.size) {
      alert('You must learn any word to download list of leatned words');
  } else {
      game.downloadWords(Array.from(game.variables.learnedWords), 'learned words');
  }
});

document.querySelector('[data-deleteAllStars]').addEventListener('click', function(e) {
  if (!game.variables.isFileLoaded) {
      alert('You must load a file!');
      return;
  }
  const withoutStars = game.variables.loadedWords.map(couple => couple.replaceAll('*', ''));
  game.downloadWords(withoutStars, 'updated words');
});

document.querySelector('[data-chunkAmount]').addEventListener('change', (function() {
  let previousOption = 5;
  return function (e) {
    if (!game.variables.isFileLoaded) {
      alert('You must load a file!');
      this.value = previousOption;
      return;
  }
    if (game.variables.isStarted) {
      // it will be for another tab
      alert('Game is started!');
      this.value = previousOption;
      return
    }
    game.variables.amoutOfChunksLearn = +this.value;
  }

})());
document.querySelector('[data-chunkModeButton]').addEventListener('click', (function() {
  let previousOption = false;
  return function(e) {
    if (!game.variables.isFileLoaded) {
        alert('You must load a file!');
        this.checked = previousOption;
        return;
    }
    if (game.variables.isStarted) {
      // it will be for another tab
      alert('Game is started!');
      this.checked = previousOption;
      return
    }
    if (this.checked) {
      this.value = 'on';
      previousOption = true;
      game.variables.chunkMode = true;
      document.querySelector('[data-chunkAmount]').disabled = false;
    } else {
      this.value = 'off';
      this.checked = false;
      previousOption = false;
      game.variables.chunkMode = false;
      document.querySelector('[data-chunkAmount]').disabled = true;
    }
  }
})());