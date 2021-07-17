import { init } from './funcOfGame/init.js';
import { answer } from './funcOfGame/answer.js';
import { startGame } from './funcOfGame/startGame.js';
import { showLetter } from './funcOfGame/showLetter.js';
import { downloadWords } from './funcOfGame/download.js';
import { loadTXTFile } from './funcOfGame/loadTXTFile.js';
import { changeAmountRepeat } from './funcOfGame/changeAmountRepeat.js';

class Game {
  constructor() {
    this.variables = {
      allWords : [],
      loadedWords: [],
      indexOfCRWord: 0,
      howManyRepeat: 3,
      checkedWords: [],
      learnedWords: [],
      isStarted: false,
      uploadedWords: [],
      isFileLoaded: false,
      currentTranslatedWord: '',
    }

    this.init = init;
    this.answer = answer;
    this.startGame = startGame;
    this.showLetter = showLetter;
    this.loadTXTFile = loadTXTFile;
    this.downloadWords = downloadWords;
    this.changeAmountRepeat = changeAmountRepeat;
  }
}

export { Game };