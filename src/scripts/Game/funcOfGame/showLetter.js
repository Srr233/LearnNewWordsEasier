import { _isContainMessage } from './_isContainMessage.js';

function updateWords(currentWord) {
    this.htmlElements.translatedWord.textContent += currentWord[0];
    this.variables.currentTranslatedWord = currentWord.slice(1);
}
function showLetter() {
    if (_isContainMessage.call(this, 'answer')) return;
    const currentWord = this.variables.currentTranslatedWord;
    // checke if it isn't empty
    if (!currentWord[0]) return;
    // delete dots if they are
    if (this.htmlElements.translatedWord.textContent.includes('.')) {
        this.htmlElements.translatedWord.textContent = '';
    }
    updateWords.call(this, currentWord);

    this.htmlElements.answerInput.focus();
}

export { showLetter };