import { _isContainMessage } from './_isContainMessage.js';
import { _addWordInCurrentWord } from './_addWordInCurrentWord.js';

function startGame() {
    if (_isContainMessage.call(this, 'start')) return;
    this.variables.isStarted = true;
    // clean input for answering
    this.htmlElements.answerInput.value = '';
    // sort words
    this.variables.allWords = this.variables.allWords.sort(() => Math.random() - Math.random());
    // init first word
    const firstWord = this.variables.allWords.pop();
    _addWordInCurrentWord.call(this, firstWord);
    // push checked word
    this.variables.checkedWords.push(firstWord);
    this.htmlElements.start.disabled = true;
  }

export { startGame };