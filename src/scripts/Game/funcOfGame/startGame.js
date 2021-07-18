import { _isContainMessage } from './_isContainMessage.js';
import { _addWordInCurrentWord } from './_addWordInCurrentWord.js';
import { chunkGame } from './chunkGame.js';

function startGame() {
    if (_isContainMessage.call(this, 'start')) return;
    
    this.variables.isStarted = true;
    // clean input for answering
    this.htmlElements.answerInput.value = '';
    this.htmlElements.start.disabled = true;

    // if chunk mode is on
    if (this.variables.chunkMode) {
      chunkGame.call(this, this.variables.amoutOfChunksLearn);
    } else {
      this.variables.currentWords = this.variables.currentWords.sort(() => Math.random() - Math.random());
    }
    
    const firstWord = this.variables.currentWords.pop();
    _addWordInCurrentWord.call(this, firstWord);
    // push checked word
    this.variables.checkedWords.push(firstWord);
  }

export { startGame };