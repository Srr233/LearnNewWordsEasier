import { getEngRu } from './getEngRu.js';
import { isLearnedWord } from './isLearnedWord.js';
import { _isContainMessage } from './_isContainMessage.js';
import { _addWordInCurrentWord } from './_addWordInCurrentWord.js';

function addOneStarPlus(i, couple) {
    this.variables.checkedWords[i] = couple + '*';
}

function replaceFromCheckedToLearned(i) {
    this.variables.learnedWords.push(this.variables.checkedWords[i]);
    this.variables.checkedWords.splice(i, 1);
}

function breakCombination(i) {
    const coupleWords = this.variables.checkedWords[i];
    this.variables.checkedWords[i] = coupleWords.replaceAll('*', '');
}

function stopGame() {
    this.htmlElements.start.disabled = false;
    this.variables.isStarted = false;
    // save last words
    const notLearnedWords = this.variables.checkedWords.filter(str => !this.variables.learnedWords.includes(str));
    this.variables.allWords = notLearnedWords;
    this.variables.uploadedWords = notLearnedWords;
    this.variables.checkedWords = [];

    // update index of current word
    this.variables.indexOfCRWord = 0;
}

function nextWord() {
    const next = this.variables.allWords.pop();
    this.variables.checkedWords.push(next);
    _addWordInCurrentWord.call(this, next);

    // update index of current word
    this.variables.indexOfCRWord = this.variables.checkedWords.length - 1;
}

function answer(inputText) {
    if (_isContainMessage.call(this, 'answer')) return;

    const indexOfCRWord = this.variables.indexOfCRWord;
    const coupleWords = this.variables.checkedWords[indexOfCRWord];
    const enRu = getEngRu(coupleWords);
    const userAnswer = inputText.toLowerCase();

    if (userAnswer === enRu.ru) {
        alert('Good! It\'s correct!');
        addOneStarPlus.call(this, indexOfCRWord, coupleWords);
        if (
            isLearnedWord(this.variables.checkedWords[indexOfCRWord]) >=
            this.variables.howManyRepeat
        ) {
            alert('You have learned new words! Good!');
            replaceFromCheckedToLearned.call(this, indexOfCRWord);    
        }
    } else {
        breakCombination.call(this, indexOfCRWord);
    }
    // show correct answer
    this.htmlElements.translatedWord.textContent = enRu.ru;

    if (!this.variables.allWords.length) {
        alert('All words are repeated! Great! Now you can start again!');
        stopGame.call(this);
    } else {
        setTimeout(() => {
            nextWord.call(this);
        }, 2000);
    } 
}

export { answer };